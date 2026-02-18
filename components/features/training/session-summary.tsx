"use client";

import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Trophy, Zap, Star, ExternalLink } from "lucide-react";

interface SessionSummaryProps {
    trickName: string;
    stepsCompleted: number;
    totalSteps: number;
    xpEarned: number;
    bonuses: Array<{ label: string; xp: number }>;
    onContinue?: () => void;
    onViewProgress?: () => void;
    className?: string;
}

export function SessionSummary({
    trickName,
    stepsCompleted,
    totalSteps,
    xpEarned,
    bonuses,
    onContinue,
    onViewProgress,
    className,
}: SessionSummaryProps) {
    const totalXp = xpEarned + bonuses.reduce((sum, b) => sum + b.xp, 0);

    return (
        <Card
            variant="fire-border"
            padding="lg"
            className={cn("text-center max-w-md mx-auto", className)}
        >
            {/* Celebration header */}
            <div className="mb-4">
                <div className="text-4xl mb-2">🔥</div>
                <h2 className="font-heading text-2xl uppercase tracking-wider gradient-fire-text">
                    SESSION TERMINÉE !
                </h2>
                <p className="text-sm text-white-muted mt-1">{trickName}</p>
            </div>

            {/* Progress */}
            <div className="mb-4">
                <ProgressBar
                    value={stepsCompleted}
                    max={totalSteps}
                    label="Étapes complétées"
                    showValue
                    variant="fire"
                />
            </div>

            {/* XP Breakdown */}
            <div className="glass-card p-4 mb-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-white-muted">
                        <Star className="h-4 w-4 text-fire-amber" />
                        <span>XP Session</span>
                    </div>
                    <span className="text-sm font-semibold text-fire-amber">
                        +{xpEarned}
                    </span>
                </div>

                {bonuses.map((bonus, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white-muted">
                            <Zap className="h-4 w-4 text-fire-yellow" />
                            <span>{bonus.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-fire-yellow">
                            +{bonus.xp}
                        </span>
                    </div>
                ))}

                <div className="border-t border-black-border pt-2 mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-fire-orange" />
                        <span className="text-sm font-semibold text-white">Total</span>
                    </div>
                    <span className="text-lg font-heading gradient-fire-text">
                        +{totalXp} XP
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
                <Button variant="primary" onClick={onContinue} className="w-full">
                    Continuer l&apos;entraînement
                </Button>
                <Button variant="ghost" onClick={onViewProgress} className="w-full">
                    <ExternalLink className="h-4 w-4" />
                    Voir ma progression
                </Button>
            </div>
        </Card>
    );
}
