// ============================================================
// 🔥 LE DOJO 2.0 — TEXTES UX (COPY)
// ============================================================
// Source de vérité pour TOUS les textes de l'application.
// Pour modifier un texte, un label ou un message : c'est ici.
// Les composants importent depuis ce fichier via config/index.ts.
// ============================================================

// ----------------------------------------------------------
// 🏠 1. LANDING PAGE
// ----------------------------------------------------------
export const landingPageCopy = {
    // Headline principal (H1) — 10 mots, bénéfice immédiat
    headline: "ORGANISE TES TOURS. ENTRAÎNE-TOI. DEVIENS REDOUTABLE.",

    // Sous-titre — 25 mots, développe la promesse
    subtitle:
        "Le Dojo est l'espace d'entraînement gratuit des magiciens qui veulent transformer leur pile de tours en un répertoire affûté. Méthode TSVP intégrée.",

    // 3 blocs bénéfices
    benefits: [
        {
            icon: "BookOpen",
            title: "Fini le chaos",
            description:
                "Classe tous tes tours, note leur stade de progression, retrouve-les en un clic. Ta bibliothèque, enfin organisée.",
        },
        {
            icon: "Flame",
            title: "Entraînement structuré",
            description:
                "La méthode TSVP de Sébastien Pieta en 4 étapes. Technique, Script, Vidéo, Pratique réelle. Un système qui marche.",
        },
        {
            icon: "TrendingUp",
            title: "Progression visible",
            description:
                "Gagne de l'XP, maintiens ta flamme, débloque des compétences. Chaque session te rapproche du rang supérieur.",
        },
    ],

    // CTA principal
    ctaPrimary: "Entrer dans le Dojo",

    // CTA secondaire (variante)
    ctaSecondary: "C'est gratuit — pour toujours",

    // Preuve sociale
    socialProof:
        "+{count} magiciens s'entraînent déjà au Dojo. Rejoins-les.",

    // CTA footer
    ctaFooter: "Commence ton entraînement",

    // Section « Comment ça marche »
    howItWorks: {
        title: "COMMENT ÇA MARCHE",
        steps: [
            {
                step: "1",
                title: "Ajoute tes tours",
                description: "Importe ta collection en quelques clics. Catégorie, difficulté, tags de situation.",
            },
            {
                step: "2",
                title: "Entraîne-toi avec la méthode TSVP",
                description: "4 étapes. 15 minutes par session. Des résultats que tu sens dès la première semaine.",
            },
            {
                step: "3",
                title: "Regarde-toi progresser",
                description: "XP, niveaux, flamme d'entraînement. Ta progression est concrète et addictive.",
            },
        ],
    },

    // Section « À propos de Sébastien »
    mentorSection: {
        title: "CRÉÉ PAR UN MAGICIEN DE TERRAIN",
        description:
            "Sébastien Pieta est magicien professionnel depuis plus de 10 ans. +500 spectacles, +10 000 spectateurs, +1 000 heures de terrain. Le Dojo est né de SA méthode d'entraînement — celle qu'il utilise encore aujourd'hui.",
        cta: "En savoir plus sur Sébastien",
    },
} as const;


// ----------------------------------------------------------
// 🎓 2. ONBOARDING (3 ÉTAPES)
// ----------------------------------------------------------
export const onboardingCopy = {
    welcome: {
        title: "BIENVENUE AU DOJO",
        subtitle:
            "Ici, on ne regarde pas des tutos en boucle. On s'entraîne. On progresse. On transforme un hobby en art.",
        cta: "C'est parti 🔥",
    },

    steps: [
        {
            id: "step_library",
            title: "TA BIBLIOTHÈQUE DE TOURS",
            description:
                "Ajoute tes tours, classe-les par catégorie, note leur stade. Fini le chaos — bienvenue dans l'organisation.",
            icon: "BookOpen",
            cta: "Compris",
        },
        {
            id: "step_tsvp",
            title: "LA MÉTHODE TSVP",
            description:
                "Un système d'entraînement en 4 étapes créé par Sébastien Pieta. Technique, Script, Vidéo, Pratique. C'est comme ça qu'on transforme un tour en miracle.",
            icon: "Flame",
            cta: "Ça me parle",
        },
        {
            id: "step_gamification",
            title: "TA PROGRESSION",
            description:
                "Gagne de l'XP, maintiens ta flamme, monte de rang. D'Apprenti à Grand Maître — chaque session compte.",
            icon: "TrendingUp",
            cta: "Je suis prêt",
        },
    ],

    // Écran de finalisation
    completion: {
        title: "LE DOJO T'ATTEND",
        subtitle: "Tu es officiellement un Apprenti. Premier réflexe ? Ajoute ton premier tour.",
        cta: "Ajouter mon premier tour",
    },
} as const;


