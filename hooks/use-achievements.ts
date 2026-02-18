"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Achievement, AchievementLog } from "./types"

export function useAchievements() {
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)

    const supabase = createClient()

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true)
                const { data: { user } } = await supabase.auth.getUser()

                // 1. Load generic achievements definitions
                const { data: allAchievements, error: achError } = await supabase
                    .from("achievements")
                    .select("*")
                    .order("sort_order")

                if (achError) throw achError
                setAchievements(allAchievements as Achievement[])

                if (user) {
                    // 2. Load user's unlocked achievements
                    const { data: logs, error: logError } = await supabase
                        .from("achievement_log")
                        .select("achievement_id")
                        .eq("user_id", user.id)

                    if (logError) throw logError

                    const unlocked = new Set(logs.map((log: { achievement_id: string }) => log.achievement_id))
                    setUnlockedIds(unlocked)
                }
            } catch (err) {
                console.error("Error loading achievements:", err)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    return {
        achievements,
        unlockedIds,
        loading
    }
}
