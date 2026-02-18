"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { gamificationConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface RewardWheelProps {
    onRewardWon?: (reward: typeof gamificationConfig.wheel.rewards[number]) => void;
    className?: string;
    spinsAvailable?: number;
}

const SEGMENT_COLORS = [
    "#FF9500",
    "#E03000",
    "#FFD000",
    "#FF6200",
    "#B82200",
    "#FF9500",
];

export function RewardWheel({ onRewardWon, className, spinsAvailable = 0 }: RewardWheelProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    const rewards = gamificationConfig.wheel.rewards;
    const segmentAngle = 360 / rewards.length;

    const spin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setResult(null);

        // Weighted random selection
        const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
        let random = Math.random() * totalWeight;
        let winnerIndex = 0;

        for (let i = 0; i < rewards.length; i++) {
            random -= rewards[i].weight;
            if (random <= 0) {
                winnerIndex = i;
                break;
            }
        }

        // Calculate rotation
        const targetAngle = 360 - (winnerIndex * segmentAngle + segmentAngle / 2);
        const totalRotation = 360 * 5 + targetAngle; // 5 full rotations + target

        if (wheelRef.current) {
            wheelRef.current.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
            wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
        }

        setTimeout(() => {
            setIsSpinning(false);
            setResult(rewards[winnerIndex].label);
            onRewardWon?.(rewards[winnerIndex]);
        }, 4200);
    };

    return (
        <div className={cn("flex flex-col items-center gap-4", className)}>
            {/* Wheel */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-fire-orange drop-shadow-lg" />
                </div>

                {/* SVG Wheel */}
                <div
                    ref={wheelRef}
                    className="w-full h-full"
                    style={{ transformOrigin: "center" }}
                >
                    <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
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

                            // Label position
                            const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
                            const labelX = 150 + 90 * Math.cos(midAngle);
                            const labelY = 150 + 90 * Math.sin(midAngle);
                            const labelRotation = (startAngle + endAngle) / 2 + 90;

                            return (
                                <g key={i}>
                                    <path
                                        d={`M 150 150 L ${x1} ${y1} A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                        fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                                        stroke="#020202"
                                        strokeWidth="2"
                                        opacity={0.9}
                                    />
                                    <text
                                        x={labelX}
                                        y={labelY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${labelRotation}, ${labelX}, ${labelY})`}
                                        className="fill-black-base font-body text-[9px] font-bold"
                                        style={{ fontSize: "9px" }}
                                    >
                                        {reward.label}
                                    </text>
                                </g>
                            );
                        })}
                        {/* Center circle */}
                        <circle cx="150" cy="150" r="20" fill="#020202" stroke="#FF6200" strokeWidth="3" />
                        <circle cx="150" cy="150" r="8" fill="#FF6200" />
                    </svg>
                </div>
            </div>

            {/* Spin button */}
            <Button
                variant="primary"
                size="lg"
                onClick={spin}
                disabled={isSpinning}
                loading={isSpinning}
            >
                <Gift className="h-5 w-5" />
                {isSpinning ? "La roue tourne..." : "Tourner la roue !"}
            </Button>

            {/* Result */}
            {result && (
                <div className="glass-card p-4 text-center animate-scale-in">
                    <p className="text-xs text-white-muted uppercase tracking-wider mb-1">
                        Tu as gagné
                    </p>
                    <p className="font-heading text-xl gradient-fire-text">{result}</p>
                </div>
            )}
        </div>
    );
}