// ----------------------------------------------------------
// 🧭 3. NAVIGATION & MICROCOPY
// ----------------------------------------------------------
export const navigationCopy = {
    // Labels sidebar (desktop)
    sidebar: [
        {
            label: "Bibliothèque",
            href: "/bibliotheque",
            icon: "BookOpen",
            tooltip: "Ta collection de tours de magie",
        },
        {
            label: "Entraînement",
            href: "/entrainement",
            icon: "Flame",
            tooltip: "Sessions TSVP guidées",
        },
        {
            label: "Progression",
            href: "/progression",
            icon: "TrendingUp",
            tooltip: "XP, niveaux, succès et flamme",
        },
        {
            label: "Coach",
            href: "/coach",
            icon: "Bot",
            tooltip: "Ton assistant entraîné par Sébastien",
        },
        {
            label: "Profil",
            href: "/profil",
            icon: "User",
            tooltip: "Tes stats et réglages",
        },
    ],

    // Labels mobile (abrégés)
    mobileNav: [
        { label: "Biblio", href: "/bibliotheque", icon: "BookOpen" },
        { label: "Train", href: "/entrainement", icon: "Flame" },
        { label: "XP", href: "/progression", icon: "TrendingUp" },
        { label: "Coach", href: "/coach", icon: "Bot" },
        { label: "Profil", href: "/profil", icon: "User" },
    ],
} as const;


// ----------------------------------------------------------
// 📚 4. BIBLIOTHÈQUE DE TOURS
// ----------------------------------------------------------
export const libraryCopy = {
    // Page
    pageTitle: "TA BIBLIOTHÈQUE",
    pageDescription: "Tous tes tours, organisés, classés, prêts à travailler.",

    // Recherche
    searchPlaceholder: "Chercher un tour par nom, catégorie ou tag...",

    // Labels Kanban — 3 colonnes créatives
    kanbanColumns: {
        study: {
            label: "En exploration",
            emoji: "🔍",
            description: "Les tours que tu découvres et apprends.",
        },
        rehearsal: {
            label: "En forge",
            emoji: "⚒️",
            description: "Les tours que tu travailles activement.",
        },
        ready: {
            label: "Prêt au combat",
            emoji: "⚔️",
            description: "Les tours que tu peux sortir les yeux fermés.",
        },
    },

    // Labels catégories (alignés avec trickCategories dans site-config.ts)
    categories: {
        cards: "Cartes",
        coins: "Pièces",
        mentalism: "Mentalisme",
        objects: "Objets",
        ropes: "Cordes",
        bills: "Billets",
        close_up: "Close-up",
        stage: "Scène",
        impromptu: "Impromptu",
        other: "Autre",
    },

    // Tags de situations (alignés avec defaultSituationTags)
    situationTags: {
        debout: "Debout",
        assis: "Assis",
        entoure: "Entouré",
        sans_preparation: "Sans préparation",
        avec_preparation: "Avec préparation",
        angle_proof: "Angle-proof",
        bar_soiree: "Bar / Soirée",
        table_a_table: "Table à table",
        closeup_pose: "Close-up posé",
        scene: "Scène",
    },

    // État vide (0 tours)
    emptyState: {
        title: "Ta bibliothèque est vide",
        description:
            "Chaque Maître a commencé avec un seul tour. Ajoute le tien et commence à construire ton répertoire.",
        cta: "Ajouter mon premier tour",
        icon: "sparkles",
    },

    // CTA d'ajout
    addTrickCta: "+ Ajouter un tour",

    // Formulaire d'ajout de tour
    addTrickForm: {
        title: "NOUVEAU TOUR",
        fields: {
            name: { label: "Nom du tour", placeholder: "Ex : Ambitieuse, Triumph..." },
            category: { label: "Catégorie", placeholder: "Choisis une catégorie" },
            difficulty: {
                label: "Difficulté",
                options: [
                    { value: "easy", label: "Accessible" },
                    { value: "medium", label: "Intermédiaire" },
                    { value: "hard", label: "Avancé" },
                    { value: "expert", label: "Expert" },
                ],
            },
            source: { label: "Source (optionnel)", placeholder: "Livre, DVD, tuto, créateur..." },
            description: { label: "Notes personnelles (optionnel)", placeholder: "Tes remarques, tes idées de présentation..." },
            situations: { label: "Situations de jeu", placeholder: "Ex : Bar, Debout, Sans préparation..." },
            stage: { label: "Stade de progression", placeholder: "Où en es-tu avec ce tour ?" },
        },
        ctaSubmit: "Ajouter ce tour",
        ctaCancel: "Annuler",
    },

    // Vue matrice
    matrixTitle: "Vue Matrice",
    kanbanTitle: "Vue Kanban",

    // Actions sur une carte
    trickActions: {
        edit: "Modifier",
        delete: "Supprimer",
        moveToStudy: "Passer en exploration",
        moveToRehearsal: "Passer en forge",
        moveToReady: "Passer en prêt au combat",
        train: "Entraîner ce tour",
    },
} as const;


