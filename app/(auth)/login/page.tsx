"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uiTexts } from "@/config/site-config";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const [step, setStep] = useState<"email" | "code">("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setLoading(true);
        // Mock delay
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        setStep("code");
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code.trim()) return;
        setLoading(true);
        // Mock delay — will redirect to dashboard
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        // In real app: router.push("/bibliotheque")
        window.location.href = "/bibliotheque";
    };

    return (
        <AuthLayout>
            {step === "email" ? (
                <form onSubmit={handleSendEmail} className="space-y-4">
                    <div className="text-center mb-2">
                        <h2 className="font-heading text-xl uppercase tracking-wider text-white">
                            {uiTexts.auth.loginTitle}
                        </h2>
                        <p className="text-sm text-white-muted mt-1">
                            {uiTexts.auth.loginSubtitle}
                        </p>
                    </div>

                    <Input
                        type="email"
                        placeholder={uiTexts.auth.emailPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        iconLeft={<Mail className="h-4 w-4" />}
                        required
                        autoFocus
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        loading={loading}
                    >
                        {uiTexts.auth.sendMagicLink}
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                    <button
                        type="button"
                        onClick={() => setStep("email")}
                        className="flex items-center gap-1 text-xs text-white-muted hover:text-white transition-colors mb-2"
                    >
                        <ArrowLeft className="h-3 w-3" />
                        Retour
                    </button>

                    <div className="text-center mb-2">
                        <h2 className="font-heading text-xl uppercase tracking-wider text-white">
                            {uiTexts.auth.checkInbox}
                        </h2>
                        <p className="text-sm text-white-muted mt-1">
                            {uiTexts.auth.checkInboxDescription}
                        </p>
                    </div>

                    <Input
                        type="text"
                        placeholder="000000"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-2xl tracking-[0.5em] font-heading"
                        maxLength={6}
                        autoFocus
                    />

                    <p className="text-xs text-white-dim text-center">
                        Envoyé à <strong className="text-white">{email}</strong>
                    </p>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        loading={loading}
                        disabled={code.length < 6}
                    >
                        Entrer dans le Dojo
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </form>
            )}
        </AuthLayout>
    );
}
