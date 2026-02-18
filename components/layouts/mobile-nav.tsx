"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { navigationConfig } from "@/config/site-config";
import {
    BookOpen,
    Flame,
    TrendingUp,
    Bot,
    User,
} from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    BookOpen,
    Flame,
    TrendingUp,
    Bot,
    User,
};

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                "fixed bottom-0 left-0 right-0 z-40",
                "md:hidden",
                "h-mobile-nav",
                "bg-black-base/95 backdrop-blur-md",
                "border-t border-black-border",
                "px-2 safe-area-bottom"
            )}
        >
            <div className="flex items-center justify-around h-full max-w-md mx-auto">
                {navigationConfig.mobileNav.map((item) => {
                    const Icon = iconMap[item.icon];
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-0.5",
                                "w-16 py-1 rounded-lg",
                                "transition-all duration-200",
                                "active:scale-95",
                                isActive
                                    ? "text-fire-orange"
                                    : "text-white-dim"
                            )}
                        >
                            <div className="relative">
                                {Icon && (
                                    <Icon
                                        className={cn(
                                            "h-5 w-5",
                                            isActive && "drop-shadow-[0_0_6px_rgba(255,98,0,0.5)]"
                                        )}
                                    />
                                )}
                                {/* Active dot */}
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-fire-orange" />
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px] font-medium",
                                isActive ? "text-fire-orange" : "text-white-dim"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
