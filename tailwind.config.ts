import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./config/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // === PALETTE MAGMA (FEU) ===
                fire: {
                    yellow: "#FFD000",
                    amber: "#FF9500",
                    orange: "#FF6200",
                    red: "#E03000",
                    ember: "#B82200",
                },
                // === FONDS & NEUTRES ===
                black: {
                    base: "#020202",
                    light: "#0A0A0A",
                    card: "#0F0F0F",
                    border: "#1C1C1C",
                    hover: "#161616",
                },
                white: {
                    DEFAULT: "#FFFFFF",
                    muted: "#AAAAAA",
                    dim: "#666666",
                },
                // === ÉTATS ===
                success: "#22C55E",
                warning: "#FBBF24",
                error: "#EF4444",
                info: "#3B82F6",
            },
            fontFamily: {
                heading: ["var(--font-bebas)", "sans-serif"],
                body: ["var(--font-outfit)", "sans-serif"],
                accent: ["var(--font-playfair)", "serif"],
            },
            fontSize: {
                "display-xl": ["4rem", { lineHeight: "1", letterSpacing: "0.02em" }],
                "display-lg": ["3rem", { lineHeight: "1.1", letterSpacing: "0.02em" }],
                "display-md": ["2.25rem", { lineHeight: "1.1", letterSpacing: "0.02em" }],
                "display-sm": ["1.75rem", { lineHeight: "1.2", letterSpacing: "0.02em" }],
            },
            borderRadius: {
                "card": "0.75rem",
                "card-lg": "1rem",
                "pill": "9999px",
            },
            boxShadow: {
                "glow-fire": "0 0 20px rgba(255, 98, 0, 0.3), 0 0 60px rgba(255, 98, 0, 0.1)",
                "glow-fire-sm": "0 0 10px rgba(255, 98, 0, 0.2)",
                "glow-fire-lg": "0 0 40px rgba(255, 98, 0, 0.4), 0 0 80px rgba(255, 98, 0, 0.15)",
                "glow-yellow": "0 0 20px rgba(255, 208, 0, 0.3)",
                "glow-red": "0 0 20px rgba(224, 48, 0, 0.3)",
                "card": "0 4px 24px rgba(0, 0, 0, 0.4)",
                "card-hover": "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 98, 0, 0.1)",
            },
            backgroundImage: {
                "gradient-fire": "linear-gradient(135deg, #FFD000, #FF6200, #E03000)",
                "gradient-fire-btn": "linear-gradient(90deg, #FF9500, #FF6200)",
                "gradient-fire-subtle": "linear-gradient(180deg, #0F0F0F, #020202)",
                "gradient-fire-radial": "radial-gradient(ellipse at center, rgba(255,98,0,0.15) 0%, transparent 70%)",
                "gradient-card": "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
            },
            animation: {
                "flicker": "flicker 3s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "spin-wheel": "spin-wheel 4s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards",
                "float": "float 6s ease-in-out infinite",
                "slide-up": "slide-up 0.3s ease-out",
                "slide-down": "slide-down 0.3s ease-out",
                "fade-in": "fade-in 0.3s ease-out",
                "scale-in": "scale-in 0.2s ease-out",
                "streak-flame": "streak-flame 1.5s ease-in-out infinite",
                "xp-fill": "xp-fill 1s ease-out forwards",
            },
            keyframes: {
                "flicker": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.8" },
                },
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(255, 98, 0, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(255, 98, 0, 0.5)" },
                },
                "spin-wheel": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(1800deg)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(16px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "slide-down": {
                    "0%": { transform: "translateY(-16px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                "streak-flame": {
                    "0%, 100%": { transform: "scaleY(1) scaleX(1)" },
                    "25%": { transform: "scaleY(1.1) scaleX(0.95)" },
                    "50%": { transform: "scaleY(0.95) scaleX(1.05)" },
                    "75%": { transform: "scaleY(1.05) scaleX(0.97)" },
                },
                "xp-fill": {
                    "0%": { width: "0%" },
                    "100%": { width: "var(--xp-width, 0%)" },
                },
            },
            spacing: {
                "sidebar": "240px",
                "sidebar-collapsed": "72px",
                "topbar": "64px",
                "mobile-nav": "72px",
            },
        },
    },
    plugins: [],
};

export default config;
