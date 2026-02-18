"use client";

import { useState, useCallback, useEffect } from "react";
import { ChatInterface } from "@/components/features/coach/chat-interface";
import { uiTexts } from "@/config/site-config";
import { toast } from "sonner";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function CoachPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [quotaRemaining, setQuotaRemaining] = useState(20);
    const [isLoading, setIsLoading] = useState(true);

    // Initial load
    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch("/dojo/api/ai/chat");
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data.messages.map((m: any) => ({
                        id: m.id,
                        role: m.role,
                        content: m.content
                    })));
                    setQuotaRemaining(data.remaining);
                }
            } catch (error) {
                console.error("Failed to load history:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchHistory();
    }, []);

    const handleSendMessage = useCallback(async (content: string) => {
        if (quotaRemaining <= 0) {
            toast.error("Ton quota quotidien est atteint. Reviens demain ! 🔥");
            return;
        }

        const userMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            role: "user",
            content,
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        try {
            const response = await fetch("/dojo/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to get AI response");
            }

            // Update remaining quota from header
            const remaining = response.headers.get("X-AI-Remaining");
            if (remaining !== null) {
                setQuotaRemaining(parseInt(remaining));
            }

            // Handle streaming
            const reader = response.body?.getReader();
            if (!reader) throw new Error("No reader available");

            const aiMsgId = `msg-${Date.now()}-ai`;
            const aiMsg: ChatMessage = {
                id: aiMsgId,
                role: "assistant",
                content: "",
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);

            const decoder = new TextDecoder();
            let accumulatedContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedContent += chunk;

                setMessages((prev) =>
                    prev.map(m => m.id === aiMsgId ? { ...m, content: accumulatedContent } : m)
                );
            }

        } catch (error: any) {
            console.error("Chat Error:", error);
            toast.error(error.message || "Shiya a eu un trou de mémoire...");
            setIsTyping(false);
        }
    }, [messages, quotaRemaining]);

    if (isLoading) {
        return <div className="h-screen flex items-center justify-center bg-black-base text-white">Prépare la forge... 🔥</div>;
    }

    return (
        <div className="h-[calc(100vh-var(--topbar-height)-var(--mobile-nav-height))] md:h-[calc(100vh-var(--topbar-height))]">
            <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isTyping={isTyping}
                quotaRemaining={quotaRemaining}
                quotaMax={20}
                className="h-full"
            />
        </div>
    );
}
