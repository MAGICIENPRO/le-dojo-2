"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerProps {
    initialSeconds: number;
    autoStart?: boolean;
    size?: "sm" | "md" | "lg";
    onComplete?: () => void;
    onTick?: (remaining: number) => void;
    className?: string;
    label?: string;
    stopwatch?: boolean;
}

const sizes = {
    sm: { svgSize: 80, strokeWidth: 4, fontSize: "text-lg" },
    md: { svgSize: 140, strokeWidth: 6, fontSize: "text-3xl" },
    lg: { svgSize: 200, strokeWidth: 8, fontSize: "text-4xl" },
};

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function Timer({
    initialSeconds,
    autoStart = false,
    size = "md",
    onComplete,
    onTick,
    className,
    label,
    stopwatch = false,
}: TimerProps) {
    // If stopwatch, initialSeconds acts as optional limit or just reference, but we start at 0 usually or track elapsed.
    // However, existing usage in Training keeps logic simple. 
    // Let's implement stopwatch logic: instead of countdown, we display elapsed time? 
    // BUT the prop passed in TrainingClient is `initialSeconds={300}` which implies countdown.
    // The comment said "Make it count UP to track duration visually".
    // If we want countdown but visual aid of tracking? 
    // Let's assume the user wants it to behave as countdown BUT `stopwatch` might imply something else. 
    // Actually, looking at TrainingClient: `duration_seconds` is calculated by `Date.now() - start`.
    // The Timer is just visual.
    // If `stopwatch` is true, let's make it count up from 0 to initialSeconds? Or just count down?
    // User wrote: `stopwatch // Make it count UP to track duration visually`
    // So I should implement count up.

    const [value, setValue] = useState(stopwatch ? 0 : initialSeconds);
    const [isRunning, setIsRunning] = useState(autoStart);
    const { svgSize, strokeWidth, fontSize } = sizes[size];

    const radius = (svgSize - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;

    // For stopwatch, progress is value / initialSeconds (if limit) or just looping.
    // Let's assume initialSeconds is the "target" or max for progress bar.
    const progress = stopwatch ? Math.min(value / (initialSeconds || 60), 1) : value / initialSeconds;
    const offset = circumference * (1 - progress);

    useEffect(() => {
        if (!isRunning) return;

        // If countdown and reach 0, stop
        if (!stopwatch && value <= 0) return;

        const interval = setInterval(() => {
            setValue((prev) => {
                const next = stopwatch ? prev + 1 : prev - 1;
                onTick?.(next);

                if (!stopwatch && next <= 0) {
                    setIsRunning(false);
                    onComplete?.();
                    return 0;
                }
                return next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, value, onComplete, onTick, stopwatch]);

    const toggle = useCallback(() => {
        if (!stopwatch && value <= 0) return;
        setIsRunning((prev) => !prev);
    }, [value, stopwatch]);

    const reset = useCallback(() => {
        setIsRunning(false);
        setValue(stopwatch ? 0 : initialSeconds);
    }, [initialSeconds, stopwatch]);

    // Color based on remaining time
    const getColor = () => {
        if (progress > 0.5) return "#FF9500";
        if (progress > 0.2) return "#FF6200";
        return "#E03000";
    };

    return (
        <div className={cn("flex flex-col items-center gap-3", className)}>
            {label && (
                <span className="text-xs font-medium text-white-muted uppercase tracking-wider">
                    {label}
                </span>
            )}

            {/* SVG Circle */}
            <div className="relative" style={{ width: svgSize, height: svgSize }}>
                <svg
                    width={svgSize}
                    height={svgSize}
                    className="-rotate-90"
                    aria-hidden="true"
                >
                    {/* Background circle */}
                    <circle
                        cx={svgSize / 2}
                        cy={svgSize / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <circle
                        cx={svgSize / 2}
                        cy={svgSize / 2}
                        r={radius}
                        fill="none"
                        stroke={getColor()}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-all duration-1000 ease-linear"
                        style={{
                            filter: `drop-shadow(0 0 8px ${getColor()}40)`,
                        }}
                    />
                </svg>

                {/* Time display */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className={cn(
                            "font-heading tabular-nums",
                            fontSize,
                            !stopwatch && value <= 10 && value > 0 && "text-fire-red animate-pulse"
                        )}
                        role="timer"
                        aria-live="polite"
                        aria-label={`${formatTime(value)}`}
                    >
                        {formatTime(value)}
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={toggle}
                    className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        "transition-all duration-200",
                        isRunning
                            ? "bg-fire-orange/20 text-fire-orange hover:bg-fire-orange/30"
                            : "bg-gradient-fire-btn text-black-base hover:shadow-glow-fire-sm"
                    )}
                    aria-label={isRunning ? "Pause" : "Démarrer"}
                >
                    {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </button>
                <button
                    onClick={reset}
                    className="h-10 w-10 rounded-full flex items-center justify-center bg-white/5 text-white-muted hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Réinitialiser"
                >
                    <RotateCcw className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
