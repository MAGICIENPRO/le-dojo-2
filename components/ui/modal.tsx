"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "full";
}

const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    full: "max-w-[95vw] md:max-w-4xl",
};

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={title}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black-base/80 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Content */}
            <div
                className={cn(
                    "relative w-full animate-scale-in",
                    "glass-card p-5 md:p-6",
                    "shadow-glow-fire-sm",
                    "max-h-[85vh] overflow-y-auto no-scrollbar",
                    sizeStyles[size]
                )}
            >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-black-border">
                        <h2 className="font-heading text-xl uppercase tracking-wider text-white">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="h-8 w-8 flex items-center justify-center rounded-lg text-white-muted hover:text-white hover:bg-white/5 transition-colors"
                            aria-label="Fermer"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {!title && (
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-lg text-white-muted hover:text-white hover:bg-white/5 transition-colors z-10"
                        aria-label="Fermer"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}

                {children}
            </div>
        </div>
    );
}
