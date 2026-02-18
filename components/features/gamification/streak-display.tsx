"use client";

import { cn } from "@/lib/utils/cn";
import { Flame } from "lucide-react";

interface StreakDisplayProps {
    currentStreak: number;
    longestStreak: number;
    className?: string;
}

export function StreakDisplay({
    currentStreak,
    longestStreak,
    className,
}: StreakDisplayProps) {
    const isOnFire = currentStreak >= 3;
    const isLegendary = currentStreak >= 30;

    return (
        <div className={cn("glass-card p-4", className)}>
            <div className="flex items-center justify-between">
                {/* Streak flame */}
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            "relative w-14 h-14 flex items-center justify-center",
                            "rounded-full",
                            isLegendary
                                ? "bg-fire-yellow/20"
                                : isOnFire
                                    ? "bg-fire-orange/15"
                                    : "bg-white/5"
                        )}
                    >
                        <Flame
                            className={cn(
                                "h-7 w-7",
                                isLegendary
                                    ? "text-fire-yellow animate-flicker"
                                    : isOnFire
                                        ? "text-fire-orange animate-flicker"
                                        : "text-white-dim"
                            )}
                        />
                        {isOnFire && (
                            <div
                                className="absolute inset-0 rounded-full animate-pulse-glow"
                                style={{
                                    boxShadow: isLegendary
                                        ? "0 0 30px rgba(255, 208, 0, 0.3)"
                                        : "0 0 20px rgba(255, 98, 0, 0.2)",
                                }}
                                aria-hidden="true"
                            />
                        )}
                    </div>

                    <div>
                        <p className="text-xs text-white-muted uppercase tracking-wider">
                            Streak
                        </p>
                        <p
                            className={cn(
                                "font-heading text-3xl",
                                isLegendary
                                    ? "gradient-fire-text"
                                    : isOnFire
                                        ? "text-fire-orange"
                                        : "text-white"
                            )}
                        >
                            {currentStreak}
                            <span className="text-lg ml-1">jours</span>
                        </p>
                    </div>
                </div>

                {/* Best streak */}
                <div className="text-right">
                    <p className="text-xs text-white-dim">Record</p>
                    <p className="text-lg font-heading text-white-muted">
                        {longestStreak}j
                    </p>
                </div>
            </div>

            {/* Streak status message */}
            <div
                className={cn(
                    "mt-3 pt-3 border-t border-black-border",
                    "text-xs text-center"
                )}
            >
                {currentStreak === 0 ? (
                    <p className="text-white-dim">
                        Ta flamme s&apos;est éteinte. Rallume-la aujourd&apos;hui ! 🕯️
                    </p>
                ) : isLegendary ? (
                    <p className="text-fire-yellow">
                        ☄️ Inarrêtable ! Ta flamme est légendaire.
                    </p>
                ) : isOnFire ? (
                    <p className="text-fire-orange">
                        🔥 Ta flamme brûle depuis {currentStreak} jours !
                    </p>
                ) : (
                    <p className="text-white-muted">
                        ✨ Continue pour atteindre 3 jours et débloquer un bonus.
                    </p>
                )}
            </div>
        </div>
    );
}
