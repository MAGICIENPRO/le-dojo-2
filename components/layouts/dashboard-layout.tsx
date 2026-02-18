"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";
import { Topbar } from "./topbar";
import { useUserProfile } from "@/hooks/use-user-profile";

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { profile } = useUserProfile();

    return (
        <div className="min-h-screen bg-black-base">
            {/* Desktop Sidebar */}
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                profile={profile}
            />

            {/* Topbar */}
            <Topbar
                sidebarCollapsed={sidebarCollapsed}
                profile={profile}
            />

            {/* Main Content */}
            <main
                className={cn(
                    "pt-topbar pb-mobile-nav md:pb-0",
                    "transition-all duration-300",
                    sidebarCollapsed ? "md:pl-sidebar-collapsed" : "md:pl-sidebar"
                )}
            >
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <MobileNav />
        </div>
    );
}
