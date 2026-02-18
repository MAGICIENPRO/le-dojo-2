"use client";

import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trickCategories, trickStages } from "@/config/site-config";
import { MoreVertical, Clock, Flame } from "lucide-react";

interface TrickCardProps {
    name: string;
    category: string;
    stage: string;
    difficulty: number;
    practiceCount: number;
    description?: string;
    onClick?: () => void;
    className?: string;
}

export function TrickCard({
    name,
    category,
    stage,
    difficulty,
    practiceCount,
    description,
    onClick,
    className,
}: TrickCardProps) {
    const currentCategory = trickCategories.find((c) => c.id === category);
    const currentStage = trickStages.find((s) => s.id === stage);

    return (
        <Card
            variant="hover"
            padding="none"
            className={cn("group", className)}
            onClick={onClick}
        >
            {/* Stage color strip */}
            <div
                className="h-1 rounded-t-card"
                style={{ background: currentStage?.color || "#666" }}
            />

            <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{currentCategory?.icon || "✨"}</span>
                        <h4 className="text-sm font-semibold text-white line-clamp-1">{name}</h4>
                    </div>
                    <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 flex items-center justify-center rounded-lg text-white-dim hover:text-white hover:bg-white/5"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        aria-label="Actions"
                    >
                        <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                </div>

                {/* Description */}
                {description && (
                    <p className="text-xs text-white-dim line-clamp-2 mb-3">{description}</p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <Badge
                        color={currentStage?.color}
                        icon={currentStage?.icon}
                        size="sm"
                    >
                        {currentStage?.label || stage}
                    </Badge>

                    <div className="flex items-center gap-3 text-white-dim">
                        {/* Difficulty */}
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        i < difficulty ? "bg-fire-orange" : "bg-white/10"
                                    )}
                                />
                            ))}
                        </div>

                        {/* Practice count */}
                        <div className="flex items-center gap-0.5 text-[10px]">
                            <Flame className="h-3 w-3" />
                            <span>{practiceCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
