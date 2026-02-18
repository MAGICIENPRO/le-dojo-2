import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const supabase = await createClient();

    // 1. Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // 2. Fetch all user data in parallel
        const [
            profileRes,
            tricksRes,
            achievementsRes,
            skillsRes,
            chatRes,
            gamificationRes
        ] = await Promise.all([
            supabase.from("profiles").select("*").eq("id", user.id).single(),
            supabase.from("tricks").select("*").eq("user_id", user.id),
            supabase.from("achievement_logs").select("*").eq("user_id", user.id),
            supabase.from("user_skills").select("*").eq("user_id", user.id),
            supabase.from("ai_chat_messages").select("*").eq("user_id", user.id).order("created_at", { ascending: true }),
            supabase.from("gamification_progress").select("*").eq("user_id", user.id).single()
        ]);

        const exportData = {
            export_date: new Date().toISOString(),
            user_id: user.id,
            email: user.email,
            profile: profileRes.data,
            gamification: gamificationRes.data,
            tricks: tricksRes.data || [],
            achievements: achievementsRes.data || [],
            skills: skillsRes.data || [],
            ai_chat_history: chatRes.data || []
        };

        // 3. Return as downloadable JSON
        return new NextResponse(JSON.stringify(exportData, null, 2), {
            headers: {
                "Content-Type": "application/json",
                "Content-Disposition": `attachment; filename="dojo-data-${user.id.slice(0, 8)}.json"`
            }
        });

    } catch (error: any) {
        console.error("Export Error:", error);
        return NextResponse.json({ error: "Échec de l'exportation des données." }, { status: 500 });
    }
}
