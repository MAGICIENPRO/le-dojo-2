"use client";

import { useState, useMemo } from "react";
import { KanbanBoard } from "@/components/features/library/kanban-board";
import { FilterBar } from "@/components/features/library/filter-bar";
import { TrickCard } from "@/components/features/library/trick-card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { uiTexts, mockData, trickCategories, trickStages } from "@/config/site-config";
import { Plus, BookOpen } from "lucide-react";

type ViewMode = "kanban" | "matrix";

export default function BibliothequePage() {
    const [viewMode, setViewMode] = useState<ViewMode>("kanban");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedStage, setSelectedStage] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredTricks = useMemo(() => {
        return mockData.tricks.filter((trick) => {
            const matchesSearch = trick.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || trick.category === selectedCategory;
            const matchesStage = !selectedStage || trick.stage === selectedStage;
            return matchesSearch && matchesCategory && matchesStage;
        });
    }, [searchQuery, selectedCategory, selectedStage]);

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
            {filteredTricks.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-white-dim" />
                    </div>
                    <h3 className="font-heading text-lg text-white uppercase mb-1">
                        {uiTexts.library.emptyState.title}
                    </h3>
                    <p className="text-sm text-white-muted mb-4">
                        {uiTexts.library.emptyState.description}
                    </p>
                    <Button variant="primary" onClick={() => setShowAddModal(true)}>
                        <Plus className="h-4 w-4" />
                        {uiTexts.library.emptyState.cta}
                    </Button>
                </div>
            ) : viewMode === "kanban" ? (
                <KanbanBoard tricks={filteredTricks} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredTricks.map((trick) => (
                        <TrickCard key={trick.id} {...trick} />
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
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
                    <Input label="Nom du tour" placeholder="ex: Ambitious Card" required />
                    <Select
                        label="Catégorie"
                        placeholder="Choisis une catégorie"
                        options={trickCategories.map((c) => ({
                            value: c.id,
                            label: c.label,
                            icon: c.icon,
                        }))}
                    />
                    <Select
                        label="Stade"
                        options={trickStages.map((s) => ({
                            value: s.id,
                            label: s.label,
                            icon: s.icon,
                        }))}
                    />
                    <Textarea
                        label="Description"
                        placeholder="Décris l'effet du tour en une phrase..."
                    />
                    <div className="flex gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)} className="flex-1">
                            Annuler
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1">
                            Ajouter
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
