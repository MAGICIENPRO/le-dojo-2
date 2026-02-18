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

        // 3. Save user message
        const lastUserMessage = messages[messages.length - 1];
        await saveMessage(user.id, "user", lastUserMessage.content, conversationId);

        // 4. Get Mistral response (Streaming)
        const mistralMessages = messages.map((m: any) => ({
            role: m.role,
            content: m.content
        }));

        const stream = await getMistralResponse(mistralMessages, true);

        if (!stream) {
            throw new Error("Failed to get stream from Mistral");
        }

        // 5. Create a transform stream to capture the full response for logging
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        let fullContent = "";

        const transformStream = new TransformStream({
            async transform(chunk, controller) {
                const text = decoder.decode(chunk);
                const lines = text.split("\n").filter(line => line.trim() !== "");

                for (const line of lines) {
                    if (line === "data: [DONE]") continue;
                    if (line.startsWith("data: ")) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            const content = data.choices[0]?.delta?.content || "";
                            fullContent += content;
                            controller.enqueue(encoder.encode(content));
                        } catch (e) {
                            console.error("Error parsing stream chunk:", e);
                        }
                    }
                }
            },
            async flush() {
                // 6. Save AI response and Increment quota at the end of the stream
                try {
                    await saveMessage(user.id, "assistant", fullContent, conversationId);
                    await incrementQuota(user.id);
                } catch (e) {
                    console.error("Error saving terminal message or incrementing quota:", e);
                }
            }
        });

        const newRemaining = remaining - 1;

        return new Response(transformStream.readable as any, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-AI-Remaining": newRemaining.toString()
            },
        });

    } catch (error: any) {
        console.error("AI Chat Route Error:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la communication avec le Coach." },
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
