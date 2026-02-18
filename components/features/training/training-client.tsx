"use client";

import { useState } from "react";
import { TSVPStepper } from "@/components/features/training/tsvp-stepper";
import { SessionSummary } from "@/components/features/training/session-summary";
import { Timer } from "@/components/ui/timer";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { uiTexts } from "@/config/site-config";
import { Play, RotateCcw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// Define types for props
interface Trick {
    id: string;
    name: string;
    description: string | null;
}

interface RecentSession {
    id: string;
    trickName: string;
    date: string;
    xp: number;
}

interface TrainingClientProps {
    tricks: Trick[];
    recentSessions: RecentSession[];
}

type SessionState = "select" | "training" | "complete";

export function TrainingClient({ tricks, recentSessions }: TrainingClientProps) {
    const [state, setState] = useState<SessionState>("select");
    const [selectedTrickId, setSelectedTrickId] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [sessionStartTime, setSessionStartTime] = useState<number>(0);
    const [xpResult, setXpResult] = useState<{ xpEarned: number; bonuses: { label: string; xp: number }[] } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    const selectedTrick = tricks.find((t) => t.id === selectedTrickId);

    const startSession = () => {
        if (!selectedTrickId) return;
        setCurrentStep(0);
        setCompletedSteps([]);
        setSessionStartTime(Date.now());
        setState("training");
    };

    const completeStep = () => {
        const newCompleted = [...completedSteps, currentStep];
        setCompletedSteps(newCompleted);

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            finishSession();
        }
    };

    const finishSession = async () => {
        setIsSubmitting(true);
        const durationSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);

        try {
            const response = await fetch("/api/training/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    trick_id: selectedTrickId,
                    duration_seconds: durationSeconds,
                    step_count: 4, // Total steps in TSVP
                    completed_steps: [...completedSteps, 3] // Add last step
                })
            });

            const data = await response.json();

            if (response.ok) {
                setXpResult({
                    xpEarned: data.xp_earned,
                    bonuses: data.bonuses
                });
                setState("complete");
                router.refresh(); // Refresh server data (Profile XP etc)
            } else {
                console.error("Training submission failed", data.error);
                // Handle error (maybe toast)
                setState("complete"); // Show summary anyway but with 0 XP? Or error state.
                setXpResult({ xpEarned: 0, bonuses: [] });
            }
        } catch (e) {
            console.error(e);
            setXpResult({ xpEarned: 0, bonuses: [] });
            setState("complete");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetSession = () => {
        setState("select");
        setCurrentStep(0);
        setCompletedSteps([]);
        setSelectedTrickId("");
        setXpResult(null);
    };

    return (
        <>
            {state === "select" && (
                <div className="max-w-md mx-auto mt-8 space-y-6">
                    <Select
                        label="Tour à travailler"
                        placeholder="Choisis un tour..."
                        options={tricks.map((t) => ({
                            value: t.id,
                            label: t.name,
                        }))}
                        value={selectedTrickId}
                        onChange={(e) => setSelectedTrickId(e.target.value)}
                    />

                    {selectedTrick && (
                        <Card variant="hover" padding="md">
                            <p className="text-sm text-white">{selectedTrick.name}</p>
                            <p className="text-xs text-white-dim mt-1">{selectedTrick.description}</p>
                        </Card>
                    )}

                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={startSession}
                        disabled={!selectedTrickId}
                    >
                        <Play className="h-4 w-4" />
                        {uiTexts.training.startSession}
                    </Button>

                    {/* Recent sessions */}
                    <div className="pt-4 border-t border-black-border">
                        <h3 className="text-xs text-white-dim uppercase tracking-wider mb-3">
                            Sessions récentes
                        </h3>
                        <div className="space-y-2">
                            {recentSessions.length > 0 ? (
                                recentSessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex items-center justify-between p-3 glass-card"
                                    >
                                        <div>
                                            <p className="text-sm text-white">{session.trickName}</p>
                                            <p className="text-[10px] text-white-dim">{session.date}</p>
                                        </div>
                                        <span className="text-xs text-fire-amber font-semibold">
                                            +{session.xp} XP
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-white-dim text-center">Aucune session récente.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {state === "training" && selectedTrick && (
                <div className="max-w-lg mx-auto mt-6 space-y-6">
                    <p className="text-center text-sm text-white-muted">
                        Session : <strong className="text-white">{selectedTrick.name}</strong>
                    </p>

                    <TSVPStepper
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                        onStepClick={setCurrentStep}
                    />

                    <Timer
                        initialSeconds={300} // Optional visual aid
                        size="md"
                        label="Temps écoulé"
                        autoStart
                        stopwatch // Make it count UP to track duration visually
                    />

                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={resetSession} className="flex-1">
                            <RotateCcw className="h-4 w-4" />
                            Annuler
                        </Button>
                        <Button
                            variant="primary"
                            onClick={completeStep}
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enregistrement..." : (currentStep < 3 ? "Étape suivante →" : "Terminer ✓")}
                        </Button>
                    </div>
                </div>
            )}

            {state === "complete" && selectedTrick && (
                <div className="mt-8">
                    <SessionSummary
                        trickName={selectedTrick.name}
                        stepsCompleted={completedSteps.length}
                        totalSteps={4}
                        xpEarned={xpResult?.xpEarned || 0}
                        bonuses={xpResult?.bonuses || []}
                        onContinue={resetSession}
                        onViewProgress={() => {
                            router.push("/progression");
                        }}
                    />
                </div>
            )}
        </>
    );
}
