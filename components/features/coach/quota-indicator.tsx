"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface QuotaIndicatorProps {
    remaining: number;
    max: number;
    className?: string;
}

export function QuotaIndicator({ remaining, max, className }: QuotaIndicatorProps) {
    const percentage = (remaining / max) * 100;
    const isLow = remaining <= 3;
    const isExhausted = remaining === 0;

    return (
        <div
            className={cn(
                "glass-card px-4 py-3 border-b-0 rounded-b-none mb-0",
                "flex flex-col gap-2",
                className
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            "w-2 h-2 rounded-full animate-pulse",
                            isExhausted ? "bg-fire-red" : isLow ? "bg-fire-amber" : "bg-fire-orange"
                        )}
                    />
                    <span className="text-xs font-medium text-white">
                        {isExhausted ? (
                            <span className="text-fire-red">Quota atteint</span>
                        ) : (
                            <span>Coach IA</span>
                        )}
                    </span>
                </div>
                <span className="text-[10px] text-white-dim uppercase tracking-widest font-bold">
                    {remaining}/{max} requêtes restantes
                </span>
            </div>

            <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className={cn(
                        "absolute top-0 left-0 h-full",
                        isExhausted ? "bg-fire-red" : isLow ? "bg-fire-amber" : "bg-fire-orange"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        boxShadow: `0 0 10px ${isExhausted ? "rgba(224,48,0,0.5)" : isLow ? "rgba(255,149,0,0.4)" : "rgba(255,98,0,0.4)"
                            }`,
                    }}
                />
            </div>

            {isExhausted && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-fire-red font-medium text-center mt-1"
                >
                    Reviens demain pour de nouveaux conseils ! 🔥
                </motion.p>
            )}
        </div>
    );
}
