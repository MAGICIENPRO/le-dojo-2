"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { XPLevelDisplay } from "@/components/features/gamification/xp-level-display";
import { uiTexts, mockData, gamificationConfig, trickCategories } from "@/config/site-config";
import { Download, LogOut, Settings, Shield, Bell, ChevronRight } from "lucide-react";

export default function ProfilPage() {
    const user = mockData.user;
    const currentRank = gamificationConfig.ranks.find((r) => r.id === user.rank) || gamificationConfig.ranks[0];

    // Stats by category
    const categoryStats = trickCategories
        .map((cat) => ({
            ...cat,
            count: mockData.tricks.filter((t) => t.category === cat.id).length,
        }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count);

    return (
        <div className="page-container max-w-2xl mx-auto">
            <h1 className="page-title">{uiTexts.profile.title}</h1>

            {/* Profile header */}
            <Card padding="lg" className="mb-6">
                <div className="flex items-center gap-4">
                    <Avatar
                        fallback={user.username}
                        size="xl"
                        level={user.level}
                    />
                    <div className="flex-1">
                        <h2 className="font-heading text-2xl text-white">{user.username}</h2>
                        <Badge color={currentRank.color} icon={currentRank.icon}>
                            {currentRank.label}
                        </Badge>
                        <p className="text-xs text-white-dim mt-1">
                            Membre depuis février 2026
                        </p>
                    </div>
                </div>
            </Card>

            {/* XP Level compact */}
            <XPLevelDisplay
                level={user.level}
                totalXp={user.totalXp}
                rankId={user.rank}
                className="mb-6"
            />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Card padding="md" className="text-center">
                    <p className="text-2xl mb-1">🔥</p>
                    <p className="font-heading text-2xl text-white">{user.trainingCount}</p>
                    <p className="text-[10px] text-white-dim uppercase">Sessions</p>
                </Card>
                <Card padding="md" className="text-center">
                    <p className="text-2xl mb-1">⭐</p>
                    <p className="font-heading text-2xl text-white">{user.tricksMastered}</p>
                    <p className="text-[10px] text-white-dim uppercase">Tours prêts</p>
                </Card>
                <Card padding="md" className="text-center">
                    <p className="text-2xl mb-1">📅</p>
                    <p className="font-heading text-2xl text-white">{user.currentStreak}</p>
                    <p className="text-[10px] text-white-dim uppercase">Jours streak</p>
                </Card>
                <Card padding="md" className="text-center">
                    <p className="text-2xl mb-1">🏆</p>
                    <p className="font-heading text-2xl text-white">{user.longestStreak}</p>
                    <p className="text-[10px] text-white-dim uppercase">Record streak</p>
                </Card>
            </div>

            {/* Categories breakdown */}
            <Card padding="md" className="mb-6">
                <CardTitle className="mb-3">Répartition par catégorie</CardTitle>
                <div className="space-y-3">
                    {categoryStats.map((cat) => (
                        <div key={cat.id} className="flex items-center gap-3">
                            <span className="text-lg w-7 text-center">{cat.icon}</span>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-white">{cat.label}</span>
                                    <span className="text-xs text-white-dim">{cat.count} tour(s)</span>
                                </div>
                                <ProgressBar
                                    value={cat.count}
                                    max={mockData.tricks.length}
                                    size="sm"
                                    color={cat.color}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Settings links */}
            <div className="space-y-1 mb-6">
                {[
                    { icon: Settings, label: "Paramètres", href: "#" },
                    { icon: Bell, label: "Notifications", href: "#" },
                    { icon: Shield, label: "Confidentialité", href: "#" },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-card text-sm text-white-muted hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                ))}
            </div>

            {/* Export + Logout */}
            <div className="space-y-2">
                <Button variant="secondary" className="w-full">
                    <Download className="h-4 w-4" />
                    {uiTexts.profile.exportButton}
                </Button>
                <Button variant="danger" className="w-full">
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                </Button>
            </div>
        </div>
    );
}
