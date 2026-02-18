"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Trick, TrickStage } from "./types"

export function useTricks() {
    const [tricks, setTricks] = useState<Trick[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const supabase = createClient()

    useEffect(() => {
        fetchTricks()
    }, [])

    const fetchTricks = async () => {
        try {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setTricks([])
                return
            }

            const { data, error } = await supabase
                .from("tricks")
                .select("*")
                .eq("user_id", user.id)
                .order("sort_order", { ascending: true })

            if (error) throw error
            setTricks(data as Trick[])
        } catch (err) {
            console.error("Error fetching tricks:", err)
            setError(err instanceof Error ? err : new Error("Unknown error"))
        } finally {
            setLoading(false)
        }
    }

    const addTrick = async (newTrickData: Partial<Trick>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("User not authenticated")

            const trickToInsert = {
                ...newTrickData,
                user_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }

            const { data, error } = await supabase
                .from("tricks")
                .insert(trickToInsert)
                .select()
                .single()

            if (error) throw error

            setTricks((prev) => [...prev, data as Trick])
            return data
        } catch (err) {
            console.error("Error adding trick:", err)
            throw err
        }
    }

    const updateTrick = async (trickId: string, updates: Partial<Trick>) => {
        try {
            const { data, error } = await supabase
                .from("tricks")
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq("id", trickId)
                .select()
                .single()

            if (error) throw error

            setTricks((prev) =>
                prev.map((trick) => (trick.id === trickId ? (data as Trick) : trick))
            )
            return data
        } catch (err) {
            console.error("Error updating trick:", err)
            throw err
        }
    }

    const deleteTrick = async (trickId: string) => {
        try {
            const { error } = await supabase
                .from("tricks")
                .delete()
                .eq("id", trickId)

            if (error) throw error

            setTricks((prev) => prev.filter((trick) => trick.id !== trickId))
        } catch (err) {
            console.error("Error deleting trick:", err)
            throw err
        }
    }

    const moveTrickToStage = async (trickId: string, newStage: TrickStage) => {
        return updateTrick(trickId, { stage: newStage })
    }

    return {
        tricks,
        loading,
        error,
        addTrick,
        updateTrick,
        deleteTrick,
        moveTrickToStage,
        refreshTricks: fetchTricks,
    }
}
