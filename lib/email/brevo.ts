import { emailTemplates, type EmailTemplateId } from "./templates";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface SendEmailParams {
    to: { email: string; name?: string }[];
    templateId: EmailTemplateId;
    params?: Record<string, string | number>;
}

/**
 * Envoie un email transactionnel via l'API Brevo.
 * Utilise les templates HTML locaux (pas les templates Brevo).
 */
export async function sendTransactionalEmail({ to, templateId, params = {} }: SendEmailParams) {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
        console.warn("[Brevo] Clé API manquante. Email non envoyé.");
        return { success: false, error: "BREVO_API_KEY not configured" };
    }

    const template = emailTemplates[templateId];
    if (!template) {
        return { success: false, error: `Template "${templateId}" not found` };
    }

    // Replace placeholders in subject and HTML
    let subject = template.subject;
    let htmlContent = template.html;

    for (const [key, value] of Object.entries(params)) {
        const placeholder = `{{${key}}}`;
        subject = subject.replace(new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"), String(value));
        htmlContent = htmlContent.replace(new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"), String(value));
    }

    try {
        const res = await fetch(BREVO_API_URL, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                sender: { name: "Le Dojo 2.0", email: "dojo@magicienpro.fr" },
                to,
                subject,
                htmlContent,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error("[Brevo] Erreur API:", res.status, errorData);
            return { success: false, error: errorData.message || `HTTP ${res.status}` };
        }

        const data = await res.json();
        console.log(`[Brevo] Email "${templateId}" envoyé à ${to[0].email}`);
        return { success: true, messageId: data.messageId };

    } catch (error: any) {
        console.error("[Brevo] Erreur réseau:", error.message);
        return { success: false, error: error.message };
    }
}

/** Raccourci : envoyer un email de bienvenue */
export async function sendWelcomeEmail(email: string, username: string) {
    return sendTransactionalEmail({
        to: [{ email, name: username }],
        templateId: "welcome",
        params: { username },
    });
}

/** Raccourci : envoyer un email de Level Up */
export async function sendLevelUpEmail(email: string, username: string, level: number, rankLabel: string) {
    return sendTransactionalEmail({
        to: [{ email, name: username }],
        templateId: "level-up",
        params: { username, level: String(level), rank: rankLabel },
    });
}

/** Raccourci : envoyer un rappel de streak */
export async function sendStreakReminderEmail(email: string, username: string, streakDays: number) {
    return sendTransactionalEmail({
        to: [{ email, name: username }],
        templateId: "streak-reminder",
        params: { username, streak: String(streakDays) },
    });
}