// ----------------------------------------------------------
// 🔥 5. ENTRAÎNEMENT (MÉTHODE TSVP)
// ----------------------------------------------------------
export const trainingCopy = {
    pageTitle: "ENTRAÎNEMENT",
    pageDescription: "La méthode TSVP : 4 étapes pour transformer n'importe quel tour en miracle.",

    // Sélection du tour
    selectTrick: {
        title: "Choisis ton tour",
        description: "Quel tour tu veux travailler aujourd'hui ?",
        emptyState: "Ajoute d'abord un tour dans ta bibliothèque pour commencer à t'entraîner.",
        ctaAddTrick: "Ajouter un tour",
    },

    // Labels des 4 étapes TSVP
    tsvpSteps: {
        technique: {
            label: "Technique",
            letter: "T",
            shortDescription: "Les gestes, les angles, la mécanique.",
            fullDescription:
                "Décompose le tour geste par geste. Travaille devant un miroir, vérifie tes angles, teste sous différentes lumières. La technique doit devenir invisible.",
            tips: [
                "Travaille devant un miroir",
                "Vérifie tes angles en te filmant",
                "Teste sous différentes lumières",
            ],
        },
        script: {
            label: "Script",
            letter: "S",
            shortDescription: "Le texte, les justifications, le naturel.",
            fullDescription:
                "Écris ton texte mot à mot. Teste les justifications à voix haute. Élimine la radio-description — tes mots doivent GUIDER, pas DÉCRIRE.",
            tips: [
                "Écris ton texte mot à mot",
                "Teste les justifications à voix haute",
                "Élimine la radio-description",
            ],
        },
        video: {
            label: "Vidéo",
            letter: "V",
            shortDescription: "Filme-toi. Analyse. Recommence.",
            fullDescription:
                "Filme-toi et regarde la vidéo 3 fois : sans le son (pour les gestes), sans l'image (pour le texte), puis en entier. Règle des 5 vidéos parfaites.",
            tips: [
                "Règle des 5 vidéos parfaites",
                "Regarde sans le son (gestes)",
                "Écoute sans l'image (texte)",
            ],
        },
        practice: {
            label: "Pratique",
            letter: "P",
            shortDescription: "Complice → Amis → Inconnus.",
            fullDescription:
                "Présente ton tour en 3 paliers : d'abord un complice bienveillant, ensuite tes amis proches, enfin des inconnus. C'est là que la vraie magie se teste.",
            tips: [
                "Commence avec un complice bienveillant",
                "Passe aux amis proches",
                "Termine avec des inconnus (le vrai test)",
            ],
        },
    },

    // Messages de session
    sessionStart: {
        title: "SESSION LANCÉE",
        subtitle: "C'est parti. Concentre-toi, donne tout. 🔥",
    },

    sessionEnd: {
        title: "SESSION TERMINÉE",
        subtitle: "Du beau boulot. Chaque minute investie te rapproche de la maîtrise.",
        xpEarned: "+{xp} XP gagnés",
        ctaContinue: "Continuer l'entraînement",
        ctaDashboard: "Voir ma progression",
    },

    // Timer
    timer: {
        running: "En cours...",
        paused: "En pause",
        completed: "Terminé ✓",
        ctaStart: "Lancer le timer",
        ctaPause: "Pause",
        ctaResume: "Reprendre",
        ctaStop: "Terminer la session",
    },

    // Jauge de confiance (post-performance)
    confidenceRating: {
        title: "COMMENT TU TE SENS ?",
        description: "Note ta confiance après cette présentation. Sois honnête — c'est pour toi.",
        labels: {
            1: "J'ai tremblé",
            2: "Pas terrible",
            3: "Passable",
            4: "Correct",
            5: "Pas mal",
            6: "Plutôt bien",
            7: "Confiant",
            8: "Solide",
            9: "Au top",
            10: "J'étais dans ma zone",
        },
        ctaSubmit: "Enregistrer",
        xpReward: "+15 XP pour ton feedback",
    },
} as const;


