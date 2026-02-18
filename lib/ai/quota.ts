import { SupabaseClient } from "@supabase/supabase-js";
import { aiCoachConfig } from "@/config/site-config";

interface QuotaResult {
    allowed: boolean;
    remaining: number;
    resetAt: string;
    error?: "BUDGET_EXCEEDED" | "QUOTA_EXCEEDED";
}

export async function checkAiBudgetAndQuota(
    supabase: SupabaseClient,
    userId: string
): Promise<QuotaResult> {
    const today = new Date().toISOString().split("T")[0];
    const userLimit = aiCoachConfig.maxFreeRequestsPerDay || 20;
    const globalLimit = 5000; // Circuit-breaker budget à 50€

    // 1. Circuit-Breaker Global
    const { data: globalUsage, error: globalError } = await supabase
        .from("ai_usage_log")
        .select("request_count")
        .eq("usage_date", today);

    const totalGlobalRequests = (globalUsage || []).reduce((acc, curr) => acc + curr.request_count, 0);

    if (totalGlobalRequests >= globalLimit) {
        return {
            allowed: false,
            remaining: 0,
            resetAt: getNextResetAt(),
            error: "BUDGET_EXCEEDED"
        };
    }

    // 2. Quota Individuel
    const { data: userUsage } = await supabase
        .from("ai_usage_log")
        .select("request_count")
        .eq("user_id", userId)
        .eq("usage_date", today)
        .single();

    const currentCount = userUsage?.request_count ?? 0;

    if (currentCount >= userLimit) {
        return {
            allowed: false,
            remaining: 0,
            resetAt: getNextResetAt(),
            error: "QUOTA_EXCEEDED"
        };
    }

    // 3. Incrémenter (UPSERT)
    await supabase
        .from("ai_usage_log")
        .upsert(
            {
                user_id: userId,
                usage_date: today,
                request_count: currentCount + 1,
            },
            { onConflict: "user_id,usage_date" }
        );

    return {
        allowed: true,
        remaining: userLimit - currentCount - 1,
        resetAt: getNextResetAt(),
    };
}

function getNextResetAt() {
    const reset = new Date();
    reset.setUTCHours(24, 0, 0, 0);
    return reset.toISOString();
}
