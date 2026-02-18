"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface TooltipProps {
    content: string;
    children: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    className?: string;
}

const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export function Tooltip({
    content,
    children,
    side = "top",
    className,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className={cn("relative inline-flex", className)}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={cn(
                        "absolute z-50 pointer-events-none",
                        "px-2.5 py-1.5 rounded-lg",
                        "bg-black-card border border-black-border shadow-card",
                        "text-xs text-white-muted whitespace-nowrap",
                        "animate-fade-in",
                        positionStyles[side]
                    )}
                    role="tooltip"
                >
                    {content}
                </div>
            )}
        </div>
    );
}
