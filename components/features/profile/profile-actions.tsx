"use client";

import { useState } from "react";
import {
    Settings,
    Bell,
    Shield,
    ChevronRight,
    Download,
    X,
    CheckCircle2,
    FileJson,
    FileText,
    FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

interface ProfileActionsProps {
    exportLabel: string;
}

type ExportFormat = "json" | "csv" | "pdf";

export function ProfileActions({ exportLabel }: ProfileActionsProps) {
    const [activeModal, setActiveModal] = useState<"settings" | "notifications" | "privacy" | "export" | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const { success, error } = useToast();

    const handleExport = async (format: ExportFormat) => {
        setIsExporting(true);
        setActiveModal(null);
        try {
            const res = await fetch(`/dojo/api/user/export?format=${format}`);
            if (!res.ok) throw new Error("Export failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const ext = format === "csv" ? "csv" : format === "pdf" ? "pdf" : "json";
            a.download = `dojo-export-${new Date().getTime()}.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            success(`Export ${format.toUpperCase()} réussi ! Tes données sont enregistrées.`);
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

    const exportFormats: { format: ExportFormat; icon: typeof FileJson; label: string; desc: string }[] = [
        { format: "json", icon: FileJson, label: "JSON", desc: "Données brutes complètes (développeurs)" },
        { format: "csv", icon: FileSpreadsheet, label: "CSV", desc: "Tableau lisible dans Excel ou Sheets" },
        { format: "pdf", icon: FileText, label: "PDF", desc: "Rapport lisible, idéal pour archiver" },
    ];

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
                    onClick={() => setActiveModal("export")}
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
                                        {[
                                            "Tes données sont stockées de manière sécurisée via Supabase.",
                                            "Aucune donnée n'est revendue à des tiers.",
                                            "Tu peux exporter ou demander la suppression de ton compte à tout moment.",
                                        ].map((text, i) => (
                                            <div key={i} className="flex gap-2 items-start">
                                                <CheckCircle2 className="h-4 w-4 text-fire-orange shrink-0 mt-0.5" />
                                                <p>{text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="primary" className="w-full" onClick={() => setActiveModal(null)}>Fermer</Button>
                                </div>
                            )}

                            {activeModal === "export" && (
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-heading text-xl text-white">Exporter mes données</h3>
                                        <p className="text-xs text-white-muted mt-1">Choisis le format qui te convient le mieux.</p>
                                    </div>
                                    <div className="space-y-2">
                                        {exportFormats.map(({ format, icon: Icon, label, desc }) => (
                                            <button
                                                key={format}
                                                onClick={() => handleExport(format)}
                                                className="w-full flex items-center gap-3 p-3 rounded-card border border-black-border hover:border-fire-orange/40 hover:bg-white/5 transition-all text-left group"
                                            >
                                                <div className="w-9 h-9 rounded-lg bg-fire-orange/10 flex items-center justify-center shrink-0 group-hover:bg-fire-orange/20 transition-colors">
                                                    <Icon className="h-4 w-4 text-fire-orange" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-white">{label}</p>
                                                    <p className="text-[11px] text-white-dim">{desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-white-dim text-center">Conformément au RGPD, tu as le droit d&apos;accéder à toutes tes données.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}
