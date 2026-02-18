export type EmailTemplateId = "welcome" | "level-up" | "streak-reminder";

interface EmailTemplate {
    subject: string;
    html: string;
}

// === Styles partagés ===
const baseStyles = `
    body { margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
    .card { background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; }
    .logo { font-size: 28px; font-weight: 800; color: #FF6B2C; text-align: center; margin-bottom: 24px; letter-spacing: -1px; }
    h1 { color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 16px 0; }
    p { color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
    .highlight { color: #FF6B2C; font-weight: 600; }
    .btn { display: inline-block; background: linear-gradient(135deg, #FF6B2C, #FF8F5E); color: #000000; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 15px; }
    .footer { text-align: center; padding-top: 24px; color: rgba(255,255,255,0.3); font-size: 12px; }
`;

function wrapHtml(content: string): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${baseStyles}</style></head>
<body>
<div class="container">
<div class="card">
<div class="logo">🔥 Le Dojo 2.0</div>
${content}
</div>
<div class="footer">
    <p>Le Dojo 2.0 — Ta plateforme d'entraînement pour magiciens.</p>
    <p><a href="https://magicienpro.fr/dojo" style="color: #FF6B2C; text-decoration: none;">magicienpro.fr/dojo</a></p>
</div>
</div>
</body>
</html>`;
}

// === Templates ===

export const emailTemplates: Record<EmailTemplateId, EmailTemplate> = {
    "welcome": {
        subject: "Bienvenue au Dojo, {{username}} ! 🔥",
        html: wrapHtml(`
            <h1>Bienvenue, <span class="highlight">{{username}}</span> !</h1>
            <p>Tu as rejoint le Dojo 2.0. C'est ici que ta magie va passer au niveau supérieur.</p>
            <p>Ton premier objectif ? <strong>Lancer ta première session d'entraînement</strong> et débloquer ton premier badge.</p>
            <p style="text-align: center; margin-top: 24px;">
                <a href="https://magicienpro.fr/dojo/entrainement" class="btn">Commencer l'entraînement</a>
            </p>
            <p style="margin-top: 24px; font-size: 13px; color: rgba(255,255,255,0.4);">Si tu as des questions, Shiya (ton coach IA) est disponible 24h/24 dans l'onglet Coach.</p>
        `)
    },

    "level-up": {
        subject: "Level Up ! Tu es maintenant niveau {{level}} 🏆",
        html: wrapHtml(`
            <h1>Niveau <span class="highlight">{{level}}</span> débloqué !</h1>
            <p>Félicitations <strong>{{username}}</strong>, tu viens de passer au rang de <span class="highlight">{{rank}}</span>.</p>
            <p>Continue à t'entraîner pour débloquer de nouvelles compétences dans l'arbre et accéder à des récompenses exclusives.</p>
            <p style="text-align: center; margin-top: 24px;">
                <a href="https://magicienpro.fr/dojo/progression" class="btn">Voir ta progression</a>
            </p>
        `)
    },

    "streak-reminder": {
        subject: "Ta série de {{streak}} jours est en danger ! 🔥",
        html: wrapHtml(`
            <h1>Attention, ta streak est en danger !</h1>
            <p><strong>{{username}}</strong>, ta série de <span class="highlight">{{streak}} jours</span> consécutifs va se terminer si tu ne t'entraînes pas aujourd'hui.</p>
            <p>Même 5 minutes suffisent. Garde le rythme !</p>
            <p style="text-align: center; margin-top: 24px;">
                <a href="https://magicienpro.fr/dojo/entrainement" class="btn">Sauver ma série</a>
            </p>
        `)
    }
};
