import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/avatar";
import { mockData } from "@/config/site-config";
import { Flame, Bell } from "lucide-react";
import { Profile } from "@/hooks/types";

interface TopbarProps {
    sidebarCollapsed: boolean;
    profile: Profile | null;
}

export function Topbar({ sidebarCollapsed, profile }: TopbarProps) {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Close notifications when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const streak = profile?.current_streak ?? 0;
    const streakColor = streak > 0 ? "text-fire-orange" : "text-white-dim";

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
                        {streak}
                    </span>
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className="relative h-9 w-9 flex items-center justify-center rounded-card text-white-dim hover:text-white hover:bg-white/5 transition-colors"
                        aria-label="Notifications"
                    >
                        <Bell className="h-4 w-4" />
                        {/* Dot indicator - Hidden for now as we have no real notifications */}
                        {/* <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-fire-orange" /> */}
                    </button>

                    {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-black-card border border-black-border rounded-lg shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                            <p className="text-sm text-white-muted text-center">
                                Aucune notification pour l'instant
                            </p>
                        </div>
                    )}
                </div>

                {/* Avatar */}
                <Link href="/profil">
                    <Avatar
                        fallback={profile?.username || mockData.user.username}
                        src={profile?.avatar_url || undefined}
                        size="sm"
                        level={profile?.level ?? 1}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                </Link>
            </div>
        </header>
    );
}
