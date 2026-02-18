"use client";

import { useState } from "react";
import {
    Settings,
    Bell,
    Shield,
    ChevronRight,
    Download,
    X,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

interface ProfileActionsProps {
    exportLabel: string;
}

export function ProfileActions({ exportLabel }: ProfileActionsProps) {
    const [activeModal, setActiveModal] = useState<"settings" | "notifications" | "privacy" | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const { success, error } = useToast();

    const handleExport = async () => {
        setIsExporting(true);
        try {
            const res = await fetch("/dojo/api/user/export");
            if (!res.ok) throw new Error("Export failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `dojo-export-${new Date().getTime()}.json`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            success("Export réussi ! Tes données sont enregistrées.");
        } catch (err) {
            error("Impossible d'exporter les données.");
        } finally {
            setIsExporting(false);
        }
    };

    const actionItems = [
        { id: "settings", icon: Settings, label: "Paramètres" },
        { id: "notifications", icon: Bell, label: "Notifications" },
        { id: "privacy", icon: Shield, label: "Confidentialité" },
    ] as const;

    return (
        <>
            <div className="space-y-1 mb-6">
                {actionItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveModal(item.id)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-card text-sm text-white-muted hover:text-white hover:bg-white/5 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 group-hover:text-fire-orange transition-colors" />
                            <span>{item.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-50" />
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleExport}
                    loading={isExporting}
                >
                    <Download className="h-4 w-4" />
                    {exportLabel}
                </Button>
            </div>

            {/* Modals Overlay */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <Card className="w-full max-w-md relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-white-muted"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="p-6">
                            {activeModal === "settings" && (
                                <div className="space-y-4">
                                    <h3 className="font-heading text-xl text-white">Paramètres</h3>
                                    <p className="text-sm text-white-muted italic">La modification du pseudo arrive bientôt dans la forge...</p>
                                    <Button variant="primary" className="w-full" onClick={() => setActiveModal(null)}>Compris</Button>
                                </div>
                            )}

                            {activeModal === "notifications" && (
                                <div className="space-y-4">
                                    <h3 className="font-heading text-xl text-white">Notifications</h3>
                                    <div className="flex items-center justify-between p-3 rounded-card bg-white/5">
                                        <div>
                                            <p className="text-sm text-white font-medium">Emails transactionnels</p>
                                            <p className="text-[11px] text-white-dim">Bienvenue, Level Up, etc.</p>
                                        </div>
                                        <div className="h-5 w-10 bg-fire-orange rounded-full relative p-1 cursor-pointer">
                                            <div className="h-3 w-3 bg-white rounded-full ml-auto" />
                                        </div>
                                    </div>
                                    <Button variant="primary" className="w-full" onClick={() => setActiveModal(null)}>Enregistrer</Button>
                                </div>
                            )}

                            {activeModal === "privacy" && (
                                <div className="space-y-4">
                                    <h3 className="font-heading text-xl text-white">Confidentialité</h3>
                                    <div className="space-y-2 text-sm text-white-muted leading-relaxed">
                                        <div className="flex gap-2 items-start">
                                            <CheckCircle2 className="h-4 w-4 text-fire-orange shrink-0 mt-0.5" />
                                            <p>Tes données sont stockées de manière sécurisée via Supabase.</p>
                                        </div>
                                        <div className="flex gap-2 items-start">
                                            <CheckCircle2 className="h-4 w-4 text-fire-orange shrink-0 mt-0.5" />
                                            <p>Aucune donnée n'est revendue à des tiers.</p>
                                        </div>
                                        <div className="flex gap-2 items-start">
                                            <CheckCircle2 className="h-4 w-4 text-fire-orange shrink-0 mt-0.5" />
                                            <p>Tu peux exporter ou demander la suppression de ton compte à tout moment.</p>
                                        </div>
                                    </div>
                                    <Button variant="primary" className="w-full" onClick={() => setActiveModal(null)}>Fermer</Button>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}
