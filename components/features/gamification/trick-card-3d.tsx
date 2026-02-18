"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/card";

interface TrickCard3DProps {
    name: string;
    category: string;
    stage: "study" | "rehearsal" | "ready";
    difficulty: number;
    practiceCount: number;
    description?: string;
    onClick?: () => void;
    className?: string;
}

const STAGE_STYLES = {
    study: {
        borderColor: "rgba(255,149,0,0.3)",
        glowColor: "none",
        label: "📖 À l'étude",
        animate: false,
    },
    rehearsal: {
        borderColor: "rgba(255,98,0,0.5)",
        glowColor: "0 0 12px rgba(255,98,0,0.2)",
        label: "🔥 En rodage",
        animate: true,
    },
    ready: {
        borderColor: "rgba(255,208,0,0.6)",
        glowColor: "0 0 16px rgba(255,208,0,0.25)",
        label: "⭐ Prêt",
        animate: false,
    },
};

export function TrickCard3D({
    name,
    category,
    stage,
    difficulty,
    practiceCount,
    description,
    onClick,
    className,
}: TrickCard3DProps) {
    const stageStyle = STAGE_STYLES[stage];

    return (
        <motion.div
            className={cn("cursor-pointer", className)}
            style={{ perspective: "800px" }}
            whileHover={{
                rotateX: -3,
                rotateY: 5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
        >
            <motion.div
                className="rounded-card border bg-black-card p-4 transition-colors"
                style={{
                    borderColor: stageStyle.borderColor,
                    boxShadow: stageStyle.glowColor,
                    transformStyle: "preserve-3d",
                }}
                animate={
                    stageStyle.animate
                        ? {
                            borderColor: [
                                "rgba(255,98,0,0.3)",
                                "rgba(255,98,0,0.6)",
                                "rgba(255,98,0,0.3)",
                            ],
                            boxShadow: [
                                "0 0 8px rgba(255,98,0,0.15)",
                                "0 0 16px rgba(255,98,0,0.3)",
                                "0 0 8px rgba(255,98,0,0.15)",
                            ],
                        }
                        : undefined
                }
                transition={stageStyle.animate ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : undefined}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-white-dim uppercase tracking-wider">
                        {stageStyle.label}
                    </span>
                    <div className="flex gap-0.5">
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
                </div>

                {/* Name */}
                <h3 className="font-heading text-base uppercase tracking-wider text-white mb-1">
                    {name}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-xs text-white-dim line-clamp-2 mb-3">{description}</p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-[10px]">
                    <span className="text-white-dim">
                        {practiceCount} session{practiceCount !== 1 ? "s" : ""}
                    </span>
                    {stage === "ready" && (
                        <motion.span
                            className="text-fire-yellow font-semibold"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            ✨ PRÊT
                        </motion.span>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
