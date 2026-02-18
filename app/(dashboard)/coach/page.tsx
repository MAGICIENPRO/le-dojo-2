"use client";

import { useState, useCallback } from "react";
import { ChatInterface } from "@/components/features/coach/chat-interface";
import { uiTexts, mockData } from "@/config/site-config";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export default function CoachPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([...mockData.chatMessages] as ChatMessage[]);
    const [isTyping, setIsTyping] = useState(false);
    const [quotaRemaining, setQuotaRemaining] = useState(20);

    const handleSendMessage = useCallback((content: string) => {
        // Add user message
        const userMsg = {
            id: `msg-${Date.now()}`,
            role: "user" as const,
            content,
        };
        setMessages((prev) => [...prev, userMsg]);
        setQuotaRemaining((prev) => Math.max(0, prev - 1));
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = {
                id: `msg-${Date.now()}-ai`,
                role: "assistant" as const,
                content: getAIResponse(content),
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000);
    }, []);

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

// Mock AI responses
function getAIResponse(question: string): string {
    const responses = [
        "Excellente question ! 🔥\n\nVoici mon analyse :\n\n1. **Commence par le Thunder Silence** — Après chaque phase clé, laisse 2-3 secondes de silence total. C'est dans ce silence que la magie opère dans l'esprit du spectateur.\n\n2. **Travaille ta Courbe Cardiaque** — Structure ton effet en crescendo. Commence doucement, puis accélère l'intensité.\n\n3. **L'Empreinte** — Termine toujours par quelque chose que le spectateur garde (physiquement ou mentalement).\n\nTu veux qu'on creuse un de ces points ?",
        "Je vois ce que tu veux dire ! 💡\n\nLe problème vient souvent du **rythme**. Voici un exercice :\n\n1. Filme-toi en train de performer le tour\n2. Regarde la vidéo **sans le son** — focus sur tes gestes\n3. Écoute la vidéo **sans l'image** — focus sur ton texte\n4. Les deux doivent fonctionner indépendamment\n\nSi un des deux ne tient pas tout seul, c'est là qu'il faut travailler. 🎯",
        "Bonne réflexion ! 🧠\n\nPour gérer un spectateur difficile, rappelle-toi la règle d'or :\n\n**\"Celui qui contrôle le cadre contrôle la magie.\"**\n\n→ Ne combat jamais frontalement\n→ Utilise l'humour pour désamorcer\n→ Transforme la résistance en complicité\n→ En dernier recours, implique physiquement la personne (elle devient ton assistante)\n\nC'est du judo verbal : utilise la force de l'autre pour servir ta magie. ✨",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}
