import { XPLevelDisplay } from "@/components/features/gamification/xp-level-display";
import { StreakDisplay } from "@/components/features/gamification/streak-display";
import { AchievementCard } from "@/components/features/gamification/achievement-card";
import { RewardWheel } from "@/components/features/gamification/reward-wheel";
import { uiTexts, achievementDefinitions, gamificationConfig } from "@/config/site-config";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProgressionPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth");
    }

    // Parallel fetching
    const [profileRes, gamificationRes, achievementsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("gamification_progress").select("*").eq("user_id", user.id).single(),
        supabase.from("achievement_log").select("*").eq("user_id", user.id)
    ]);

    const profile = profileRes.data;
    const gamification = gamificationRes.data;
    const unlockedAchievements = achievementsRes.data || [];

    if (!profile) {
        return <div>Profil introuvable.</div>;
    }

    // Fallback if gamification_progress is missing (should be created on signup)
    // We use gamificationConfig defaults if needed, or null checks
    const currentStreak = profile.current_streak || 0;
    const longestStreak = profile.longest_streak || 0;

    // Check if achievement is unlocked
    const isUnlocked = (id: string) => unlockedAchievements.some((a) => a.achievement_id === id);
    const getUnlockedDate = (id: string) => {
        const log = unlockedAchievements.find((a) => a.achievement_id === id);
        if (!log) return undefined;
        return new Date(log.unlocked_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
    };

    return (
        <div className="page-container">
            <h1 className="page-title">{uiTexts.gamification.title}</h1>
            <p className="page-subtitle">Ton parcours de magicien en chiffres.</p>

            <div className="space-y-6 max-w-2xl mx-auto">
                {/* XP + Level */}
                <XPLevelDisplay
                    level={profile.level}
                    totalXp={profile.total_xp}
                    rankId={profile.rank || "apprenti"}
                />

                {/* Streak */}
                <StreakDisplay
                    currentStreak={currentStreak}
                    longestStreak={longestStreak}
                />

                {/* Reward Wheel */}
                {/* Note: RewardWheel is likely interactive client component. We might need to pass data to it if it tracks spins available */}
                <div className="glass-card p-6 text-center">
                    <h2 className="font-heading text-lg uppercase tracking-wider text-white mb-4">
                        🎡 ROUE DES RÉCOMPENSES
                    </h2>
                    <p className="text-sm text-white-muted mb-6">
                        {gamification && gamification.wheel_spins_available > 0
                            ? `Tu as ${gamification.wheel_spins_available} tour(s) de roue disponible(s) !`
                            : `Complète ${gamificationConfig.wheel.spinsEveryNSessions - (gamification?.trainings_since_last_spin || 0)} sessions pour débloquer un tour de roue !`
                        }
                    </p>
                    <RewardWheel
                        spinsAvailable={gamification?.wheel_spins_available || 0}
                    // We might need to handle spin logic via server action or API, keeping it visual for now
                    />
                </div>

                {/* Achievements */}
                <div>
                    <h2 className="font-heading text-lg uppercase tracking-wider text-white mb-4">
                        🏆 SUCCÈS
                    </h2>
                    <div className="space-y-2">
                        {achievementDefinitions.map((achievement) => (
                            <AchievementCard
                                key={achievement.id}
                                name={achievement.name}
                                description={achievement.description}
                                icon={achievement.icon}
                                xpReward={achievement.xpReward}
                                unlocked={isUnlocked(achievement.id)}
                                unlockedAt={getUnlockedDate(achievement.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: "Sessions", value: profile.training_count, icon: "🔥" },
                        { label: "Tours maîtrisés", value: profile.tricks_mastered, icon: "⭐" },
                        { label: "XP Total", value: profile.total_xp.toLocaleString(), icon: "✨" },
                        { label: "Niveau", value: profile.level, icon: "🎯" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-4 text-center">
                            <span className="text-2xl block mb-1">{stat.icon}</span>
                            <p className="font-heading text-xl text-white">{stat.value}</p>
                            <p className="text-[10px] text-white-dim uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
