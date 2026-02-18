"use client";

import { useState, useEffect, useMemo } from "react";
import { KanbanBoard } from "@/components/features/library/kanban-board";
import { FilterBar } from "@/components/features/library/filter-bar";
import { TrickCard } from "@/components/features/library/trick-card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { uiTexts, trickCategories, trickStages } from "@/config/site-config"; // Removed mockData
import { Plus, BookOpen, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Trick, TrickDetailModal } from "@/components/features/library/trick-detail-modal";

type ViewMode = "kanban" | "matrix";

export default function BibliothequePage() {
    const [viewMode, setViewMode] = useState<ViewMode>("kanban");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedStage, setSelectedStage] = useState<string | null>(null);

    // Data State
    const [tricks, setTricks] = useState<Trick[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Modal State
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedTrick, setSelectedTrick] = useState<Trick | null>(null);

    // Form State (for ADD)
    const [newTrickName, setNewTrickName] = useState("");
    const [newTrickCategory, setNewTrickCategory] = useState("");
    const [newTrickStage, setNewTrickStage] = useState("study");
    const [newTrickDescription, setNewTrickDescription] = useState("");

    const supabase = createClient();

    const fetchTricks = async () => {
        // Optimistic update logic or just loader? 
        // For DnD we don't want full loader block, but for initial load yes.
        // We can check if tricks is empty to show generic loader.
        try {
            const { data, error } = await supabase
                .from("tricks")
                .select("*")
                .order("sort_order", { ascending: true })
                .order("created_at", { ascending: false });

            if (error) throw error;
            setTricks(data || []);
        } catch (error) {
            console.error("Error fetching tricks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTricks();
    }, []);

    const filteredTricks = useMemo(() => {
        return tricks.filter((trick) => {
            const matchesSearch = trick.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || trick.category === selectedCategory;
            const matchesStage = !selectedStage || trick.stage === selectedStage;
            return matchesSearch && matchesCategory && matchesStage;
        });
    }, [tricks, searchQuery, selectedCategory, selectedStage]);

    const handleAddTrick = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not authenticated");

            const { error } = await supabase.from("tricks").insert({
                user_id: user.id,
                name: newTrickName,
                category: newTrickCategory,
                stage: newTrickStage,
                description: newTrickDescription,
                practice_count: 0,
                difficulty: 1, // Default
                sort_order: 0 // Default
            });

            if (error) throw error;

            // Reset form
            setNewTrickName("");
            setNewTrickCategory("");
            setNewTrickStage("study");
            setNewTrickDescription("");
            setShowAddModal(false);

            // Refresh
            fetchTricks();
        } catch (error) {
            console.error("Error adding trick:", error);
            alert("Erreur lors de l'ajout du tour.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-container">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="page-title">{uiTexts.library.title}</h1>
                    <p className="text-body-sm">
                        {filteredTricks.length} tour{filteredTricks.length !== 1 ? "s" : ""} au total
                    </p>
                </div>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Ajouter un tour</span>
                </Button>
            </div>

            {/* Filters */}
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedStage={selectedStage}
                onStageChange={setSelectedStage}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                className="mb-6"
            />

            {/* Content */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 text-fire-orange animate-spin" />
                </div>
            ) : filteredTricks.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-white-dim" />
                    </div>
                    <h3 className="font-heading text-lg text-white uppercase mb-1">
                        {uiTexts.library.emptyState.title}
                    </h3>
                    <p className="text-sm text-white-muted mb-4">
                        {searchQuery || selectedCategory || selectedStage
                            ? "Aucun tour ne correspond à ta recherche."
                            : uiTexts.library.emptyState.description}
                    </p>
                    <Button variant="primary" onClick={() => setShowAddModal(true)}>
                        <Plus className="h-4 w-4" />
                        {uiTexts.library.emptyState.cta}
                    </Button>
                </div>
            ) : viewMode === "kanban" ? (
                <KanbanBoard
                    tricks={filteredTricks}
                    onTrickClick={setSelectedTrick}
                    onTrickUpdate={fetchTricks}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredTricks.map((trick) => (
                        <TrickCard
                            key={trick.id}
                            {...trick} // Spread trick props (name, category, stage, description)
                            practiceCount={trick.practice_count} // Map explicitly just in case, though {...trick} handles it if interface matches
                            onClick={() => setSelectedTrick(trick)}
                        />
                    ))}
                </div>
            )}

            {/* Add Trick Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Ajouter un tour"
                size="md"
            >
                <form className="space-y-4" onSubmit={handleAddTrick}>
                    <Input
                        label="Nom du tour"
                        placeholder="ex: Ambitious Card"
                        required
                        value={newTrickName}
                        onChange={(e) => setNewTrickName(e.target.value)}
                    />
                    <Select
                        label="Catégorie"
                        placeholder="Choisis une catégorie"
                        options={trickCategories.map((c) => ({
                            value: c.id,
                            label: c.label,
                            icon: c.icon,
                        }))}
                        value={newTrickCategory}
                        onChange={(e) => setNewTrickCategory(e.target.value)}
                        required
                    />
                    <Select
                        label="Stade"
                        options={trickStages.map((s) => ({
                            value: s.id,
                            label: s.label,
                            icon: s.icon,
                        }))}
                        value={newTrickStage}
                        onChange={(e) => setNewTrickStage(e.target.value)}
                    />
                    <Textarea
                        label="Description"
                        placeholder="Décris l'effet du tour en une phrase..."
                        value={newTrickDescription}
                        onChange={(e) => setNewTrickDescription(e.target.value)}
                    />
                    <div className="flex gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} className="flex-1">
                            Annuler
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ajouter"}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Detail Modal */}
            <TrickDetailModal
                isOpen={!!selectedTrick}
                onClose={() => setSelectedTrick(null)}
                trick={selectedTrick}
                onUpdate={fetchTricks}
            />
        </div>
    );
}
