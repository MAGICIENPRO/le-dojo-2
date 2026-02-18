"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { trickCategories, trickStages } from "@/config/site-config";
import { Search, SlidersHorizontal, LayoutGrid, Columns3 } from "lucide-react";

type ViewMode = "kanban" | "matrix";

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string | null;
    onCategoryChange: (cat: string | null) => void;
    selectedStage: string | null;
    onStageChange: (stage: string | null) => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    className?: string;
}

export function FilterBar({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    selectedStage,
    onStageChange,
    viewMode,
    onViewModeChange,
    className,
}: FilterBarProps) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className={cn("space-y-3", className)}>
            {/* Top row: Search + View toggle */}
            <div className="flex items-center gap-2">
                <div className="flex-1">
                    <Input
                        placeholder="Rechercher un tour..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        iconLeft={<Search className="h-4 w-4" />}
                    />
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                        "h-10 w-10 flex items-center justify-center rounded-card border border-black-border",
                        "transition-colors",
                        showFilters
                            ? "bg-fire-orange/10 text-fire-orange border-fire-orange/30"
                            : "bg-black-card text-white-dim hover:text-white hover:border-white-dim/30"
                    )}
                    aria-label="Filtres"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </button>

                {/* View mode toggle - desktop only */}
                <div className="hidden md:flex items-center border border-black-border rounded-card overflow-hidden">
                    <button
                        onClick={() => onViewModeChange("kanban")}
                        className={cn(
                            "h-10 w-10 flex items-center justify-center transition-colors",
                            viewMode === "kanban"
                                ? "bg-fire-orange/10 text-fire-orange"
                                : "bg-black-card text-white-dim hover:text-white"
                        )}
                        aria-label="Vue Kanban"
                    >
                        <Columns3 className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onViewModeChange("matrix")}
                        className={cn(
                            "h-10 w-10 flex items-center justify-center transition-colors border-l border-black-border",
                            viewMode === "matrix"
                                ? "bg-fire-orange/10 text-fire-orange"
                                : "bg-black-card text-white-dim hover:text-white"
                        )}
                        aria-label="Vue Grille"
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Filter chips */}
            {showFilters && (
                <div className="space-y-2 animate-fade-in">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-1.5">
                        <Badge
                            variant={selectedCategory === null ? "fire" : "outline"}
                            className="cursor-pointer"
                            onClick={() => onCategoryChange(null)}
                        >
                            Toutes
                        </Badge>
                        {trickCategories.map((cat) => (
                            <Badge
                                key={cat.id}
                                color={selectedCategory === cat.id ? cat.color : undefined}
                                variant={selectedCategory === cat.id ? "default" : "outline"}
                                className="cursor-pointer"
                                icon={cat.icon}
                                onClick={() =>
                                    onCategoryChange(selectedCategory === cat.id ? null : cat.id)
                                }
                            >
                                {cat.label}
                            </Badge>
                        ))}
                    </div>

                    {/* Stages */}
                    <div className="flex flex-wrap gap-1.5">
                        {trickStages.map((stage) => (
                            <Badge
                                key={stage.id}
                                color={selectedStage === stage.id ? stage.color : undefined}
                                variant={selectedStage === stage.id ? "default" : "outline"}
                                className="cursor-pointer"
                                icon={stage.icon}
                                onClick={() =>
                                    onStageChange(selectedStage === stage.id ? null : stage.id)
                                }
                            >
                                {stage.label}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