// ----------------------------------------------------------
// 🏆 6. GAMIFICATION
// ----------------------------------------------------------
export const gamificationCopy = {
    pageTitle: "TA PROGRESSION",
    pageDescription: "XP, flamme, niveaux, succès. Tout ce qui prouve que tu avances.",

    // Montée de niveau
    levelUp: {
        title: "LEVEL UP !",
        subtitle: "Tu viens de passer au niveau {level}. Continue comme ça. 🔥",
        cta: "Continuer",
    },

    // Passage de rang — messages personnalisés
    rankUp: {
        apprenti: {
            title: "APPRENTI",
            subtitle: "Tu fais tes premiers pas dans l'art. Le Dojo t'ouvre ses portes.",
            quote: null,
        },
        initie: {
            title: "TU ES MAINTENANT INITIÉ",
            subtitle: "Le Dojo reconnaît ta détermination. Tu n'es plus un simple curieux.",
            quote: "Tu ne fais plus de tours. Tu commences à créer des moments.",
        },
        maitre: {
            title: "TU ES MAINTENANT MAÎTRE",
            subtitle: "Tes tours font mouche. Le public ne s'en remet pas. Le feu brûle en toi.",
            quote: "La technique est devenue invisible. C'est là que la vraie magie commence.",
        },
        grand_maitre: {
            title: "TU ES GRAND MAÎTRE",
            subtitle: "Tu as atteint le sommet. La magie coule dans tes veines. Tu es le feu.",
            quote: "Tu as compris le secret : ce n'est pas le tour qui fait le magicien. C'est le magicien qui fait le tour.",
        },
    },

    // Streak — messages par palier
    streakMessages: {
        alive: "🔥 Ta flamme brûle depuis {days} jours !",
        dead: "Ta flamme s'est éteinte. Ce n'est pas grave — chaque Maître a rechuté. Rallume-la aujourd'hui.",
        warning: "🔥 Ta flamme vacille ! Plus que {daysLeft} jours avant qu'elle ne s'éteigne. Entraîne-toi maintenant.",
        milestones: {
            1: "🕯️ Premier jour ! L'étincelle est allumée. Reviens demain pour l'attiser.",
            3: "🕯️ 3 jours ! Ton étincelle devient une flamme. Continue.",
            7: "🔥 7 jours ! Une semaine de feu. Tu as la discipline d'un Initié.",
            14: "🌋 14 jours ! Tu es un brasier. Rien ne peut t'arrêter.",
            30: "☄️ 30 jours ! Un mois d'entraînement. Tu fais partie de l'élite.",
            60: "☄️ 60 jours ! Deux mois sans faillir. Tu es un Phénix.",
            100: "💎 100 jours ! Ta flamme est éternelle. Légende vivante du Dojo.",
        },
    },

    // Roue de la Magie
    wheel: {
        title: "LA ROUE DE LA MAGIE",
        description: "Tu as gagné un spin ! Tente ta chance.",
        ctaSpin: "Tourner la roue",
        ctaDisabled: "Encore {remaining} sessions pour débloquer",
        spinsAvailable: "{count} spin(s) disponible(s)",

        // Messages post-spin
        rewards: {
            xp_100: {
                title: "+100 XP !",
                description: "Un bonus de 100 XP tombe dans ton escarcelle. Bien joué !",
            },
            xp_250: {
                title: "+250 XP !",
                description: "Joli tirage ! 250 XP de bonus. Ta progression accélère.",
            },
            xp_500: {
                title: "🎰 JACKPOT ! +500 XP !",
                description: "500 XP d'un coup ! C'est ta soirée. 🔥",
            },
            shield: {
                title: "🛡️ BOUCLIER DE STREAK",
                description: "Protection activée. Si tu rates une semaine, ta flamme est sauvée — une fois.",
            },
            tip: {
                title: "📜 CONSEIL DU SENSEI",
                description: "Un conseil exclusif de Sébastien. Garde-le précieusement.",
            },
            badge: {
                title: "⭐ BADGE EXCLUSIF",
                description: "Un badge rare que seule la Roue peut donner. Collectionneur, félicitations.",
            },
        },
    },

    // Répétition espacée (alertes de tours non pratiqués)
    spacedRepetition: {
        warning: {
            level: "Attention",
            message: "Tu n'as pas travaillé « {trickName} » depuis {days} jours. Un rafraîchissement rapide ?",
        },
        alert: {
            level: "Alerte",
            message: "Ça fait {days} jours sans toucher à « {trickName} ». Ta mémoire musculaire s'érode.",
        },
        critical: {
            level: "Critique",
            message: "« {trickName} » est en danger. {days} jours sans pratique. Entraîne-toi avant d'oublier.",
        },
    },

    // Achievements / Succès
    achievementUnlocked: {
        title: "SUCCÈS DÉBLOQUÉ !",
        subtitle: "Tu viens de décrocher « {achievementName} ».",
        cta: "Voir mes succès",
    },

    // Labels de la page Progression
    progressionLabels: {
        currentRank: "Rang actuel",
        currentLevel: "Niveau",
        totalXp: "XP totale",
        nextLevel: "Prochain niveau dans",
        xpToNext: "{xp} XP",
        streakCurrent: "Flamme actuelle",
        streakRecord: "Record",
        trainingSessions: "Sessions",
        tricksReady: "Tours prêts",
        achievements: "Succès",
        skillTree: "Compétences",
    },
} as const;


