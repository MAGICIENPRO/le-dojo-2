"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { TrainingSession, TsvpStep, Profile } from "./types"
import { gamificationConfig } from "@/config/site-config"

export function useTrainingSessions() {
    const [sessions, setSessions] = useState<TrainingSession[]>([])
    const [recentSessions, setRecentSessions] = useState<TrainingSession[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const supabase = createClient()

    useEffect(() => {
        fetchSessions()
    }, [])

    const fetchSessions = async () => {
        try {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from("training_sessions")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })
                .limit(10) // fetch only recent ones primarily

            if (error) throw error
            setRecentSessions(data as TrainingSession[])
        } catch (err) {
            console.error("Error fetching sessions:", err)
            setError(err instanceof Error ? err : new Error("Unknown error"))
        } finally {
            setLoading(false)
        }
    }

    const completeSession = async (
        trickId: string,
        tsvpStep: TsvpStep,
        durationSeconds: number,
        notes?: string
    ) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("User not authenticated")

            const xpEarned = gamificationConfig.xpRewards.completeSession

            // 1. Insert session
            const { data: sessionData, error: sessionError } = await supabase
                .from("training_sessions")
                .insert({
                    user_id: user.id,
                    trick_id: trickId,
                    tsvp_step: tsvpStep,
                    duration_seconds: durationSeconds,
                    notes,
                    xp_earned: xpEarned,
                    completed_at: new Date().toISOString(),
                })
                .select()
                .single()

            if (sessionError) throw sessionError

            // 2. Update profile (XP, training count)
            // Note: Ideally this should be an RPC or Edge Function for atomicity,
            // but following instructions to perform partial updates from client.

            // First get current profile to calculate new values
            const { data: profile } = await supabase
                .from("profiles")
                .select("total_xp, training_count, current_streak, last_training_date")
                .eq("id", user.id)
                .single()

            if (profile) {
                const today = new Date().toISOString().split('T')[0]
                const lastTraining = profile.last_training_date
                    ? new Date(profile.last_training_date).toISOString().split('T')[0]
                    : null

                let newStreak = profile.current_streak

                // Simple streak logic: if last training was yesterday, increment. 
                // If today, keep same. If older, reset to 1.
                if (lastTraining === today) {
                    // already trained today, streak stays same
                } else {
                    const yesterday = new Date()
                    yesterday.setDate(yesterday.getDate() - 1)
                    const yesterdayStr = yesterday.toISOString().split('T')[0]

                    if (lastTraining === yesterdayStr) {
                        newStreak += 1
                    } else {
                        newStreak = 1
                    }
                }

                await supabase
                    .from("profiles")
                    .update({
                        total_xp: (profile.total_xp || 0) + xpEarned,
                        training_count: (profile.training_count || 0) + 1,
                        last_training_date: new Date().toISOString(),
                        current_streak: newStreak
                    })
                    .eq("id", user.id)
            }

            setRecentSessions((prev) => [sessionData as TrainingSession, ...prev])
            return sessionData
        } catch (err) {
            console.error("Error completing session:", err)
            throw err
        }
    }

    return {
        sessions, // could be expanded to full history if needed
        recentSessions,
        loading,
        error,
        completeSession,
        refreshSessions: fetchSessions
    }
}
