import { TrainingClient } from "@/components/features/training/training-client";
import { uiTexts } from "@/config/site-config";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function EntrainementPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/auth");
    }

    // Fetch Tricks
    const { data: tricks } = await supabase
        .from("tricks")
        .select("id, name, description")
        .eq("user_id", user.id)
        .order("name");

    // Fetch Recent Sessions
    const { data: sessions } = await supabase
        .from("training_sessions")
        .select(`
            id,
            xp_earned,
            completed_at,
            tricks (
                name
            )
        `)
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(5);

    // Transform sessions for Client Component
    const formattedSessions = (sessions || []).map(s => {
        // Supabase join can return array or object depending on schema introspection
        const trickName = Array.isArray(s.tricks)
            ? s.tricks[0]?.name
            : (s.tricks as any)?.name || "Tour inconnu";

        return {
            id: s.id,
            trickName,
            date: new Date(s.completed_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
            xp: s.xp_earned || 0
        };
    });

    return (
        <div className="page-container">
            <h1 className="page-title">{uiTexts.training.title}</h1>
            <p className="page-subtitle">Choisis un tour et lance ta session TSVP.</p>

            <TrainingClient
                tricks={tricks || []}
                recentSessions={formattedSessions}
            />
        </div>
    );
}