// ----------------------------------------------------------
// 🤖 7. COACH IA
// ----------------------------------------------------------
export const coachCopy = {
    pageTitle: "LE COACH",
    pageDescription: "Ton assistant IA, entraîné sur les méthodes de Sébastien Pieta.",

    // Nom du coach — 3 propositions (la première est recommandée)
    coachNameOptions: [
        { name: "Le Coach", rationale: "Simple, direct, universel. Cohérent avec le vocabulaire Dojo." },
        { name: "Le Sensei", rationale: "Plus immersif dans l'univers Dojo/arts martiaux. Lien avec le mentor." },
        { name: "L'Oracle", rationale: "Mystique, lié à la magie. Suggère la connaissance cachée." },
    ],

    // Message de bienvenue
    welcomeMessage:
        "Salut ! Je suis Le Coach — ton assistant entraîné sur les méthodes de Sébastien. Pose-moi une question sur tes tours, ton entraînement, ta présentation… Je suis là pour t'aider à progresser. 🔥",

    // Input
    inputPlaceholder: "Pose ta question au Coach...",

    // Quota
    quota: {
        remaining_3: "3 messages disponibles aujourd'hui",
        remaining_2: "2 messages restants aujourd'hui",
        remaining_1: "⚠️ Dernier message de la journée",
        remaining_0: "Tu as utilisé tes 3 messages gratuits",
        exhaustedMessage:
            "Tes 3 messages quotidiens sont épuisés. Reviens demain pour de nouveaux échanges avec Le Coach ! En attendant, entraîne-toi — c'est le meilleur conseil que je puisse te donner. 💪",
        exhaustedCta: "Reviens demain",
    },

    // Suggestions de questions (affichées par défaut)
    defaultSuggestions: [
        "Analyse ma routine et dis-moi ce que je peux améliorer",
        "Trouve-moi un boniment original pour un forçage classique",
        "Comment gérer un spectateur qui veut me griller ?",
        "Propose-moi un exercice pour travailler le Thunder Silence",
        "Aide-moi à construire un set de 3 tours pour un cocktail",
    ],

    // Message hors-sujet
    offTopicResponse:
        "Hé, je suis ton Coach en magie, pas un assistant général ! 😄 Si tu as une question sur tes tours, ta routine ou ton entraînement, je suis là. Sinon, reviens me voir quand tu veux bosser ta magie !",

    // Loading
    thinkingMessage: "Le Coach réfléchit...",

    // Erreur
    errorMessage:
        "Oups, Le Coach a eu un bug. Réessaie dans quelques secondes — si ça persiste, ton message ne sera pas compté.",
} as const;


