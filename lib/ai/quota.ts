import { createClient } from "@/lib/supabase/server";

const DAILY_QUOTA = 20;

/**
 * Récupère le quota restant pour un utilisateur
 */
export async function getRemainingQuota(userId: string) {
    const supabase = createClient();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await (await supabase)
        .from("ai_usage_log")
        .select("request_count")
        .eq("user_id", userId)
        .eq("usage_date", today)
        .single();

    if (error && error.code !== "PGRST116") { // PGRST116 is "not found"
        console.error("Error fetching quota:", error);
        return DAILY_QUOTA;
    }

    const count = data?.request_count || 0;
    return Math.max(0, DAILY_QUOTA - count);
}

/**
 * Incrémente le quota pour un utilisateur
 */
export async function incrementQuota(userId: string) {
    const supabase = createClient();
    const today = new Date().toISOString().split('T')[0];

    // Upsert logic: insert if not exists, increment if exists
    const { data: current } = await (await supabase)
        .from("ai_usage_log")
        .select("request_count")
        .eq("user_id", userId)
        .eq("usage_date", today)
        .single();

    if (!current) {
        await (await supabase).from("ai_usage_log").insert({
            user_id: userId,
            usage_date: today,
            request_count: 1
        });
    } else {
        await (await supabase)
            .from("ai_usage_log")
            .update({ request_count: current.request_count + 1 })
            .eq("user_id", userId)
            .eq("usage_date", today);
    }
}

/**
 * Sauvegarde un message dans l'historique
 */
export async function saveMessage(userId: string, role: "user" | "assistant", content: string, conversationId?: string) {
    const supabase = createClient();

    await (await supabase).from("ai_chat_messages").insert({
        user_id: userId,
        role: role,
        content: content,
        conversation_id: conversationId || null,
        created_at: new Date().toISOString()
    });
}

/**
 * Récupère l'historique des messages
 */
export async function getChatHistory(userId: string) {
    const supabase = createClient();

    const { data, error } = await (await supabase)
        .from("ai_chat_messages")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })
        .limit(50);

    if (error) {
        console.error("Error fetching chat history:", error);
        return [];
    }

    return data;
}

/**
 * Vérifie à la fois le budget global et le quota utilisateur (Circuit-Breaker)
 */
export async function checkAiBudgetAndQuota(supabase: any, userId: string) {
    const today = new Date().toISOString().split('T')[0];
    const GLOBAL_MAX = parseInt(process.env.AI_DAILY_GLOBAL_MAX_REQUESTS || "5000");

    // 1. Vérification Budget Global
    const { data: globalUsage } = await supabase
        .from("ai_usage_log")
        .select("request_count")
        .eq("usage_date", today);

    const totalRequests = globalUsage?.reduce((acc: number, curr: any) => acc + curr.request_count, 0) || 0;

    if (totalRequests >= GLOBAL_MAX) {
        return {
            allowed: false,
            error: "Budget global IA atteint (Circuit-Breaker activé).",
            remaining: 0
        };
    }

    // 2. Vérification Quota Utilisateur
    const { data: userUsage } = await supabase
        .from("ai_usage_log")
        .select("request_count")
        .eq("user_id", userId)
        .eq("usage_date", today)
        .single();

    const currentCount = userUsage?.request_count || 0;
    const remaining = Math.max(0, 20 - currentCount); // DAILY_QUOTA is 20

    if (remaining <= 0) {
        return {
            allowed: false,
            error: "Ton quota quotidien est atteint. Reviens demain ! 🔥",
            remaining: 0
        };
    }

    return { allowed: true, remaining };
}
