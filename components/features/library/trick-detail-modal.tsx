"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, type SelectOption } from "@/components/ui/select";
import { trickCategories, trickStages } from "@/config/site-config";
import { createClient } from "@/lib/supabase/client";
import { Trash2, ExternalLink } from "lucide-react";

// Matches DB schema roughly + UI needs
export interface Trick {
    id: string;
    name: string;
    category: string;
    stage: string;       // 'study' | 'rehearsal' | 'ready'
    difficulty: number;
    practice_count: number;
    sort_order?: number;
    description?: string;
    personal_notes?: string;
    source?: string;
    // ... add more if needed
}

interface TrickDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    trick: Trick | null;
    onUpdate: () => void;
}

export function TrickDetailModal({ isOpen, onClose, trick, onUpdate }: TrickDetailModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const supabase = createClient();

    if (!trick) return null;

    const currentCategory = trickCategories.find((c) => c.id === trick.category);
    const currentStage = trickStages.find((s) => s.id === trick.stage);

    const handleDelete = async () => {
        if (!confirm("Es-tu sûr de vouloir supprimer ce tour ? Cette action est irréversible.")) return;

        setIsDeleting(true);
        try {
            const { error } = await supabase.from("tricks").delete().eq("id", trick.id);
            if (error) throw error;
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Error deleting trick:", error);
            alert("Erreur lors de la suppression du tour.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleStageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStage = e.target.value;
        if (newStage === trick.stage) return;

        setIsUpdating(true);
        try {
            const { error } = await supabase
                .from("tricks")
                .update({ stage: newStage })
                .eq("id", trick.id);

            if (error) throw error;
            onUpdate();
            // We can keep the modal open or close it. Usually keep open so user sees the change context?
            // But if the view is filtered by stage, it might disappear. 
            // Let's assume onUpdate re-fetches and the parent handles UI.
            // But we should update local trick state representation if we want to reflect change immediately?
            // Actually, better to just let parent handle data refresh.
        } catch (error) {
            console.error("Error updating stage:", error);
            alert("Erreur lors du changement de stade.");
        } finally {
            setIsUpdating(false);
        }
    };

    const stageOptions: SelectOption[] = trickStages.map((s) => ({
        value: s.id,
        label: s.label,
        icon: s.icon,
    }));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={trick.name} size="md">
            <div className="space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-black-border">
                    <Badge
                        color={currentCategory?.color}
                        icon={currentCategory?.icon}
                    >
                        {currentCategory?.label || trick.category}
                    </Badge>

                    <div className="flex items-center gap-1 ml-auto text-sm text-white-dim">
                        <span>Difficulté :</span>
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i < trick.difficulty ? "bg-fire-orange" : "bg-white/10"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {/* Description */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-white-muted tracking-wider">
                            Description
                        </label>
                        <p className="text-sm text-white-dim leading-relaxed">
                            {trick.description || "Aucune description fournie."}
                        </p>
                    </div>

                    {/* Notes */}
                    {trick.personal_notes && (
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-white-muted tracking-wider">
                                Notes Personnelles
                            </label>
                            <div className="p-3 bg-black-base/50 border border-black-border rounded-lg text-sm text-white-dim">
                                {trick.personal_notes}
                            </div>
                        </div>
                    )}

                    {/* Source */}
                    {trick.source && (
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-white-muted tracking-wider">
                                Source
                            </label>
                            <div className="flex items-center gap-2 text-sm text-white-active">
                                <ExternalLink className="w-3 h-3" />
                                <span>{trick.source}</span>
                            </div>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-3 bg-black-card rounded-lg border border-black-border text-center">
                            <div className="text-xs text-white-muted mb-1">Entraînements</div>
                            <div className="text-lg font-bold text-white">{trick.practice_count}</div>
                        </div>
                        {/* Here we could add last practice date if available in trick interface */}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-black-border mt-2">
                    <div className="flex-1">
                        <Select
                            label="Changer d'étape"
                            options={stageOptions}
                            value={trick.stage}
                            onChange={handleStageChange}
                            disabled={isUpdating}
                        />
                    </div>

                    <div className="flex items-end">
                        <Button
                            variant="ghost"
                            className="w-full sm:w-auto text-error hover:text-error hover:bg-error/10 border border-transparent hover:border-error/20"
                            onClick={handleDelete}
                            disabled={isDeleting || isUpdating}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
