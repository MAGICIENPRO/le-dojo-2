"use client";

import { XPLevelDisplay } from "@/components/features/gamification/xp-level-display";
import { StreakDisplay } from "@/components/features/gamification/streak-display";
import { AchievementCard } from "@/components/features/gamification/achievement-card";
import { RewardWheel } from "@/components/features/gamification/reward-wheel";
import { uiTexts, mockData, achievementDefinitions } from "@/config/site-config";

export default function ProgressionPage() {
    return (
        <div className="page-container">
            <h1 className="page-title">{uiTexts.gamification.title}</h1>
            <p className="page-subtitle">Ton parcours de magicien en chiffres.</p>

            <div className="space-y-6 max-w-2xl mx-auto">
                {/* XP + Level */}
                <XPLevelDisplay
                    level={mockData.user.level}
                    totalXp={mockData.user.totalXp}
                    rankId={mockData.user.rank}
                />

                {/* Streak */}
                <StreakDisplay
                    currentStreak={mockData.user.currentStreak}
                    longestStreak={mockData.user.longestStreak}
                />

                {/* Reward Wheel */}
                <div className="glass-card p-6 text-center">
                    <h2 className="font-heading text-lg uppercase tracking-wider text-white mb-4">
                        🎡 ROUE DES RÉCOMPENSES
                    </h2>
                    <p className="text-sm text-white-muted mb-6">
                        Complète 5 sessions pour débloquer un tour de roue !
                    </p>
                    <RewardWheel />
                </div>

                {/* Achievements */}
                <div>
                    <h2 className="font-heading text-lg uppercase tracking-wider text-white mb-4">
                        🏆 SUCCÈS
                    </h2>
                    <div className="space-y-2">
                        {achievementDefinitions.slice(0, 8).map((achievement, i) => (
                            <AchievementCard
                                key={achievement.id}
                                name={achievement.name}
                                description={achievement.description}
                                icon={achievement.icon}
                                xpReward={achievement.xpReward}
                                unlocked={i < 4}
                                unlockedAt={i < 4 ? "17 fév. 2026" : undefined}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: "Sessions", value: mockData.user.trainingCount, icon: "🔥" },
                        { label: "Tours maîtrisés", value: mockData.user.tricksMastered, icon: "⭐" },
                        { label: "XP Total", value: mockData.user.totalXp.toLocaleString(), icon: "✨" },
                        { label: "Niveau", value: mockData.user.level, icon: "🎯" },
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
