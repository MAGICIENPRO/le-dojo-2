"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    DropAnimation,
    defaultDropAnimationSideEffects,
    MeasuringStrategy,
    Active
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
    arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils/cn";
import { trickStages } from "@/config/site-config";
import { TrickCard } from "./trick-card";
import { Trick } from "./trick-detail-modal";
import { createClient } from "@/lib/supabase/client";

interface KanbanBoardProps {
    tricks: Trick[];
    onTrickClick?: (trick: Trick) => void;
    onTrickUpdate: () => void; // Trigger refresh
    className?: string;
}

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.5",
            },
        },
    }),
};

function SortableTrickCard({ trick, onClick }: { trick: Trick; onClick?: () => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: trick.id,
        data: {
            type: "Trick",
            trick,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
            <TrickCard
                {...trick}
                practiceCount={trick.practice_count}
                onClick={onClick}
                className={isDragging ? "cursor-grabbing" : "cursor-grab"}
            />
        </div>
    );
}

export function KanbanBoard({ tricks, onTrickClick, onTrickUpdate, className }: KanbanBoardProps) {
    // Group tricks by stage
    const [columns, setColumns] = useState<Record<string, Trick[]>>({});
    const [activeTrick, setActiveTrick] = useState<Trick | null>(null);
    const supabase = createClient();
    const isFirstRun = useRef(true);

    // Initialize columns from props
    useEffect(() => {
        const newColumns: Record<string, Trick[]> = {};
        trickStages.forEach(stage => {
            newColumns[stage.id] = tricks
                .filter(t => t.stage === stage.id)
                .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)); // Ensure sorted if possible
        });
        setColumns(newColumns);
    }, [tricks]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Avoid accidental drags when clicking
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findContainer = (id: string): string | undefined => {
        if (id in columns) return id;
        return Object.keys(columns).find(key => columns[key].find(t => t.id === id));
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const trick = active.data.current?.trick as Trick;
        setActiveTrick(trick);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        const overId = over?.id;

        if (!overId || active.id === overId) return;

        const activeContainer = findContainer(active.id as string);
        const overContainer = findContainer(overId as string);

        if (!activeContainer || !overContainer || activeContainer === overContainer) return;

        // Moving between columns
        setColumns((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];
            const activeIndex = activeItems.findIndex((t) => t.id === active.id);
            const overIndex = overItems.findIndex((t) => t.id === overId);

            let newIndex;
            if (overId in prev) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowOverItem =
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item.id !== active.id),
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    prev[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length),
                ],
            };
        });
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        const activeId = active.id as string;
        const overId = over?.id as string;

        if (!overId) {
            setActiveTrick(null);
            return;
        }

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        if (activeContainer && overContainer) {
            const activeIndex = columns[activeContainer].findIndex((t) => t.id === activeId);
            const overIndex = columns[overContainer].findIndex((t) => t.id === overId);

            let newColumns = { ...columns };

            if (activeContainer === overContainer) {
                // Reordering in same column
                if (activeIndex !== overIndex) {
                    newColumns[activeContainer] = arrayMove(newColumns[activeContainer], activeIndex, overIndex);
                    setColumns(newColumns);
                    // Update sort_order in DB (optional/bonus, simpler to just update stage for now as per minimal reqs, but nice to have)
                }
            } else {
                // Moving between columns (handled visually in DragOver, now persist)
                // In handleDragOver we already updated state.
                // We just need to persist the new stage.
                // But wait, DndKit DragEnd fires *after* DragOver.
                // If we updated state in DragOver, activeContainer might be the *old* one?
                // Actually findContainer uses current state.
                // So activeContainer might be the new one if state updated.
                // Let's rely on `activeTrick` and `overContainer`.

                // For simplicity: Update stage in DB.
                // The `trick.stage` property in local state needs update too?
                // Yes, handleDragOver moves the object but doesn't update its .stage property inside the array.

                // Let's update the stage in Supabase
                // Find which column the trick ended up in
                const finalContainer = Object.keys(columns).find(key => columns[key].find(t => t.id === activeId));

                if (finalContainer && activeTrick && activeTrick.stage !== finalContainer) {
                    // Perform Update
                    await supabase.from('tricks').update({ stage: finalContainer }).eq('id', activeId);
                    onTrickUpdate(); // Refresh data to be sure
                }
            }
        }

        setActiveTrick(null);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
        >
            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
                {trickStages.map((stage) => {
                    const stageTricks = columns[stage.id] || [];
                    return (
                        <div key={stage.id} className="flex flex-col h-full rounded-lg bg-white/5 p-2">
                            {/* Column header */}
                            <div className="flex items-center justify-between mb-3 px-2 pt-2">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ background: stage.color }}
                                    />
                                    <h3 className="text-sm font-semibold text-white">
                                        {stage.label}
                                    </h3>
                                    <span className="text-xs text-white-dim bg-white/5 px-1.5 py-0.5 rounded-pill">
                                        {stageTricks.length}
                                    </span>
                                </div>
                            </div>

                            {/* Droppable Area */}
                            <SortableContext
                                id={stage.id}
                                items={stageTricks.map(t => t.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-2 flex-1 min-h-[150px]">
                                    {stageTricks.map((trick) => (
                                        <SortableTrickCard
                                            key={trick.id}
                                            trick={trick}
                                            onClick={() => onTrickClick?.(trick)}
                                        />
                                    ))}
                                    {stageTricks.length === 0 && (
                                        <div className="h-full border border-dashed border-white/10 rounded-lg flex items-center justify-center p-4">
                                            <p className="text-xs text-white-dim text-center">
                                                Aucun tour
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </SortableContext>
                        </div>
                    )
                })}
            </div>

            <DragOverlay dropAnimation={dropAnimation}>
                {activeTrick ? (
                    <div className="transform rotate-3 scale-105 cursor-grabbing">
                        <TrickCard
                            {...activeTrick}
                            practiceCount={activeTrick.practice_count}
                        />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
