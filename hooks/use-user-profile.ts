"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Profile } from "./types"
import { User } from "@supabase/supabase-js"

export function useUserProfile() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const supabase = createClient()

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true)
                const { data: { user }, error: authError } = await supabase.auth.getUser()

                if (authError) throw authError
                if (!user) {
                    setLoading(false)
                    return
                }

                setUser(user)

                const { data, error: profileError } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single()

                if (profileError) throw profileError

                setProfile(data as Profile)
            } catch (err) {
                console.error("Error fetching profile:", err)
                setError(err instanceof Error ? err : new Error("Unknown error"))
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    const updateProfile = async (updates: Partial<Profile>) => {
        try {
            if (!user) throw new Error("No user logged in")

            const { data, error } = await supabase
                .from("profiles")
                .update(updates)
                .eq("id", user.id)
                .select()
                .single()

            if (error) throw error

            setProfile(data as Profile)
            return data
        } catch (err) {
            console.error("Error updating profile:", err)
            setError(err instanceof Error ? err : new Error("Unknown error"))
            throw err
        }
    }

    return {
        user,
        profile,
        loading,
        error,
        updateProfile
    }
}
