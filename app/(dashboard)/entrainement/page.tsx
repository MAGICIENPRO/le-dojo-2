"use client";

import { useState } from "react";
import { TSVPStepper } from "@/components/features/training/tsvp-stepper";
import { SessionSummary } from "@/components/features/training/session-summary";
import { Timer } from "@/components/ui/timer";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { uiTexts, mockData } from "@/config/site-config";
import { Play, RotateCcw } from "lucide-react";

type SessionState = "select" | "training" | "complete";

export default function EntrainementPage() {
    const [state, setState] = useState<SessionState>("select");
    const [selectedTrickId, setSelectedTrickId] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const selectedTrick = mockData.tricks.find((t) => t.id === selectedTrickId);

    const startSession = () => {
        if (!selectedTrickId) return;
        setCurrentStep(0);
        setCompletedSteps([]);
        setState("training");
    };

    const completeStep = () => {
        const newCompleted = [...completedSteps, currentStep];
        setCompletedSteps(newCompleted);

        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            setState("complete");
        }
    };

    const resetSession = () => {
        setState("select");
        setCurrentStep(0);
        setCompletedSteps([]);
        setSelectedTrickId("");
    };

    return (
        <div className="page-container">
            <h1 className="page-title">{uiTexts.training.title}</h1>
            <p className="page-subtitle">Choisis un tour et lance ta session TSVP.</p>

            {state === "select" && (
                <div className="max-w-md mx-auto mt-8 space-y-6">
                    <Select
                        label="Tour à travailler"
                        placeholder="Choisis un tour..."
                        options={mockData.tricks.map((t) => ({
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
                            {mockData.recentSessions.map((session) => (
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
                            ))}
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
                        initialSeconds={300}
                        size="md"
                        label="Temps restant"
                        autoStart
                    />

                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={resetSession} className="flex-1">
                            <RotateCcw className="h-4 w-4" />
                            Annuler
                        </Button>
                        <Button variant="primary" onClick={completeStep} className="flex-1">
                            {currentStep < 3 ? "Étape suivante →" : "Terminer ✓"}
                        </Button>
                    </div>
                </div>
            )}

            {state === "complete" && selectedTrick && (
                <div className="mt-8">
                    <SessionSummary
                        trickName={selectedTrick.name}
                        stepsCompleted={4}
                        totalSteps={4}
                        xpEarned={100}
                        bonuses={[
                            { label: "Toutes les étapes", xp: 50 },
                            { label: "Streak bonus", xp: 25 },
                        ]}
                        onContinue={resetSession}
                        onViewProgress={() => {
                            window.location.href = "/progression";
                        }}
                    />
                </div>
            )}
        </div>
    );
}
