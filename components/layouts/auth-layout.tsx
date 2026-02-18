import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-black-base flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background fire glow effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fire-orange/5 blur-[120px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-fire-red/5 blur-[100px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <span className="text-5xl block mb-3">🔥</span>
                    <h1 className="font-heading text-3xl tracking-wider text-white">
                        LE DOJO
                    </h1>
                </div>

                {/* Card */}
                <div className="glass-card p-6 md:p-8 shadow-glow-fire-sm">
                    {children}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-white-dim mt-6">
                    © 2026 MagicienPro — Tous droits réservés
                </p>
            </div>
        </div>
    );
}