// ----------------------------------------------------------
// 👤 8. PROFIL & EXPORT
// ----------------------------------------------------------
export const profileCopy = {
    pageTitle: "MON PROFIL",

    // Stats affichées
    statsLabels: {
        totalTricks: "Tours en bibliothèque",
        tricksReady: "Tours prêts au combat",
        totalSessions: "Sessions d'entraînement",
        totalHours: "Heures d'entraînement",
        currentStreak: "Flamme actuelle",
        longestStreak: "Plus longue flamme",
        totalXp: "XP totale",
        currentLevel: "Niveau",
        currentRank: "Rang",
        achievementsUnlocked: "Succès débloqués",
    },

    // Export RGPD
    exportSection: {
        title: "Tes données t'appartiennent",
        description:
            "Télécharge l'intégralité de tes données (tours, sessions, stats, progression) au format JSON. C'est ton droit, et on le respecte.",
        ctaExport: "Exporter mes données",
        exportProcessing: "Préparation de l'export...",
        exportComplete: "Export téléchargé avec succès",
        exportError: "Erreur lors de l'export. Réessaie.",
    },

    // Paramètres
    settings: {
        title: "RÉGLAGES",
        displayName: { label: "Pseudo", placeholder: "Ton pseudo au Dojo" },
        email: { label: "Email", placeholder: "ton@email.com" },
        ctaSave: "Enregistrer",
        ctaLogout: "Se déconnecter",
        logoutConfirm: "Tu es sûr de vouloir quitter le Dojo ? Ta progression est sauvegardée.",
    },

    // Suppression de compte
    deleteAccount: {
        ctaDelete: "Supprimer mon compte",
        warning: "Cette action est irréversible. Toutes tes données seront supprimées définitivement.",
        confirmTitle: "SUPPRIMER TON COMPTE",
        confirmDescription: "Tape « SUPPRIMER » pour confirmer la suppression définitive de ton compte et de toutes tes données.",
        confirmPlaceholder: "Tape SUPPRIMER",
        confirmCta: "Confirmer la suppression",
    },
} as const;


// ----------------------------------------------------------
// ✉️ 9. EMAILS TRANSACTIONNELS (Magic Link / OTP)
// ----------------------------------------------------------
export const emailsCopy = {
    // Email de connexion (Magic Link / OTP)
    magicLink: {
        subject: "🔥 Ton code d'accès au Dojo",
        body: `Salut !

Voici ton code pour entrer dans Le Dojo :

{OTP_CODE}

Ce code expire dans 10 minutes. Si tu n'as pas demandé de connexion, ignore cet email.

À tout de suite au Dojo.
— Sébastien`,

        ctaButton: "Entrer dans le Dojo",
        footer: "Cet email a été envoyé par Le Dojo 2.0 — magicienpro.fr",
    },

    // Email de bienvenue (après première inscription)
    welcome: {
        subject: "🔥 Bienvenue au Dojo, {name} !",
        body: `Salut {name} !

Tu viens d'entrer au Dojo. Bienvenue dans l'espace d'entraînement des magiciens qui veulent progresser pour de vrai.

Ton premier réflexe ? Ajoute un tour dans ta bibliothèque et lance ta première session TSVP. 15 minutes suffisent pour sentir la différence.

On se retrouve à l'intérieur. 🔥

— Sébastien`,

        ctaButton: "Ajouter mon premier tour",
    },
} as const;


