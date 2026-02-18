"use client";

import { SkillTreePremium } from "./skill-tree-premium";
import { useGamification } from "@/hooks/use-gamification";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useToast } from "@/components/ui/toast";
import { useState, useEffect } from "react";

interface SkillTreeWrapperProps {
    initialXp: number;
    initialUnlocked: string[];
}

export function SkillTreeWrapper({ initialXp, initialUnlocked }: SkillTreeWrapperProps) {
    const { profile, refreshProfile } = useUserProfile();
    const { unlockedSkills, unlockSkill, loading } = useGamification();
    const { success, error: toastError } = useToast();

    // Fallback dynamique
    const currentXp = profile ? profile.total_xp : initialXp;
    const currentUnlocked = unlockedSkills.length > 0 ? unlockedSkills : initialUnlocked;

    const handleUnlock = async (nodeId: string) => {
        try {
            // Analyse simplifiée du coût (en prod on récupère l'info du config)
            // Mais useGamification.unlockSkill le fait déjà de toute façon
            await unlockSkill(nodeId, 0); // Le coût est géré en interne via config ou DB
            success("Compétence débloquée !");
            refreshProfile(); // Pour mettre à jour l'XP sur toute la page
        } catch (err: any) {
            toastError(err.message || "Erreur lors du déblocage");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-end justify-between px-2">
                <div>
                    <h2 className="font-heading text-xl uppercase tracking-wider text-white">
                        🌳 ARBRE DE COMPÉTENCES
                    </h2>
                    <p className="text-xs text-white-muted">Débloque tes nouveaux pouvoirs avec ton XP.</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-white-dim uppercase font-bold tracking-tighter">XP DISPONIBLE</p>
                    <p className="text-fire-amber font-heading text-lg leading-none">{currentXp.toLocaleString()}</p>
                </div>
            </div>

            <div className="glass-card p-6">
                <SkillTreePremium
                    availableXp={currentXp}
                    unlockedNodeIds={currentUnlocked}
                    onUnlockNode={handleUnlock}
                />
            </div>
        </div>
    );
}
