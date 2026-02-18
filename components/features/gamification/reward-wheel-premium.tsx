"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { gamificationConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface RewardWheelPremiumProps {
    onRewardWon?: (reward: typeof gamificationConfig.wheel.rewards[number]) => void;
    onSpinRequest?: () => Promise<{ winnerIndex: number; reward: any } | null>;
    className?: string;
}

const SEGMENT_COLORS = [
    { bg: "#FF9500", border: "#FFD000" },
    { bg: "#E03000", border: "#FF6200" },
    { bg: "#FFD000", border: "#FF9500" },
    { bg: "#FF6200", border: "#E03000" },
    { bg: "#B82200", border: "#FF6200" },
    { bg: "#FF9500", border: "#FFD000" },
];

export function RewardWheelPremium({ onRewardWon, onSpinRequest, className }: RewardWheelPremiumProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<typeof gamificationConfig.wheel.rewards[number] | null>(null);
    const controls = useAnimation();
    const currentRotation = useRef(0);

    const rewards = gamificationConfig.wheel.rewards;
    const segmentAngle = 360 / rewards.length;

    const spin = async () => {
        if (isSpinning) return;

        let winnerIndex = 0;
        let serverReward = null;

        if (onSpinRequest) {
            const data = await onSpinRequest();
            if (!data) return; // Erreur gérée par le parent
            winnerIndex = data.winnerIndex;
            serverReward = data.reward;
        } else {
            // Fallback mock (ancien comportement)
            const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
            let random = Math.random() * totalWeight;
            for (let i = 0; i < rewards.length; i++) {
                random -= rewards[i].weight;
                if (random <= 0) { winnerIndex = i; break; }
            }
        }

        setIsSpinning(true);
        setResult(null);

        // Calculate target
        const targetAngle = 360 - (winnerIndex * segmentAngle + segmentAngle / 2);
        const totalRotation = currentRotation.current + 360 * 6 + targetAngle;
        currentRotation.current = totalRotation;

        // Animate
        await controls.start({
            rotate: totalRotation,
            transition: {
                duration: 5,
                ease: [0.12, 0.8, 0.32, 1],
            },
        });

        setIsSpinning(false);
        const finalReward = serverReward || rewards[winnerIndex];
        setResult(finalReward);
        onRewardWon?.(finalReward);
    };

    return (
        <div className={cn("flex flex-col items-center gap-6", className)}>
            {/* Wheel container */}
            <div className="relative w-72 h-72 md:w-80 md:h-80">
                {/* Outer ring glow */}
                <div className="absolute inset-[-4px] rounded-full border-2 border-fire-orange/20 glow-fire-pulse" />

                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                    <motion.div
                        className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-fire-orange"
                        style={{ filter: "drop-shadow(0 0 8px rgba(255,98,0,0.6))" }}
                        animate={isSpinning ? { scale: [1, 1.1, 1] } : undefined}
                        transition={isSpinning ? { duration: 0.15, repeat: Infinity } : undefined}
                    />
                </div>

                {/* Wheel SVG */}
                <motion.div
                    className="w-full h-full"
                    style={{ transformOrigin: "center" }}
                    animate={controls}
                >
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                        {/* Outer ring */}
                        <circle cx="150" cy="150" r="148" fill="none" stroke="#1C1C1C" strokeWidth="4" />

                        {rewards.map((reward, i) => {
                            const startAngle = i * segmentAngle - 90;
                            const endAngle = startAngle + segmentAngle;
                            const startRad = (startAngle * Math.PI) / 180;
                            const endRad = (endAngle * Math.PI) / 180;
                            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                            const x1 = 150 + 140 * Math.cos(startRad);
                            const y1 = 150 + 140 * Math.sin(startRad);
                            const x2 = 150 + 140 * Math.cos(endRad);
                            const y2 = 150 + 140 * Math.sin(endRad);

                            const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
                            const labelX = 150 + 90 * Math.cos(midAngle);
                            const labelY = 150 + 90 * Math.sin(midAngle);
                            const labelRotation = (startAngle + endAngle) / 2 + 90;

                            const colors = SEGMENT_COLORS[i % SEGMENT_COLORS.length];

                            return (
                                <g key={i}>
                                    {/* Segment */}
                                    <path
                                        d={`M 150 150 L ${x1} ${y1} A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                        fill={colors.bg}
                                        stroke="#020202"
                                        strokeWidth="2"
                                        opacity={0.9}
                                    />
                                    {/* Separator line */}
                                    <line
                                        x1="150" y1="150"
                                        x2={x1} y2={y1}
                                        stroke={colors.border}
                                        strokeWidth="1"
                                        opacity={0.4}
                                    />
                                    {/* Label */}
                                    <text
                                        x={labelX}
                                        y={labelY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${labelRotation}, ${labelX}, ${labelY})`}
                                        className="fill-black-base font-body"
                                        style={{ fontSize: "8px", fontWeight: 700 }}
                                    >
                                        {reward.label}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Center hub */}
                        <circle cx="150" cy="150" r="22" fill="#0F0F0F" stroke="#FF6200" strokeWidth="3" />
                        <circle cx="150" cy="150" r="10" fill="#FF6200" />
                        <circle cx="150" cy="150" r="4" fill="#FFD000" />
                    </svg>
                </motion.div>
            </div>

            {/* Spin button */}
            <Button
                variant="primary"
                size="lg"
                onClick={spin}
                disabled={isSpinning}
                loading={isSpinning}
                className="shadow-glow-fire-sm hover:shadow-glow-fire"
            >
                <Gift className="h-5 w-5" />
                {isSpinning ? "La roue tourne..." : "🎡 Tourner la roue !"}
            </Button>

            {/* Result */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        className="glass-card p-5 text-center"
                        initial={{ scale: 0.5, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <p className="text-xs text-white-muted uppercase tracking-wider mb-1">
                            Tu as gagné
                        </p>
                        <motion.p
                            className="font-heading text-2xl"
                            style={{
                                background: "linear-gradient(135deg, #FFD000, #FF6200)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {result.label}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
