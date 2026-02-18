import { mistral } from "@ai-sdk/mistral";
import { streamText } from "ai";
import { createClient } from "@/lib/supabase/server";
import { checkAiBudgetAndQuota } from "@/lib/ai/quota";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        // ━━━━ 1. AUTHENTIFICATION ━━━━
        const supabase = createClient();
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "UNAUTHORIZED", message: "Tu dois être connecté pour parler au Coach." },
                { status: 401 }
            );
        }

        // ━━━━ 2. VALIDATION ━━━━
        const { message } = await req.json();

        if (!message || typeof message !== "string" || message.trim().length === 0) {
            return NextResponse.json(
                { error: "VALIDATION_ERROR", message: "Message vide." },
                { status: 422 }
            );
        }

        // ━━━━ 3. BUDGET & QUOTA CHECK (Circuit-Breaker) ━━━━
        const quotaResult = await checkAiBudgetAndQuota(supabase, user.id);

        if (!quotaResult.allowed) {
            if (quotaResult.error === "BUDGET_EXCEEDED") {
                return NextResponse.json(
                    {
                        error: "SERVICE_UNAVAILABLE",
                        message: "Le Coach est temporairement en maintenance pour cause de forte affluence. Il revient très vite !",
                    },
                    {
                        status: 503,
                        headers: { "Retry-After": "3600" }
                    }
                );
            }

            return NextResponse.json(
                {
                    error: "QUOTA_EXCEEDED",
                    message: "Tu as utilisé tes 20 messages d'aujourd'hui. Le Coach revient demain à minuit !",
                    resetAt: quotaResult.resetAt,
                },
                { status: 429 }
            );
        }

        // ━━━━ 4. APPEL LLM (STREAMING) ━━━━
        // Note: Pour une implémentation complète, nous devrions ici injecter 
        // le RAG et le System Prompt. Pour cet exercice, nous nous concentrons 
        // sur le circuit-breaker budgétaire.

        const result = streamText({
            model: mistral("mistral-small-latest"),
            system: "Tu es le Coach du Dojo, un assistant expert en magie. Tu aides l'utilisateur à progresser via la méthode M.A.G.I.E. de Sébastien Pieta.",
            messages: [{ role: "user", content: message }],
            maxTokens: 1024,
            temperature: 0.7,
        });

        // ━━━━ 5. RÉPONSE AVEC HEADERS DE QUOTA ━━━━
        return result.toDataStreamResponse({
            headers: {
                "X-AI-Remaining": String(quotaResult.remaining),
                "X-Quota-Reset-At": quotaResult.resetAt,
            },
        });

    } catch (error) {
        console.error("[AI Chat Error]", error);
        return NextResponse.json(
            {
                error: "INTERNAL_ERROR",
                message: "Oups, le Coach a un souci technique. Réessaie dans quelques minutes.",
            },
            { status: 500 }
        );
    }
}