// ----------------------------------------------------------
// 🔐 10. AUTHENTIFICATION
// ----------------------------------------------------------
export const authCopy = {
    // Page de connexion
    loginTitle: "ENTRE DANS LE DOJO",
    loginSubtitle: "Entre ton email pour recevoir un code d'accès.",
    emailPlaceholder: "ton@email.com",
    sendMagicLink: "Recevoir mon code ✨",

    // Vérification du code
    checkInboxTitle: "VÉRIFIE TA BOÎTE MAIL 📬",
    checkInboxDescription: "On t'a envoyé un code à 6 chiffres. Saisis-le pour entrer dans le Dojo.",
    otpPlaceholder: "000000",
    verifyCta: "Vérifier le code",
    resendCode: "Renvoyer le code",
    resendCooldown: "Renvoyer dans {seconds}s",

    // Social login
    socialLoginDivider: "ou connecte-toi avec",
    googleLogin: "Continuer avec Google",
    appleLogin: "Continuer avec Apple",

    // Erreurs
    errors: {
        invalidEmail: "Cet email n'a pas l'air valide. Vérifie et réessaie.",
        invalidCode: "Ce code n'est pas bon. Vérifie ta boîte mail.",
        expiredCode: "Ce code a expiré. On t'en envoie un nouveau.",
        tooManyAttempts: "Trop de tentatives. Attends un moment avant de réessayer.",
        genericError: "Quelque chose n'a pas fonctionné. Réessaie dans quelques secondes.",
    },
} as const;


// ----------------------------------------------------------
// 💰 11. TEXTES DE CONVERSION (Tunnel vers Formation 1 397 €)
// ----------------------------------------------------------
export const conversionCopy = {
    // Message contextuel 1 — Après 10 sessions d'entraînement
    contextualMessage1: {
        trigger: "after_10_sessions",
        title: "Tu progresses vite. 🔥",
        message:
            "Tu as terminé {count} sessions. Si tu veux aller encore plus loin, Sébastien a créé une formation complète pour les magiciens qui veulent passer d'amateur à professionnel.",
        cta: "En savoir plus",
        ctaLink: "https://magicienpro.fr/offre-speciale",
        dismissCta: "Plus tard",
    },

    // Message contextuel 2 — Après atteinte du rang Initié
    contextualMessage2: {
        trigger: "rank_initie_reached",
        title: "Tu es maintenant Initié. La suite ?",
        message:
            "Tu as prouvé que tu as la discipline. Le Dojo t'entraîne à devenir un meilleur magicien. La formation « Amateur → Entrepreneur » t'apprend à en vivre.",
        cta: "Découvrir la formation",
        ctaLink: "https://magicienpro.fr/offre-speciale",
        dismissCta: "Pas maintenant",
    },

    // Message contextuel 3 — Après 5 tours au stade "Prêt"
    contextualMessage3: {
        trigger: "5_tricks_ready",
        title: "5 tours prêts. Et si tu les jouais pour de vrai ?",
        message:
            "Tu as un répertoire solide. La prochaine étape, c'est le terrain. La formation de Sébastien t'apprend à décrocher tes premiers contrats et à te passer devant du vrai public.",
        cta: "Voir le programme",
        ctaLink: "https://magicienpro.fr/offre-speciale",
        dismissCta: "Je continue à m'entraîner",
    },

    // Bannière de bienvenue (nouveaux inscrits)
    welcomeBanner: {
        title: "BIENVENUE DANS L'ÉCOSYSTÈME MAGICIENPRO",
        message:
            "Le Dojo est ton espace d'entraînement gratuit. Mais MagicienPro, c'est bien plus : des tutoriels vidéo, une chaîne YouTube, et une formation pour devenir magicien professionnel. Explore, entraîne-toi, et quand tu seras prêt... on en parle. 🔥",
        cta: "Découvrir MagicienPro",
        ctaLink: "https://magicienpro.fr",
        dismissCta: "Fermer",
    },
} as const;


