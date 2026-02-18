import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { gamificationConfig } from "@/config/site-config";

export async function POST() {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
        }

        // 1. Récupérer le nombre de spins disponibles
        const { data: progress, error: fetchErr } = await supabase
            .from("gamification_progress")
            .select("wheel_spins_available, total_wheel_spins")
            .eq("user_id", user.id)
            .single();

        if (fetchErr || !progress || progress.wheel_spins_available <= 0) {
            return NextResponse.json({ error: "Aucun tour disponible" }, { status: 403 });
        }

        // 2. Tirage au sort pondéré côté serveur (Anti-triche)
        const rewards = gamificationConfig.wheel.rewards;
        const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
        let random = Math.random() * totalWeight;
        let winnerIndex = 0;

        for (let i = 0; i < rewards.length; i++) {
            random -= rewards[i].weight;
            if (random <= 0) {
                winnerIndex = i;
                break;
            }
        }

        const reward = rewards[winnerIndex];

        // 3. Appliquer la récompense
        const updates: any = {
            wheel_spins_available: progress.wheel_spins_available - 1,
            total_wheel_spins: (progress.total_wheel_spins || 0) + 1,
        };

        if (reward.type === "shield") {
            updates.daily_streak_shield = true;
        }

        // Mise à jour gamification_progress
        const { error: updateErr } = await supabase
            .from("gamification_progress")
            .update(updates)
            .eq("user_id", user.id);

        if (updateErr) throw updateErr;

        // Mise à jour XP si nécessaire
        if (reward.type === "xp") {
            const { data: profile } = await supabase.from("profiles").select("total_xp").eq("id", user.id).single();
            if (profile) {
                await supabase
                    .from("profiles")
                    .update({ total_xp: profile.total_xp + reward.value })
                    .eq("id", user.id);
            }
        }

        return NextResponse.json({
            success: true,
            reward,
            winnerIndex,
            remainingSpins: updates.wheel_spins_available
        });

    } catch (err) {
        console.error("Spin error:", err);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
