"use client";

import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/avatar";
import { mockData } from "@/config/site-config";
import { Flame, Bell } from "lucide-react";

interface TopbarProps {
    sidebarCollapsed: boolean;
}

export function Topbar({ sidebarCollapsed }: TopbarProps) {
    const streakColor = mockData.user.currentStreak > 0 ? "text-fire-orange" : "text-white-dim";

    return (
        <header
            className={cn(
                "fixed top-0 right-0 z-30",
                "h-topbar",
                "bg-black-base/80 backdrop-blur-md",
                "border-b border-black-border",
                "flex items-center justify-between px-4 md:px-6",
                "transition-all duration-300",
                // Desktop: offset by sidebar width
                sidebarCollapsed ? "md:left-sidebar-collapsed" : "md:left-sidebar",
                // Mobile: full width
                "left-0"
            )}
        >
            {/* Left: Mobile logo */}
            <div className="flex items-center gap-2 md:hidden">
                <span className="text-xl">🔥</span>
                <span className="font-heading text-lg tracking-wider text-white">
                    LE DOJO
                </span>
            </div>

            {/* Left: Desktop page breadcrumb area (can be filled by pages) */}
            <div className="hidden md:block" />

            {/* Right: Status + Avatar */}
            <div className="flex items-center gap-3">
                {/* Streak indicator */}
                <div className={cn("flex items-center gap-1", streakColor)}>
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-semibold tabular-nums">
                        {mockData.user.currentStreak}
                    </span>
                </div>

                {/* Notifications */}
                <button
                    className="relative h-9 w-9 flex items-center justify-center rounded-card text-white-dim hover:text-white hover:bg-white/5 transition-colors"
                    aria-label="Notifications"
                >
                    <Bell className="h-4 w-4" />
                    {/* Dot indicator */}
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-fire-orange" />
                </button>

                {/* Avatar */}
                <Avatar
                    fallback={mockData.user.username}
                    size="sm"
                    level={mockData.user.level}
                />
            </div>
        </header>
    );
}
