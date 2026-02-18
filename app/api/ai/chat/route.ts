import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getMistralResponse } from "@/lib/ai/mistral";
import { getRemainingQuota, incrementQuota, saveMessage } from "@/lib/ai/quota";

export async function POST(req: NextRequest) {
    const supabase = await createClient();

    // 1. Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { messages, conversationId } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
        }

        // 2. Quota check
        const remaining = await getRemainingQuota(user.id);
        if (remaining <= 0) {
            return NextResponse.json(
                { error: "Quota journalier atteint. Reviens demain ! 🔥" },
                { status: 429, headers: { "X-AI-Remaining": "0" } }
            );
        }

        // 3. Save user message immediately
        const lastUserMessage = messages[messages.length - 1];
        await saveMessage(user.id, "user", lastUserMessage.content, conversationId);

        // 4. Get Mistral stream
        const mistralMessages = messages.map((m: any) => ({
            role: m.role,
            content: m.content
        }));

        const mistralStream = await getMistralResponse(mistralMessages, true);

        if (!mistralStream) {
            throw new Error("Failed to get stream from Mistral");
        }

        // 5. Transform SSE stream → plain text stream
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        let assistantContent = "";

        const transformStream = new TransformStream({
            async transform(chunk, controller) {
                const text = decoder.decode(chunk, { stream: true });
                const lines = text.split("\n");

                for (const line of lines) {
                    if (!line.trim() || line === "data: [DONE]") continue;

                    if (line.startsWith("data: ")) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            const content = data.choices?.[0]?.delta?.content || "";
                            if (content) {
                                assistantContent += content;
                                controller.enqueue(encoder.encode(content));
                            }
                        } catch {
                            // Ignore partial JSON chunks
                        }
                    }
                }
            },
            async flush() {
                // Save complete response when stream ends
                if (assistantContent.trim()) {
                    try {
                        await saveMessage(user.id, "assistant", assistantContent, conversationId);
                        await incrementQuota(user.id);
                    } catch (err) {
                        console.error("Critical: Failed to save AI response:", err);
                    }
                }
            }
        });

        // 6. Connect Mistral stream → TransformStream (THIS was the missing link)
        mistralStream.pipeTo(transformStream.writable).catch((err: unknown) => {
            console.error("Stream pipe error:", err);
        });

        const newRemaining = remaining - 1;

        return new Response(transformStream.readable, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-AI-Remaining": newRemaining.toString()
            },
        });

    } catch (error: any) {
        console.error("AI Chat Route Error:", error);
        return NextResponse.json(
            { error: "Le Coach Shiya est momentanément indisponible." },
            { status: 500 }
        );
    }
}

/**
 * Charger les messages existants
 */
export async function GET(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: messages, error } = await supabase
        .from("ai_chat_messages")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(50);

    const remaining = await getRemainingQuota(user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
        { messages, remaining },
        {
            headers: {
                "X-AI-Remaining": remaining.toString()
            }
        }
    );
}
