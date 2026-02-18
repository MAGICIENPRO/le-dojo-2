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

    // Initial load and LocalStorage sync
    useEffect(() => {
        async function initChat() {
            try {
                // 1. Load from DB
                const res = await fetch("/dojo/api/ai/chat");
                let dbMessages: ChatMessage[] = [];
                if (res.ok) {
                    const data = await res.json();
                    dbMessages = data.messages.map((m: any) => ({
                        id: m.id,
                        role: m.role,
                        content: m.content
                    }));
                    setQuotaRemaining(data.remaining);
                }

                // 2. Merge with LocalStorage (detect unsaved)
                const local = localStorage.getItem("dojo_chat_cache");
                if (local) {
                    const localMsgs = JSON.parse(local);
                    // Simple merge: if local has more messages, keep them (user might have just sent something)
                    if (localMsgs.length > dbMessages.length) {
                        setMessages(localMsgs);
                    } else {
                        setMessages(dbMessages);
                    }
                } else {
                    setMessages(dbMessages);
                }

            } catch (error) {
                console.error("Failed to load chat:", error);
            } finally {
                setIsLoading(false);
            }
        }
        initChat();
    }, []);

    // Persist to local storage on setiap update
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("dojo_chat_cache", JSON.stringify(messages));
        }
    }, [messages]);

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
                    messages: [...messages, userMsg].slice(-10).map(m => ({ role: m.role, content: m.content }))
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to get AI response");
            }

            const remaining = response.headers.get("X-AI-Remaining");
            if (remaining !== null) {
                setQuotaRemaining(parseInt(remaining));
            }

            // Handle streaming
            const reader = response.body?.getReader();
            if (!reader) throw new Error("No reader available");

            const aiMsgId = `msg-${Date.now()}-ai`;
            setMessages((prev) => [...prev, { id: aiMsgId, role: "assistant", content: "" }]);
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
