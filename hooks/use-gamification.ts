"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { GamificationProgress } from "./types"

export function useGamification() {
    const [progress, setProgress] = useState<GamificationProgress | null>(null)
    const [unlockedSkills, setUnlockedSkills] = useState<string[]>([])
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

            const [progressRes, skillsRes] = await Promise.all([
                supabase.from("gamification_progress").select("*").eq("user_id", user.id).single(),
                supabase.from("user_skills").select("node_id").eq("user_id", user.id)
            ])

            if (progressRes.error && progressRes.error.code !== "PGRST116") throw progressRes.error
            if (skillsRes.error) throw skillsRes.error

            setProgress(progressRes.data as GamificationProgress)
            setUnlockedSkills(skillsRes.data?.map(s => s.node_id) || [])
        } catch (err) {
            console.error("Error fetching gamification progress:", err)
        } finally {
            setLoading(false)
        }
    }

    const spinWheel = async () => {
        try {
            if (!progress || progress.wheel_spins_available <= 0) {
                throw new Error("No spins available")
            }

            const response = await fetch("/dojo/api/gamification/spin", {
                method: "POST",
            })

            const data = await response.json()
            if (data.error) throw new Error(data.error)

            // On rafraîchit les données pour mettre à jour l'XP/spins sur l'UI
            await Promise.all([
                fetchProgress(),
                // On peut aussi trigger useUserProfile via une autre méthode si besoin
            ])

            return {
                remainingSpins: data.remainingSpins,
                reward: data.reward,
                winnerIndex: data.winnerIndex
            }
        } catch (err) {
            console.error("Error spinning wheel:", err)
            throw err
        }
    }

    const unlockSkill = async (nodeId: string, xpCost: number) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("No user")

            // On vérifie l'XP via un fetch frais pour éviter la triche côté client (basique)
            const { data: profile } = await supabase.from("profiles").select("total_xp").eq("id", user.id).single()
            if (!profile || profile.total_xp < xpCost) throw new Error("XP insuffisant")

            // 1. Débloquer le skill
            const { error: skillErr } = await supabase
                .from("user_skills")
                .insert({ user_id: user.id, node_id: nodeId })

            if (skillErr) throw skillErr

            // 2. Déduire l'XP
            const { error: xpErr } = await supabase
                .from("profiles")
                .update({ total_xp: profile.total_xp - xpCost })
                .eq("id", user.id)

            if (xpErr) throw xpErr

            // Refresh total
            await fetchProgress()
            return true
        } catch (err) {
            console.error("Error unlocking skill:", err)
            throw err
        }
    }

    return {
        progress,
        unlockedSkills,
        spinWheel,
        unlockSkill,
        loading,
        refreshGamification: fetchProgress
    }
}
