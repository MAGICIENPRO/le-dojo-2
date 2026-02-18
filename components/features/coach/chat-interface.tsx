"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { aiCoachConfig } from "@/config/site-config";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface ChatInterfaceProps {
    messages: ChatMessage[];
    suggestedPrompts?: readonly string[];
    onSendMessage?: (message: string) => void;
    isTyping?: boolean;
    quotaRemaining?: number;
    quotaMax?: number;
    className?: string;
}

// Chat bubble
function ChatBubble({ message }: { message: ChatMessage }) {
    const isUser = message.role === "user";

    return (
        <div
            className={cn(
                "flex gap-2.5 max-w-[85%]",
                isUser ? "ml-auto flex-row-reverse" : ""
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs",
                    isUser
                        ? "bg-fire-orange/20 text-fire-orange"
                        : "bg-white/10 text-white-muted"
                )}
            >
                {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </div>

            {/* Bubble */}
            <div
                className={cn(
                    "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    isUser
                        ? "bg-fire-orange/15 text-white rounded-tr-sm"
                        : "bg-black-card border border-black-border text-white-muted rounded-tl-sm"
                )}
            >
                {/* Render markdown-like bold */}
                {message.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                            j % 2 === 1 ? (
                                <strong key={j} className="text-white font-semibold">{part}</strong>
                            ) : (
                                part
                            )
                        )}
                    </p>
                ))}
            </div>
        </div>
    );
}

// Typing indicator
function TypingIndicator() {
    return (
        <div className="flex gap-2.5">
            <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-white/10">
                <Bot className="h-3.5 w-3.5 text-white-muted" />
            </div>
            <div className="bg-black-card border border-black-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white-dim animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white-dim animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white-dim animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
        </div>
    );
}

import { QuotaIndicator } from "./quota-indicator";

export function ChatInterface({
    messages,
    suggestedPrompts = aiCoachConfig.suggestedPrompts,
    onSendMessage,
    isTyping = false,
    quotaRemaining = 20,
    quotaMax = 20,
    className,
}: ChatInterfaceProps) {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim() || quotaRemaining <= 0) return;
        onSendMessage?.(input.trim());
        setInput("");
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={cn("flex flex-col h-full bg-black-base overflow-hidden", className)}>
            {/* New Quota Indicator at the top */}
            <QuotaIndicator remaining={quotaRemaining} max={quotaMax} />

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-fire-orange/10 flex items-center justify-center mb-4">
                            <Sparkles className="h-8 w-8 text-fire-orange" />
                        </div>
                        <h3 className="font-heading text-lg text-white uppercase tracking-wider mb-1">
                            Le Coach
                        </h3>
                        <p className="text-sm text-white-muted max-w-xs">
                            Pose-moi une question sur ta magie. Je suis là pour t&apos;aider à progresser.
                        </p>

                        {/* Suggested prompts */}
                        <div className="mt-6 space-y-2 w-full max-w-sm">
                            {suggestedPrompts.slice(0, 3).map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => quotaRemaining > 0 && onSendMessage?.(prompt)}
                                    disabled={quotaRemaining <= 0}
                                    className="w-full text-left text-xs text-white-muted p-3 rounded-card border border-black-border hover:border-fire-orange/30 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    💡 {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                ))}

                {isTyping && <TypingIndicator />}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-4 py-3 border-t border-black-border bg-black-card/30 backdrop-blur-md">
                <div className="flex items-end gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            // Auto-resize
                            e.target.style.height = "auto";
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            quotaRemaining > 0
                                ? "Pose ta question au Coach..."
                                : "Quota atteint. Reviens demain ! 🔥"
                        }
                        disabled={quotaRemaining <= 0}
                        className={cn(
                            "flex-1 bg-black-card border border-black-border rounded-card",
                            "text-sm text-white placeholder:text-white-dim",
                            "px-3 py-2.5 resize-none",
                            "focus:outline-none focus:ring-1 focus:ring-fire-orange/50 focus:border-fire-orange/50",
                            "disabled:opacity-50 disabled:bg-black-base/50",
                            "max-h-[120px]"
                        )}
                        rows={1}
                    />
                    <Button
                        variant="primary"
                        size="icon"
                        onClick={handleSend}
                        disabled={!input.trim() || quotaRemaining <= 0}
                        aria-label="Envoyer"
                        className={cn(quotaRemaining <= 0 && "opacity-50")}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
