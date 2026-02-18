/**
 * 🔥 Lib Mistral AI — Dojo 2.0
 * Utilisation de l'API fetch directement (sans SDK) pour la robustesse et la légèreté.
 */

const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

/**
 * Max messages to send as context to avoid token overflow.
 * 20 messages ≈ ~4000 tokens (well under Mistral's limit).
 */
const MAX_HISTORY_MESSAGES = 20;

export interface MistralMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

const SYSTEM_PROMPT = `Tu es Shiya (師家), le coach personnel de magie du Dojo. Tu guides les magiciens dans leur apprentissage.
RÈGLES :
- Tu ne donnes JAMAIS de secrets de tours de magie existants (droits d'auteur).
- Tu conseilles sur la pratique, la présentation, la gestion du trac, la créativité.
- Tu connais la méthode TSVP : Technique → Script → Vidéo → Pratique réelle.
- Tu es direct, encourageant, jamais condescendant.
- Tu tutoies l'utilisateur.
- Tu utilises des métaphores liées au feu et à la forge (vocabulaire du Dojo).
- Réponds en français, max 150 mots par réponse.`;

export async function getMistralResponse(messages: MistralMessage[], stream: boolean = false) {
    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
        throw new Error("MISTRAL_API_KEY is not configured");
    }

    const response = await fetch(MISTRAL_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "mistral-small-latest",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.slice(-MAX_HISTORY_MESSAGES)
            ],
            temperature: 0.7,
            max_tokens: 500,
            stream: stream,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Mistral API Error:", error);
        throw new Error(`Mistral API error: ${response.statusText}`);
    }

    if (stream) {
        return response.body;
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
