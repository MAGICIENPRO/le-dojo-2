"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { skillTreeConfig } from "@/config/site-config";
import { Lock, Check, Sparkles } from "lucide-react";
import { useState } from "react";

interface SkillNode {
    id: string;
    name: string;
    parent: string | null;
    xpCost: number;
    unlocked?: boolean;
}

interface SkillTreePremiumProps {
    unlockedNodeIds?: string[];
    availableXp?: number;
    onUnlockNode?: (nodeId: string) => void;
    className?: string;
}

function getNodeState(
    node: SkillNode,
    unlockedIds: string[],
    availableXp: number
): "locked" | "accessible" | "unlocked" {
    if (node.unlocked || unlockedIds.includes(node.id)) return "unlocked";
    if (!node.parent || unlockedIds.includes(node.parent)) {
        return availableXp >= node.xpCost ? "accessible" : "locked";
    }
    return "locked";
}

const NODE_STYLES = {
    locked: {
        bg: "bg-black-card",
        border: "border-black-border border-dashed",
        text: "text-white-dim",
        glow: "none",
    },
    accessible: {
        bg: "bg-fire-orange/10",
        border: "border-fire-amber/50",
        text: "text-fire-amber",
        glow: "0 0 12px rgba(255,149,0,0.3)",
    },
    unlocked: {
        bg: "bg-fire-orange/15",
        border: "border-fire-orange",
        text: "text-white",
        glow: "0 0 20px rgba(255,98,0,0.4)",
    },
};

function NodeCard({
    node,
    state,
    onUnlock,
}: {
    node: SkillNode;
    state: "locked" | "accessible" | "unlocked";
    onUnlock?: () => void;
}) {
    const styles = NODE_STYLES[state];

    return (
        <motion.div
            className={cn(
                "relative rounded-card border px-3 py-2 min-w-[120px] text-center cursor-default",
                styles.bg,
                styles.border,
                state === "accessible" && "cursor-pointer"
            )}
            style={{ boxShadow: styles.glow }}
            whileHover={state === "accessible" ? { scale: 1.05 } : undefined}
            whileTap={state === "accessible" ? { scale: 0.95 } : undefined}
            onClick={state === "accessible" ? onUnlock : undefined}
            animate={
                state === "accessible"
                    ? { boxShadow: ["0 0 12px rgba(255,149,0,0.3)", "0 0 20px rgba(255,149,0,0.5)", "0 0 12px rgba(255,149,0,0.3)"] }
                    : undefined
            }
            transition={state === "accessible" ? { duration: 2, repeat: Infinity } : undefined}
        >
            {/* State icon */}
            <div className="absolute -top-2 -right-2">
                {state === "locked" && (
                    <div className="w-5 h-5 rounded-full bg-black-card border border-black-border flex items-center justify-center">
                        <Lock className="h-2.5 w-2.5 text-white-dim" />
                    </div>
                )}
                {state === "unlocked" && (
                    <motion.div
                        className="w-5 h-5 rounded-full bg-fire-orange flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                    >
                        <Check className="h-2.5 w-2.5 text-black-base" />
                    </motion.div>
                )}
                {state === "accessible" && (
                    <motion.div
                        className="w-5 h-5 rounded-full bg-fire-amber/30 flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Sparkles className="h-2.5 w-2.5 text-fire-amber" />
                    </motion.div>
                )}
            </div>

            <p className={cn("text-xs font-semibold truncate", styles.text)}>{node.name}</p>
            {node.xpCost > 0 && state !== "unlocked" && (
                <p className="text-[10px] text-white-dim mt-0.5">{node.xpCost} XP</p>
            )}
        </motion.div>
    );
}

export function SkillTreePremium({
    unlockedNodeIds = [],
    availableXp = 0,
    onUnlockNode,
    className,
}: SkillTreePremiumProps) {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const category = skillTreeConfig.categories[selectedCategory];

    // Build tree structure: group by depth
    const buildLevels = (nodes: readonly SkillNode[]): SkillNode[][] => {
        const levels: SkillNode[][] = [];
        const placed = new Set<string>();

        // Level 0: roots
        const roots = nodes.filter((n) => n.parent === null);
        levels.push([...roots]);
        roots.forEach((r) => placed.add(r.id));

        // Subsequent levels
        while (placed.size < nodes.length) {
            const nextLevel = nodes.filter(
                (n) => !placed.has(n.id) && n.parent && placed.has(n.parent)
            );
            if (nextLevel.length === 0) break;
            levels.push([...nextLevel]);
            nextLevel.forEach((n) => placed.add(n.id));
        }

        return levels;
    };

    const levels = buildLevels(category.nodes);

    return (
        <div className={cn("space-y-4", className)}>
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {skillTreeConfig.categories.map((cat, i) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(i)}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-medium whitespace-nowrap transition-all border",
                            selectedCategory === i
                                ? "bg-fire-orange/15 border-fire-orange/30 text-white"
                                : "bg-transparent border-black-border text-white-dim hover:text-white"
                        )}
                    >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Tree */}
            <div className="overflow-x-auto no-scrollbar">
                <div className="flex flex-col items-center gap-6 min-w-[320px] pb-4">
                    {levels.map((level, li) => (
                        <div key={li} className="flex items-center gap-4 relative">
                            {/* Connector lines */}
                            {li > 0 && (
                                <div className="absolute -top-6 left-1/2 w-px h-6 bg-gradient-to-b from-transparent to-fire-orange/30" />
                            )}
                            {level.map((node) => {
                                const state = getNodeState(
                                    node,
                                    unlockedNodeIds,
                                    availableXp
                                );
                                return (
                                    <div key={node.id} className="relative flex flex-col items-center">
                                        {/* Vertical connection from parent */}
                                        {node.parent && (
                                            <div
                                                className={cn(
                                                    "w-px h-4 -mt-2 mb-1",
                                                    state === "unlocked"
                                                        ? "bg-fire-orange"
                                                        : "bg-black-border"
                                                )}
                                            />
                                        )}
                                        <NodeCard
                                            node={node}
                                            state={state}
                                            onUnlock={() => onUnlockNode?.(node.id)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
