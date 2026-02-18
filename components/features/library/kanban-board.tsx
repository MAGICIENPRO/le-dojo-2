"use client";

import { cn } from "@/lib/utils/cn";
import { trickStages } from "@/config/site-config";
import { TrickCard } from "./trick-card";

interface Trick {
    id: string;
    name: string;
    category: string;
    stage: string;
    difficulty: number;
    practiceCount: number;
    description?: string;
}

interface KanbanBoardProps {
    tricks: Trick[];
    onTrickClick?: (trick: Trick) => void;
    className?: string;
}

export function KanbanBoard({ tricks, onTrickClick, className }: KanbanBoardProps) {
    const columns = trickStages.map((stage) => ({
        ...stage,
        tricks: tricks.filter((t) => t.stage === stage.id),
    }));

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
            {columns.map((column) => (
                <div key={column.id} className="flex flex-col">
                    {/* Column header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ background: column.color }}
                            />
                            <h3 className="text-sm font-semibold text-white">
                                {column.icon} {column.label}
                            </h3>
                            <span className="text-xs text-white-dim bg-white/5 px-1.5 py-0.5 rounded-pill">
                                {column.tricks.length}
                            </span>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="space-y-2 flex-1 min-h-[200px]">
                        {column.tricks.map((trick) => (
                            <TrickCard
                                key={trick.id}
                                {...trick}
                                onClick={() => onTrickClick?.(trick)}
                            />
                        ))}
                        {column.tricks.length === 0 && (
                            <div className="border border-dashed border-black-border rounded-card p-4 text-center">
                                <p className="text-xs text-white-dim">
                                    Aucun tour {column.label.toLowerCase()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
