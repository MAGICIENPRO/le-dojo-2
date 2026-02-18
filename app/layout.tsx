import type { Metadata } from "next";
import { Bebas_Neue, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { appConfig } from "@/config/site-config";
import { Toaster } from "sonner";

const bebas = Bebas_Neue({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-bebas",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: `${appConfig.name} — ${appConfig.tagline}`,
        template: `%s | ${appConfig.name}`,
    },
    description: appConfig.description,
    robots: {
        index: false,
        follow: false,
    },
    openGraph: {
        title: appConfig.name,
        description: appConfig.description,
        url: appConfig.url,
        siteName: appConfig.name,
        locale: appConfig.locale,
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="fr"
            className={`${bebas.variable} ${outfit.variable} ${playfair.variable}`}
        >
            <body className="bg-black-base text-white font-body antialiased">
                {children}
                <Toaster richColors position="bottom-right" theme="dark" />
            </body>
        </html>
    );
}
