"use client";

import { cn } from "@/lib/utils/cn";
import { tsvpSteps } from "@/config/site-config";
import { Check } from "lucide-react";

interface TSVPStepperProps {
    currentStep: number; // 0-3
    completedSteps: number[];
    onStepClick?: (stepIndex: number) => void;
    className?: string;
}

export function TSVPStepper({
    currentStep,
    completedSteps,
    onStepClick,
    className,
}: TSVPStepperProps) {
    return (
        <div className={cn("w-full", className)}>
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-6">
                {tsvpSteps.map((step, index) => {
                    const isCompleted = completedSteps.includes(index);
                    const isCurrent = index === currentStep;
                    const isPast = index < currentStep;

                    return (
                        <div key={step.id} className="flex items-center flex-1 last:flex-initial">
                            {/* Step circle */}
                            <button
                                onClick={() => onStepClick?.(index)}
                                className={cn(
                                    "relative flex items-center justify-center",
                                    "w-12 h-12 md:w-14 md:h-14 rounded-full",
                                    "font-heading text-xl md:text-2xl",
                                    "transition-all duration-300",
                                    isCompleted && "ring-2 ring-success/50",
                                    isCurrent
                                        ? "bg-gradient-fire-btn text-black-base shadow-glow-fire-sm scale-110"
                                        : isPast || isCompleted
                                            ? "bg-fire-orange/20 text-fire-orange"
                                            : "bg-white/5 text-white-dim border border-black-border"
                                )}
                                aria-label={`Étape ${step.letter} — ${step.label}`}
                                aria-current={isCurrent ? "step" : undefined}
                            >
                                {isCompleted ? (
                                    <Check className="h-5 w-5 text-success" />
                                ) : (
                                    step.letter
                                )}

                                {/* Glow effect on current */}
                                {isCurrent && (
                                    <div
                                        className="absolute inset-0 rounded-full animate-pulse-glow"
                                        style={{ boxShadow: `0 0 20px ${step.color}40` }}
                                        aria-hidden="true"
                                    />
                                )}
                            </button>

                            {/* Connecting line */}
                            {index < tsvpSteps.length - 1 && (
                                <div
                                    className={cn(
                                        "flex-1 h-0.5 mx-2 rounded-full",
                                        isPast || isCompleted
                                            ? "bg-gradient-to-r from-fire-orange to-fire-amber"
                                            : "bg-white/10"
                                    )}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Current step info */}
            <div className="glass-card p-4 md:p-5">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{tsvpSteps[currentStep].icon}</span>
                    <div>
                        <h3 className="font-heading text-lg uppercase tracking-wider text-white">
                            {tsvpSteps[currentStep].label}
                        </h3>
                        <p className="text-xs text-white-muted">
                            {tsvpSteps[currentStep].description}
                        </p>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-3 space-y-1.5">
                    {tsvpSteps[currentStep].tips.map((tip, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-white-dim"
                        >
                            <span className="text-fire-amber mt-0.5">→</span>
                            <span>{tip}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
