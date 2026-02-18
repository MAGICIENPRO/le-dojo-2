"use client";

import { motion, AnimatePresence } from "framer-motion";
import { gamificationConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";

interface RankCeremonyProps {
    rankId: string;
    userName?: string;
    isOpen: boolean;
    onClose: () => void;
}

const RANK_CEREMONIES: Record<string, { quote: string }> = {
    initie: {
        quote: "Tu ne fais plus de tours. Tu commences à créer des moments.",
    },
    maitre: {
        quote: "La technique est devenue invisible. C'est là que la vraie magie commence.",
    },
    grand_maitre: {
        quote: "Tu as compris le secret : ce n'est pas le tour qui fait le magicien. C'est le magicien qui fait le tour.",
    },
};

export function RankCeremony({ rankId, userName, isOpen, onClose }: RankCeremonyProps) {
    const rank = gamificationConfig.ranks.find((r) => r.id === rankId);
    if (!rank) return null;
    const ceremony = RANK_CEREMONIES[rankId];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black-base/95"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Background particles */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: 3 + Math.random() * 5,
                                height: 3 + Math.random() * 5,
                                background: rank.color,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 0.8, 0],
                                scale: [0, 1, 0],
                                y: [0, -100 - Math.random() * 200],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeOut",
                            }}
                        />
                    ))}

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
                        {/* Rank emoji */}
                        <motion.div
                            className="text-7xl mb-6"
                            initial={{ y: -100, scale: 0, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 12,
                                delay: 0.5,
                            }}
                            style={{
                                filter: `drop-shadow(0 0 30px ${rank.color})`,
                            }}
                        >
                            {rank.icon}
                        </motion.div>

                        {/* Rank title */}
                        <motion.h2
                            className="font-heading text-5xl md:text-6xl uppercase tracking-wider mb-2"
                            style={{
                                color: rank.color,
                                textShadow: `0 0 20px ${rank.color}, 0 0 40px ${rank.color}40`,
                            }}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            {rank.label}
                        </motion.h2>

                        {/* Username */}
                        {userName && (
                            <motion.p
                                className="text-lg text-white-muted mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                Félicitations, {userName} !
                            </motion.p>
                        )}

                        {/* Quote */}
                        {ceremony && (
                            <motion.blockquote
                                className="font-accent italic text-lg text-white-muted leading-relaxed mb-8 border-l-2 pl-4"
                                style={{ borderColor: rank.color }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.5, duration: 0.6 }}
                            >
                                &ldquo;{ceremony.quote}&rdquo;
                                <footer className="text-xs text-white-dim mt-2 not-italic">
                                    — Sébastien Pieta
                                </footer>
                            </motion.blockquote>
                        )}

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 }}
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={onClose}
                                className="shadow-glow-fire"
                            >
                                Continuer l&apos;aventure →
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
