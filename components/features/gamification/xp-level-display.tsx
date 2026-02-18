"use client";

import { cn } from "@/lib/utils/cn";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { gamificationConfig } from "@/config/site-config";

interface XPLevelDisplayProps {
    level: number;
    totalXp: number;
    rankId: string;
    className?: string;
    compact?: boolean;
}

export function XPLevelDisplay({
    level,
    totalXp,
    rankId,
    className,
    compact = false,
}: XPLevelDisplayProps) {
    const currentRank = gamificationConfig.ranks.find((r) => r.id === rankId) || gamificationConfig.ranks[0];
    const xpForCurrent = gamificationConfig.xpForLevel(level);
    const xpForNext = gamificationConfig.xpForLevel(level + 1);
    const xpInLevel = totalXp - xpForCurrent;
    const xpNeeded = xpForNext - xpForCurrent;
    const progressPercent = Math.min((xpInLevel / xpNeeded) * 100, 100);

    if (compact) {
        return (
            <div className={cn("flex items-center gap-2", className)}>
                <span className="text-lg">{currentRank.icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-white">Nv. {level}</span>
                        <span className="text-[10px] text-white-dim">
                            {totalXp.toLocaleString()} XP
                        </span>
                    </div>
                    <ProgressBar value={progressPercent} size="sm" variant="fire" />
                </div>
            </div>
        );
    }

    return (
        <div className={cn("glass-card p-4", className)}>
            {/* Rank + Level */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{currentRank.icon}</span>
                    <div>
                        <Badge color={currentRank.color} size="sm">
                            {currentRank.label}
                        </Badge>
                        <p className="text-xs text-white-dim mt-0.5">
                            {currentRank.description}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-heading text-2xl gradient-fire-text">
                        Nv. {level}
                    </p>
                    <p className="text-xs text-white-dim">
                        {totalXp.toLocaleString()} XP
                    </p>
                </div>
            </div>

            {/* XP Progress */}
            <ProgressBar
                value={xpInLevel}
                max={xpNeeded}
                label={`Prochain niveau`}
                showValue
                variant="fire"
            />
        </div>
    );
}
