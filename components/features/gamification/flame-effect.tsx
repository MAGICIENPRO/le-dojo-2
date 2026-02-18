"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface FlameEffectProps {
    streak: number;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const FLAME_TIERS = [
    { min: 0, max: 3, emoji: "🕯️", label: "Étincelle", glowColor: "rgba(170,170,170,0.3)", gradient: ["#666666", "#AAAAAA"] },
    { min: 4, max: 7, emoji: "🔥", label: "Flamme", glowColor: "rgba(255,149,0,0.4)", gradient: ["#FF9500", "#FF6200"] },
    { min: 8, max: 14, emoji: "🌋", label: "Brasier", glowColor: "rgba(255,98,0,0.5)", gradient: ["#FF6200", "#E03000"] },
    { min: 15, max: 30, emoji: "☄️", label: "Inferno", glowColor: "rgba(224,48,0,0.6)", gradient: ["#E03000", "#B82200"] },
    { min: 31, max: Infinity, emoji: "💎", label: "Flamme Éternelle", glowColor: "rgba(255,208,0,0.5)", gradient: ["#FFD000", "#FF9500"] },
];

const SIZES = { sm: 32, md: 48, lg: 72 };

function getTier(streak: number) {
    return FLAME_TIERS.find((t) => streak >= t.min && streak <= t.max) || FLAME_TIERS[0];
}

export function FlameEffect({ streak, size = "md", className }: FlameEffectProps) {
    const tier = getTier(streak);
    const px = SIZES[size];
    const isEternal = streak >= 31;

    return (
        <motion.div
            className={cn("relative flex items-center justify-center cursor-default", className)}
            style={{ width: px, height: px }}
            whileHover={{
                scale: 1.15,
                filter: `drop-shadow(0 0 ${px / 3}px ${tier.glowColor})`,
            }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {/* Glow background */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(circle, ${tier.glowColor} 0%, transparent 70%)`,
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: isEternal ? 1.5 : 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Flame SVG */}
            <motion.svg
                viewBox="0 0 64 64"
                width={px * 0.7}
                height={px * 0.7}
                className="relative z-10"
            >
                <defs>
                    <linearGradient id={`flame-grad-${streak}`} x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor={tier.gradient[0]} />
                        <stop offset="100%" stopColor={tier.gradient[1]} />
                    </linearGradient>
                    <filter id={`flame-glow-${streak}`}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <motion.path
                    d="M32 4C32 4 18 20 18 36C18 44 24 52 32 56C40 52 46 44 46 36C46 20 32 4 32 4Z"
                    fill={`url(#flame-grad-${streak})`}
                    filter={`url(#flame-glow-${streak})`}
                    animate={{
                        d: [
                            "M32 4C32 4 18 20 18 36C18 44 24 52 32 56C40 52 46 44 46 36C46 20 32 4 32 4Z",
                            "M32 6C32 6 16 22 16 38C16 46 23 53 32 57C41 53 48 46 48 38C48 22 32 6 32 6Z",
                            "M32 3C32 3 19 19 19 35C19 43 25 51 32 55C39 51 45 43 45 35C45 19 32 3 32 3Z",
                            "M32 4C32 4 18 20 18 36C18 44 24 52 32 56C40 52 46 44 46 36C46 20 32 4 32 4Z",
                        ],
                    }}
                    transition={{
                        duration: isEternal ? 1 : 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Inner flame */}
                <motion.path
                    d="M32 18C32 18 24 28 24 38C24 42 28 48 32 50C36 48 40 42 40 38C40 28 32 18 32 18Z"
                    fill={tier.gradient[1]}
                    opacity={0.6}
                    animate={{
                        d: [
                            "M32 18C32 18 24 28 24 38C24 42 28 48 32 50C36 48 40 42 40 38C40 28 32 18 32 18Z",
                            "M32 20C32 20 23 30 23 39C23 43 27 49 32 51C37 49 41 43 41 39C41 30 32 20 32 20Z",
                            "M32 17C32 17 25 27 25 37C25 41 29 47 32 49C35 47 39 41 39 37C39 27 32 17 32 17Z",
                            "M32 18C32 18 24 28 24 38C24 42 28 48 32 50C36 48 40 42 40 38C40 28 32 18 32 18Z",
                        ],
                    }}
                    transition={{
                        duration: isEternal ? 0.8 : 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                    }}
                />
            </motion.svg>

            {/* Streak count */}
            <span
                className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-black-card border border-black-border rounded-pill px-1.5 py-0.5 z-20"
                style={{ color: tier.gradient[0] }}
            >
                {streak}
            </span>
        </motion.div>
    );
}