// ----------------------------------------------------------
// 🎨 12. MICRO-INTERACTIONS & TOASTS
// ----------------------------------------------------------
export const toastsCopy = {
    // Succès
    trickAdded: "Tour ajouté à ta bibliothèque ✓",
    trickUpdated: "Tour mis à jour ✓",
    trickDeleted: "Tour supprimé",
    trickMoved: "Tour déplacé vers « {stage} »",
    sessionCompleted: "Session terminée ! +{xp} XP 🔥",
    profileUpdated: "Profil mis à jour ✓",
    exportReady: "Export prêt — téléchargement en cours",

    // Erreurs
    genericError: "Quelque chose a mal tourné. Réessaie.",
    networkError: "Connexion perdue. Vérifie ta connexion internet.",
    saveError: "Impossible de sauvegarder. Réessaie dans un instant.",

    // Info
    streakShieldUsed: "🛡️ Ton bouclier de streak a été utilisé ! Tu gardes ta flamme.",
    quotaWarning: "Il te reste {count} message(s) avec Le Coach aujourd'hui.",
} as const;


// ----------------------------------------------------------
// 🌳 13. ARBRE DE COMPÉTENCES
// ----------------------------------------------------------
export const skillTreeCopy = {
    pageTitle: "ARBRE DE COMPÉTENCES",
    pageDescription: "Dépense ton XP pour débloquer des techniques. Forge ton identité de magicien.",

    // Labels
    unlockCta: "Débloquer ({xpCost} XP)",
    alreadyUnlocked: "Débloqué ✓",
    locked: "Verrouillé",
    prerequisite: "Débloque d'abord « {parentName} »",
    notEnoughXp: "XP insuffisant ({currentXp}/{xpCost})",

    // Branches
    branches: {
        cards: { label: "Cartomagie", icon: "♠️" },
        coins: { label: "Pièces", icon: "🪙" },
        mentalism: { label: "Mentalisme", icon: "🧠" },
    },

    // Confirmation
    confirmUnlock: {
        title: "DÉBLOQUER CETTE TECHNIQUE ?",
        description: "Tu dépenseras {xpCost} XP. Il te restera {xpAfter} XP.",
        ctaConfirm: "Débloquer",
        ctaCancel: "Annuler",
    },

    // Succès de déblocage
    unlockSuccess: {
        title: "TECHNIQUE DÉBLOQUÉE !",
        subtitle: "« {techniqueName} » est maintenant dans ton arsenal. 🔥",
        cta: "Continuer",
    },
} as const;


// ----------------------------------------------------------
// 📊 14. DASHBOARD (PAGE D'ACCUEIL CONNECTÉE)
// ----------------------------------------------------------
export const dashboardCopy = {
    greeting: {
        morning: "Bonjour {name} ! Prêt à t'entraîner ? ☀️",
        afternoon: "Salut {name} ! Une session cet après-midi ? 🔥",
        evening: "Hey {name} ! Session du soir ? C'est souvent les meilleures. 🌙",
    },

    // Widgets
    quickActions: {
        startTraining: "Lancer une session",
        addTrick: "Ajouter un tour",
        askCoach: "Parler au Coach",
    },

    // Résumé hebdomadaire
    weeklyRecap: {
        title: "TA SEMAINE",
        sessionsLabel: "Sessions",
        xpLabel: "XP gagnés",
        tricksAdvanced: "Tours avancés",
        noActivity: "Aucune activité cette semaine. Lance-toi — 15 minutes suffisent.",
    },

    // Citation du jour
    dailyQuote: {
        label: "Mot du jour",
    },
} as const;
