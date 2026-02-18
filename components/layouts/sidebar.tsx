"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { navigationConfig } from "@/config/site-config";
import { Avatar } from "@/components/ui/avatar";
import { mockData } from "@/config/site-config";
import { Profile } from "@/hooks/types";
import {
    BookOpen,
    Flame,
    TrendingUp,
    Bot,
    User,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    BookOpen,
    Flame,
    TrendingUp,
    Bot,
    User,
};

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    profile: Profile | null;
}

export function Sidebar({ collapsed, onToggle, profile }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 bottom-0 z-40",
                "hidden md:flex flex-col",
                "bg-black-base border-r border-black-border",
                "transition-all duration-300 ease-out",
                collapsed ? "w-sidebar-collapsed" : "w-sidebar"
            )}
        >
            {/* Logo */}
            <div className="h-topbar flex items-center px-4 border-b border-black-border">
                <Link href="/bibliotheque" className="flex items-center gap-2 overflow-hidden">
                    <span className="text-2xl flex-shrink-0">🔥</span>
                    {!collapsed && (
                        <span className="font-heading text-xl tracking-wider text-white truncate">
                            LE DOJO
                        </span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto no-scrollbar">
                {navigationConfig.sidebar.map((item) => {
                    const Icon = iconMap[item.icon];
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-card",
                                "transition-all duration-200 group relative",
                                isActive
                                    ? "bg-fire-orange/10 text-fire-orange"
                                    : "text-white-muted hover:text-white hover:bg-white/5"
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-fire-orange rounded-r-full" />
                            )}

                            {Icon && (
                                <Icon
                                    className={cn(
                                        "h-5 w-5 flex-shrink-0 transition-colors",
                                        isActive
                                            ? "text-fire-orange"
                                            : "text-white-dim group-hover:text-white"
                                    )}
                                />
                            )}

                            {!collapsed && (
                                <span className="text-sm font-medium truncate">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Info + Collapse Toggle */}
            <div className="border-t border-black-border p-3">
                {!collapsed && (
                    <div className="flex items-center gap-3 mb-3 px-1">
                        <Avatar
                            fallback={profile?.username || mockData.user.username}
                            src={profile?.avatar_url || undefined}
                            size="sm"
                            level={profile?.level ?? 1}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {profile?.username || mockData.user.username}
                            </p>
                            <p className="text-xs text-white-dim">
                                {(profile?.total_xp ?? 0).toLocaleString()} XP
                            </p>
                        </div>
                    </div>
                )}
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-center h-8 rounded-lg text-white-dim hover:text-white hover:bg-white/5 transition-colors"
                    aria-label={collapsed ? "Développer la sidebar" : "Réduire la sidebar"}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </button>
            </div>
        </aside>
    );
}
