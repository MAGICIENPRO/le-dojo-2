import Link from "next/link";
import { uiTexts, appConfig } from "@/config/site-config";
import { BookOpen, Flame, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    BookOpen,
    Flame,
    TrendingUp,
};

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black-base relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-fire-orange/[0.04] blur-[150px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-fire-red/[0.06] blur-[120px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <span className="font-heading text-xl tracking-wider text-white">LE DOJO</span>
                </div>
                <Link
                    href="/login"
                    className="text-sm text-white-muted hover:text-white transition-colors"
                >
                    Se connecter
                </Link>
            </header>

            <main className="relative z-10">
                {/* Hero */}
                <section className="px-4 md:px-8 pt-16 md:pt-24 pb-20 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill border border-fire-orange/20 bg-fire-orange/5 text-xs text-fire-orange mb-6">
                        <Sparkles className="h-3 w-3" />
                        <span>Nouveau — Ton coach IA intégré</span>
                    </div>

                    <h1 className="font-heading text-display-lg md:text-[5rem] leading-none tracking-wider text-white mb-4">
                        {uiTexts.landing.heroTitle}
                    </h1>

                    <p className="text-lg md:text-xl text-white-muted max-w-xl mx-auto mb-8">
                        {uiTexts.landing.heroSubtitle}
                    </p>

                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-card-lg font-semibold text-black-base bg-gradient-fire-btn shadow-glow-fire-sm hover:shadow-glow-fire transition-all duration-200 active:scale-[0.97]"
                    >
                        {uiTexts.landing.heroCta}
                        <ArrowRight className="h-5 w-5" />
                    </Link>

                    <p className="text-xs text-white-dim mt-4">
                        ✨ {uiTexts.landing.ctaSecondary}
                    </p>
                </section>

                {/* Benefits */}
                <section className="px-4 md:px-8 py-16 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {uiTexts.landing.benefits.map((benefit, i) => {
                            const Icon = iconMap[benefit.icon];
                            return (
                                <div
                                    key={i}
                                    className="glass-card p-6 group hover:border-fire-orange/20 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-card flex items-center justify-center bg-fire-orange/10 mb-4 group-hover:bg-fire-orange/15 transition-colors">
                                        {Icon && <Icon className="h-6 w-6 text-fire-orange" />}
                                    </div>
                                    <h3 className="font-heading text-lg uppercase tracking-wider text-white mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-white-muted leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Social proof */}
                <section className="px-4 md:px-8 py-12 text-center">
                    <div className="inline-flex items-center gap-3 glass-card px-6 py-3">
                        <div className="flex -space-x-2">
                            {["🎴", "🪙", "🧠", "🎭"].map((emoji, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-fire-orange/20 flex items-center justify-center text-sm border-2 border-black-card"
                                >
                                    {emoji}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-white-muted">
                            {uiTexts.landing.socialProof.replace("{count}", "127")}
                        </p>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="px-4 md:px-8 py-20 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-wider gradient-fire-text mb-4">
                        Prêt à progresser ?
                    </h2>
                    <p className="text-white-muted mb-8 max-w-md mx-auto">
                        Rejoins le Dojo et transforme ta pratique de la magie.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-card-lg font-semibold text-black-base bg-gradient-fire-btn shadow-glow-fire-sm hover:shadow-glow-fire transition-all duration-200"
                    >
                        {uiTexts.landing.ctaFinal}
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    <p className="text-xs text-white-dim mt-4">
                        ✨ {uiTexts.landing.ctaSecondary}
                    </p>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-black-border px-4 md:px-8 py-6 text-center">
                <p className="text-xs text-white-dim">
                    © 2026 {appConfig.brand} — {appConfig.tagline}
                </p>
            </footer>
        </div>
    );
}
