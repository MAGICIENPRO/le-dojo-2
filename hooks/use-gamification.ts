"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { GamificationProgress } from "./types"

export function useGamification() {
    const [progress, setProgress] = useState<GamificationProgress | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchProgress()
    }, [])

    const fetchProgress = async () => {
        try {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from("gamification_progress")
                .select("*")
                .eq("user_id", user.id)
                .single()

            if (error && error.code !== "PGRST116") { // Ignore 'user not found' in gamification table if not init yet
                throw error
            }

            setProgress(data as GamificationProgress)
        } catch (err) {
            console.error("Error fetching gamification progress:", err)
        } finally {
            setLoading(false)
        }
    }

    const spinWheel = async () => {
        try {
            // Note: In a real app, logic for "winning" should be server-side (RPC)
            // to prevent cheating. Here we implement the client-side trigger as requested.
            // We assume the backend or a follow-up action would handle the random logic 
            // if we were strictly following security best practices.
            // For this task, we'll Decrement spins_available client-side and return a mock result
            // or update the DB if we are to implement the logic here.

            // Let's implement a basic update to decrement spin count.
            if (!progress || progress.wheel_spins_available <= 0) {
                throw new Error("No spins available")
            }

            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("No user")

            const newSpins = progress.wheel_spins_available - 1
            const newTotal = (progress.total_wheel_spins || 0) + 1

            const { data, error } = await supabase
                .from("gamification_progress")
                .update({
                    wheel_spins_available: newSpins,
                    total_wheel_spins: newTotal
                })
                .eq("user_id", user.id)
                .select()
                .single()

            if (error) throw error
            setProgress(data as GamificationProgress)

            return { remainingSpins: newSpins }
        } catch (err) {
            console.error("Error spinning wheel:", err)
            throw err
        }
    }

    return {
        progress,
        spinWheel,
        loading,
        refreshGamification: fetchProgress
    }
}
