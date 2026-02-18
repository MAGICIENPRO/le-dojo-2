import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Connexion",
    description: "Connecte-toi au Dojo pour commencer ton entraînement.",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
