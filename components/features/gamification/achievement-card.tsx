"use client";

import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface AchievementCardProps {
    name: string;
    description: string;
    icon: string;
    xpReward: number;
    unlocked: boolean;
    unlockedAt?: string;
    className?: string;
}

export function AchievementCard({
    name,
    description,
    icon,
    xpReward,
    unlocked,
    unlockedAt,
    className,
}: AchievementCardProps) {
    return (
        <Card
            variant={unlocked ? "hover" : "default"}
            padding="sm"
            className={cn(
                "flex items-center gap-3",
                !unlocked && "opacity-50 grayscale",
                className
            )}
        >
            {/* Icon */}
            <div
                className={cn(
                    "flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-card text-xl",
                    unlocked
                        ? "bg-fire-orange/10"
                        : "bg-white/5"
                )}
            >
                {unlocked ? icon : "🔒"}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">{name}</h4>
                <p className="text-xs text-white-dim truncate">{description}</p>
            </div>

            {/* XP Reward */}
            <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-1">
                    <Trophy className={cn("h-3 w-3", unlocked ? "text-fire-amber" : "text-white-dim")} />
                    <span className={cn("text-xs font-semibold", unlocked ? "text-fire-amber" : "text-white-dim")}>
                        +{xpReward}
                    </span>
                </div>
                {unlocked && unlockedAt && (
                    <p className="text-[10px] text-white-dim mt-0.5">{unlockedAt}</p>
                )}
            </div>
        </Card>
    );
}
