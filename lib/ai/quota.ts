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
