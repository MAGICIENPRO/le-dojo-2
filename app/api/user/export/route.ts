import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const supabase = await createClient();

    // 1. Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const format = req.nextUrl.searchParams.get("format") || "json";

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

        const shortId = user.id.slice(0, 8);
        const timestamp = new Date().toISOString().split("T")[0];

        // === JSON ===
        if (format === "json") {
            return new NextResponse(JSON.stringify(exportData, null, 2), {
                headers: {
                    "Content-Type": "application/json",
                    "Content-Disposition": `attachment; filename="dojo-data-${shortId}-${timestamp}.json"`
                }
            });
        }

        // === CSV ===
        if (format === "csv") {
            const lines: string[] = [];

            // Profile section
            lines.push("=== PROFIL ===");
            lines.push("Champ,Valeur");
            const profile = exportData.profile as Record<string, any> | null;
            if (profile) {
                for (const [key, val] of Object.entries(profile)) {
                    lines.push(`"${key}","${String(val ?? "").replace(/"/g, '""')}"`);
                }
            }

            // Tricks section
            lines.push("", "=== TOURS DE MAGIE ===");
            lines.push("Nom,Catégorie,Difficulté,Maîtrisé,Date");
            for (const trick of exportData.tricks as any[]) {
                lines.push(`"${trick.name ?? ""}","${trick.category ?? ""}","${trick.difficulty ?? ""}","${trick.mastered ?? ""}","${trick.created_at ?? ""}"`);
            }

            // Achievements section
            lines.push("", "=== ACHIEVEMENTS ===");
            lines.push("Achievement,Date");
            for (const ach of exportData.achievements as any[]) {
                lines.push(`"${ach.achievement_id ?? ""}","${ach.earned_at ?? ""}"`);
            }

            // Chat history
            lines.push("", "=== HISTORIQUE COACH IA ===");
            lines.push("Rôle,Message,Date");
            for (const msg of exportData.ai_chat_history as any[]) {
                const content = String(msg.content ?? "").replace(/"/g, '""').replace(/\n/g, " ");
                lines.push(`"${msg.role ?? ""}","${content}","${msg.created_at ?? ""}"`);
            }

            const csv = lines.join("\n");
            return new NextResponse(csv, {
                headers: {
                    "Content-Type": "text/csv; charset=utf-8",
                    "Content-Disposition": `attachment; filename="dojo-data-${shortId}-${timestamp}.csv"`
                }
            });
        }

        // === PDF (HTML → PDF via browser print) ===
        if (format === "pdf") {
            const profile = exportData.profile as Record<string, any> | null;
            const tricks = exportData.tricks as any[];
            const achievements = exportData.achievements as any[];
            const chatHistory = exportData.ai_chat_history as any[];

            const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Mes données Dojo 2.0</title>
<style>
  body { font-family: Arial, sans-serif; color: #111; max-width: 800px; margin: 0 auto; padding: 32px; }
  h1 { color: #FF6B2C; border-bottom: 2px solid #FF6B2C; padding-bottom: 8px; }
  h2 { color: #333; margin-top: 32px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
  th { background: #FF6B2C; color: white; padding: 8px; text-align: left; }
  td { padding: 6px 8px; border-bottom: 1px solid #eee; }
  tr:nth-child(even) { background: #f9f9f9; }
  .meta { color: #666; font-size: 12px; margin-bottom: 24px; }
  .badge { display: inline-block; background: #FF6B2C20; color: #FF6B2C; padding: 2px 8px; border-radius: 12px; font-size: 11px; }
</style>
</head>
<body>
<h1>🔥 Mes données — Le Dojo 2.0</h1>
<p class="meta">Export du ${new Date().toLocaleDateString("fr-FR")} · ${user.email}</p>

<h2>👤 Profil</h2>
<table>
<tr><th>Champ</th><th>Valeur</th></tr>
${profile ? Object.entries(profile).map(([k, v]) => `<tr><td>${k}</td><td>${v ?? "-"}</td></tr>`).join("") : "<tr><td colspan='2'>Aucun profil</td></tr>"}
</table>

<h2>🎩 Tours de magie (${tricks.length})</h2>
<table>
<tr><th>Nom</th><th>Catégorie</th><th>Difficulté</th><th>Maîtrisé</th></tr>
${tricks.map(t => `<tr><td>${t.name ?? "-"}</td><td>${t.category ?? "-"}</td><td>${t.difficulty ?? "-"}</td><td>${t.mastered ? "✅" : "⏳"}</td></tr>`).join("") || "<tr><td colspan='4'>Aucun tour</td></tr>"}
</table>

<h2>🏆 Achievements (${achievements.length})</h2>
<table>
<tr><th>Achievement</th><th>Date</th></tr>
${achievements.map(a => `<tr><td>${a.achievement_id ?? "-"}</td><td>${a.earned_at ? new Date(a.earned_at).toLocaleDateString("fr-FR") : "-"}</td></tr>`).join("") || "<tr><td colspan='2'>Aucun achievement</td></tr>"}
</table>

<h2>🤖 Historique Coach IA (${chatHistory.length} messages)</h2>
<table>
<tr><th>Rôle</th><th>Message</th><th>Date</th></tr>
${chatHistory.slice(-20).map(m => `<tr><td><span class="badge">${m.role}</span></td><td>${String(m.content ?? "").slice(0, 200)}</td><td>${m.created_at ? new Date(m.created_at).toLocaleDateString("fr-FR") : "-"}</td></tr>`).join("") || "<tr><td colspan='3'>Aucun message</td></tr>"}
</table>

<script>window.onload = () => window.print();</script>
</body>
</html>`;

            return new NextResponse(html, {
                headers: {
                    "Content-Type": "text/html; charset=utf-8",
                    "Content-Disposition": `inline; filename="dojo-data-${shortId}-${timestamp}.html"`
                }
            });
        }

        return NextResponse.json({ error: "Format non supporté" }, { status: 400 });

    } catch (error: any) {
        console.error("Export Error:", error);
        return NextResponse.json({ error: "Échec de l'exportation des données." }, { status: 500 });
    }
}
