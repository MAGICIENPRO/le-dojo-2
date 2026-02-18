import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | Le Dojo 2.0",
        default: "Dashboard",
    },
};

export default function DashboardGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
