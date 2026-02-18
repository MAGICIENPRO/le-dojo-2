"use client";

import { RewardWheelPremium } from "./reward-wheel-premium";
import { useGamification } from "@/hooks/use-gamification";
import { useToast } from "@/components/ui/toast";

interface RewardWheelWrapperProps {
    initialSpins: number;
}

export function RewardWheelWrapper({ initialSpins }: RewardWheelWrapperProps) {
    const { spinWheel, progress, loading } = useGamification();
    const { success, error: toastError } = useToast();

    // On utilise la valeur réelle du hook si dispo, sinon initialSpins
    const spins = progress ? progress.wheel_spins_available : initialSpins;

    const handleSpinRequest = async () => {
        try {
            const res = await spinWheel();
            return res; // Contient winnerIndex et reward
        } catch (err: any) {
            toastError(err.message || "Erreur lors du tirage");
            return null;
        }
    };

    const handleReward = (reward: any) => {
        success(`Récompense obtenue : ${reward.label} !`);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <RewardWheelPremium
                onSpinRequest={handleSpinRequest}
                onRewardWon={handleReward}
            />
            <p className="font-heading text-lg text-white mt-1 uppercase tracking-tighter">
                Lancers restants : <span className="text-fire-orange">{spins}</span>
            </p>
        </div>
    );
}
