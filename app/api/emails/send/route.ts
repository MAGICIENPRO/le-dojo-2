import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendTransactionalEmail } from "@/lib/email/brevo";
import type { EmailTemplateId } from "@/lib/email/templates";

/**
 * POST /api/emails/send
 * Envoie un email transactionnel à l'utilisateur connecté.
 * Body: { templateId: string, params?: Record<string, string> }
 */
export async function POST(req: NextRequest) {
    const supabase = await createClient();

    // 1. Auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse body
    const body = await req.json().catch(() => null);
    if (!body?.templateId) {
        return NextResponse.json({ error: "templateId is required" }, { status: 400 });
    }

    const templateId = body.templateId as EmailTemplateId;

    // 3. Get user profile for username
    const { data: profile } = await supabase
        .from("profiles")
        .select("username, level, rank")
        .eq("id", user.id)
        .single();

    const username = profile?.username || "Magicien";

    // 4. Send
    const result = await sendTransactionalEmail({
        to: [{ email: user.email!, name: username }],
        templateId,
        params: {
            username,
            level: String(profile?.level || 1),
            rank: profile?.rank || "apprenti",
            ...body.params,
        },
    });

    if (result.success) {
        return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
        return NextResponse.json({ error: result.error }, { status: 500 });
    }
}
