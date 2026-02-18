import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { XPLevelDisplay } from "@/components/features/gamification/xp-level-display";
import { uiTexts, gamificationConfig, trickCategories } from "@/config/site-config";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Download, LogOut, Settings, Shield, Bell, ChevronRight } from "lucide-react";

export default async function ProfilPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth");
    }

    // Fetch Profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!profile) {
        return <div className="p-8 text-center text-white-muted">Profil introuvable.</div>;
    }

    // Fetch Tricks for stats
    const { data: tricks } = await supabase
        .from("tricks")
        .select("category")
        .eq("user_id", user.id);

    const userTricks = tricks || [];

    // Stats by category
    const categoryStats = trickCategories
        .map((cat) => ({
            ...cat,
            count: userTricks.filter((t) => t.category === cat.id).length,
        }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count);

    const currentRank = gamificationConfig.ranks.find((r) => r.id === (profile.rank || "apprenti")) || gamificationConfig.ranks[0];

    return (
        <div className="page-container max-w-2xl mx-auto">
            <h1 className="page-title">{uiTexts.profile.title}</h1>

            {/* Profile header */}
            <Card padding="lg" className="mb-6">
                <div className="flex items-center gap-4">
                    <Avatar
                        fallback={profile.username || "M"}
                        size="xl"
                        level={profile.level}
                        src={profile.avatar_url}
                    />
                    <div className="flex-1">
                        <h2 className="font-heading text-2xl text-white">{profile.username}</h2>
                        <Badge color={currentRank.color} icon={currentRank.icon}>
                            {currentRank.label}
                        </Badge>
                        <p className="text-xs text-white-dim mt-1">
                            Membre depuis {(profile.created_at ? new Date(profile.created_at) : new Date()).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                        </p>
                    </div>
                </div>
            </Card>

            {/* XP Level compact */}
            <XPLevelDisplay
                level={profile.level}
                totalXp={profile.total_xp}
                rankId={profile.rank || "apprenti"}
                className="mb-6"
            />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <Card padding="md" className="text-center">
                    <p className="text-2xl mb-1">🔥</p>
                    <p className="font-heading text-2xl text-white">{profile.training_count}</p>
                    <p className="text-[10px] text-white-dim uppercase">Sessions</p>
                </Card>
                <Card padding="md" className="text-center">
                    <p className="text-2xl mb-1">⭐</p>
                    <p className="font-heading text-2xl text-white">{profile.tricks_mastered}</p>
                    <p className="text-[10px] text-white-dim uppercase">Tours prêts</p>
                </Card>
                <Card padding="md" className="text-center">
                    <p className="text-2xl mb-1">📅</p>
                    <p className="font-heading text-2xl text-white">{profile.current_streak}</p>
                    <p className="text-[10px] text-white-dim uppercase">Jours streak</p>
                </Card>
                <Card padding="md" className="text-center">
                    <p className="text-2xl mb-1">🏆</p>
                    <p className="font-heading text-2xl text-white">{profile.longest_streak}</p>
                    <p className="text-[10px] text-white-dim uppercase">Record streak</p>
                </Card>
            </div>

            {/* Categories breakdown */}
            <Card padding="md" className="mb-6">
                <CardTitle className="mb-3">Répartition par catégorie</CardTitle>
                <div className="space-y-3">
                    {categoryStats.length > 0 ? (
                        categoryStats.map((cat) => (
                            <div key={cat.id} className="flex items-center gap-3">
                                <span className="text-lg w-7 text-center">{cat.icon}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-white">{cat.label}</span>
                                        <span className="text-xs text-white-dim">{cat.count} tour(s)</span>
                                    </div>
                                    <ProgressBar
                                        value={cat.count}
                                        max={userTricks.length}
                                        size="sm"
                                        color={cat.color}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-white-dim italic">Aucun tour ajouté pour le moment.</p>
                    )}
                </div>
            </Card>

            {/* Settings links - UI Only for now */}
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

                <form action="/auth/signout" method="post">
                    <Button variant="danger" className="w-full" type="submit">
                        <LogOut className="h-4 w-4" />
                        Se déconnecter
                    </Button>
                </form>
            </div>
        </div>
    );
}
