"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { gamificationConfig } from "@/config/site-config";

interface LevelUpOverlayProps {
    newLevel: number;
    isOpen: boolean;
    onClose: () => void;
}

export function LevelUpOverlay({ newLevel, isOpen, onClose }: LevelUpOverlayProps) {
    const rank = gamificationConfig.ranks.find(
        (r) => newLevel >= r.minLevel && newLevel <= r.maxLevel
    ) || gamificationConfig.ranks[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black-base/80"
                        onClick={onClose}
                    />

                    {/* Content */}
                    <motion.div
                        className="relative z-10 glass-card p-8 text-center max-w-sm mx-4"
                        initial={{ scale: 0.7, y: 40 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                        {/* Glow ring */}
                        <motion.div
                            className="absolute inset-0 rounded-card"
                            style={{
                                boxShadow: `0 0 30px ${rank.color}40, inset 0 0 30px ${rank.color}10`,
                            }}
                            animate={{
                                boxShadow: [
                                    `0 0 30px ${rank.color}40, inset 0 0 30px ${rank.color}10`,
                                    `0 0 50px ${rank.color}60, inset 0 0 40px ${rank.color}20`,
                                    `0 0 30px ${rank.color}40, inset 0 0 30px ${rank.color}10`,
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Level number */}
                        <motion.div
                            className="relative mb-3"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                            <span
                                className="font-heading text-7xl"
                                style={{
                                    color: rank.color,
                                    textShadow: `0 0 20px ${rank.color}`,
                                }}
                            >
                                {newLevel}
                            </span>
                        </motion.div>

                        <motion.p
                            className="font-heading text-xl uppercase tracking-wider text-white mb-1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            LEVEL UP !
                        </motion.p>

                        <motion.p
                            className="text-sm text-white-muted mb-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Tu es maintenant niveau {newLevel} — {rank.icon} {rank.label}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Button variant="primary" onClick={onClose}>
                                Continuer 🔥
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
