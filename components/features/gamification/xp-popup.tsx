"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface XPPopupProps {
    amount: number;
    label?: string;
    visible: boolean;
    onComplete?: () => void;
}

export function XPPopup({ amount, label, visible, onComplete }: XPPopupProps) {
    const isJackpot = amount >= 200;

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {visible && (
                <motion.div
                    className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* XP text */}
                    <motion.div
                        className="flex flex-col items-center"
                        initial={{ y: 40, scale: 0.5, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: -60, scale: 0.8, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                        }}
                    >
                        <motion.span
                            className={cn(
                                "font-heading tracking-wider",
                                isJackpot ? "text-6xl" : "text-4xl"
                            )}
                            style={{
                                background: isJackpot
                                    ? "linear-gradient(135deg, #FFD000, #FF6200, #E03000)"
                                    : "linear-gradient(135deg, #FFD000, #FF9500)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                filter: `drop-shadow(0 0 20px rgba(255, 149, 0, ${isJackpot ? "0.6" : "0.3"}))`,
                            }}
                            animate={{
                                scale: [1, 1.15, 1],
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.3,
                            }}
                        >
                            +{amount} XP
                        </motion.span>

                        {label && (
                            <motion.span
                                className="text-sm text-white-muted mt-1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {label}
                            </motion.span>
                        )}
                    </motion.div>

                    {/* Burst particles */}
                    {isJackpot && (
                        <>
                            {Array.from({ length: 12 }).map((_, i) => {
                                const angle = (i / 12) * Math.PI * 2;
                                const distance = 80 + Math.random() * 40;
                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute rounded-full"
                                        style={{
                                            width: 4 + Math.random() * 4,
                                            height: 4 + Math.random() * 4,
                                            background: ["#FFD000", "#FF9500", "#FF6200"][i % 3],
                                        }}
                                        initial={{ x: 0, y: 0, opacity: 1 }}
                                        animate={{
                                            x: Math.cos(angle) * distance,
                                            y: Math.sin(angle) * distance,
                                            opacity: 0,
                                            scale: 0,
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.1 + Math.random() * 0.2,
                                            ease: "easeOut",
                                        }}
                                    />
                                );
                            })}
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
