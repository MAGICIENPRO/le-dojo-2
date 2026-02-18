// ============================================================
// 🔥 LE DOJO 2.0 — FICHIER DE CONFIGURATION CENTRAL
// ============================================================
// Ce fichier est LA source de vérité pour tous les textes,
// couleurs, données et paramètres de l'application.
// Aucun texte ne doit être hardcodé dans les composants.
// ============================================================

// ----------------------------------------------------------
// 🏷️ APP METADATA
// ----------------------------------------------------------
export const appConfig = {
    name: "Le Dojo 2.0",
    tagline: "Apprends la magie. Transforme ta vie.",
    description:
        "L'espace d'entraînement ultime pour les magiciens qui veulent passer du chaos à la maîtrise.",
    url: "https://magicienpro.fr/dojo",
    author: "Sébastien Pieta",
    brand: "MagicienPro",
    ogImage: "/og-image.png",
    favicon: "/favicon.ico",
    locale: "fr-FR",
} as const;

// ----------------------------------------------------------
// 🎨 THÈME — PALETTE MAGMA
// ----------------------------------------------------------
export const themeConfig = {
    colors: {
        fireYellow: "#FFD000",
        fireAmber: "#FF9500",
        fireOrange: "#FF6200",
        fireRed: "#E03000",
        fireEmber: "#B82200",

        blackBase: "#020202",
        blackLight: "#0A0A0A",
        blackCard: "#0F0F0F",
        blackBorder: "#1C1C1C",
        white: "#FFFFFF",
        whiteMuted: "#AAAAAA",

        gradientFire: "linear-gradient(135deg, #FFD000, #FF6200, #E03000)",
        gradientFireBtn: "linear-gradient(90deg, #FF9500, #FF6200)",
        gradientFireSubtle: "linear-gradient(180deg, #0F0F0F, #020202)",

        success: "#22C55E",
        warning: "#FBBF24",
        error: "#EF4444",
        info: "#3B82F6",
    },

    fonts: {
        heading: "'Bebas Neue', sans-serif",
        body: "'Outfit', sans-serif",
        accent: "'Playfair Display', serif",
    },

    borderRadius: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
    },
} as const;

// ----------------------------------------------------------
// 🧭 NAVIGATION
// ----------------------------------------------------------
export const navigationConfig = {
    sidebar: [
        {
            label: "Bibliothèque",
            href: "/bibliotheque",
            icon: "BookOpen",
            description: "Tes tours de magie",
        },
        {
            label: "Entraînement",
            href: "/entrainement",
            icon: "Flame",
            description: "Sessions TSVP",
        },
        {
            label: "Progression",
            href: "/progression",
            icon: "TrendingUp",
            description: "XP, niveaux & succès",
        },
        {
            label: "Coach IA",
            href: "/coach",
            icon: "Bot",
            description: "Ton assistant magique",
        },
        {
            label: "Profil",
            href: "/profil",
            icon: "User",
            description: "Tes stats & réglages",
        },
    ],
    mobileNav: [
        { label: "Biblio", href: "/bibliotheque", icon: "BookOpen" },
        { label: "Train", href: "/entrainement", icon: "Flame" },
        { label: "XP", href: "/progression", icon: "TrendingUp" },
        { label: "Coach", href: "/coach", icon: "Bot" },
        { label: "Profil", href: "/profil", icon: "User" },
    ],
} as const;

// ----------------------------------------------------------
// 🎴 CATÉGORIES DE TOURS
// ----------------------------------------------------------
export const trickCategories = [
    { id: "cards", label: "Cartes", icon: "♠️", color: "#FF9500" },
    { id: "coins", label: "Pièces", icon: "🪙", color: "#FFD000" },
    { id: "mentalism", label: "Mentalisme", icon: "🧠", color: "#E03000" },
    { id: "objects", label: "Objets", icon: "🎱", color: "#FF6200" },
    { id: "ropes", label: "Cordes", icon: "🪢", color: "#B82200" },
    { id: "bills", label: "Billets", icon: "💵", color: "#22C55E" },
    { id: "close_up", label: "Close-up", icon: "🤲", color: "#FF9500" },
    { id: "stage", label: "Scène", icon: "🎭", color: "#FFD000" },
    { id: "impromptu", label: "Impromptu", icon: "⚡", color: "#FF6200" },
    { id: "other", label: "Autre", icon: "✨", color: "#AAAAAA" },
] as const;

// ----------------------------------------------------------
// 🏷️ STADES DE PROGRESSION D'UN TOUR
// ----------------------------------------------------------
export const trickStages = [
    {
        id: "study",
        label: "En exploration",
        emoji: "🔍",
        icon: "📖",
        color: "#FF9500",
        description: "Les tours que tu découvres et apprends.",
    },
    {
        id: "rehearsal",
        label: "En forge",
        emoji: "⚒️",
        icon: "🔥",
        color: "#FF6200",
        description: "Les tours que tu travailles activement.",
    },
    {
        id: "ready",
        label: "Prêt au combat",
        emoji: "⚔️",
        icon: "⭐",
        color: "#FFD000",
        description: "Les tours que tu peux sortir les yeux fermés.",
    },
] as const;

// ----------------------------------------------------------
// 🏷️ TAGS DE SITUATION
// ----------------------------------------------------------
export const defaultSituationTags = [
    { name: "Debout", icon: "🧍", color: "#FF9500" },
    { name: "Assis", icon: "🪑", color: "#FFD000" },
    { name: "Entouré", icon: "👥", color: "#FF6200" },
    { name: "Sans préparation", icon: "⚡", color: "#22C55E" },
    { name: "Avec préparation", icon: "📦", color: "#FBBF24" },
    { name: "Angle-proof", icon: "🔒", color: "#3B82F6" },
    { name: "Bar / Soirée", icon: "🍸", color: "#E03000" },
    { name: "Table à table", icon: "🍽️", color: "#FF9500" },
    { name: "Close-up posé", icon: "🫳", color: "#FFD000" },
    { name: "Scène", icon: "🎤", color: "#B82200" },
] as const;

// ----------------------------------------------------------
// 🔥 MÉTHODE TSVP
// ----------------------------------------------------------
export const tsvpSteps = [
    {
        id: "technique",
        label: "Technique",
        icon: "🛠️",
        letter: "T",
        color: "#E03000",
        description: "Décompose le tour. Travaille chaque geste, chaque angle.",
        tips: [
            "Travaille devant un miroir",
            "Vérifie tes angles",
            "Teste sous différentes lumières",
        ],
    },
    {
        id: "script",
        label: "Script",
        icon: "📝",
        letter: "S",
        color: "#FF6200",
        description: "Rends chaque geste naturel avec les mots justes.",
        tips: [
            "Écris ton texte mot à mot",
            "Teste les justifications à voix haute",
            "Élimine la radio-description",
        ],
    },
    {
        id: "video",
        label: "Vidéo",
        icon: "🎬",
        letter: "V",
        color: "#FF9500",
        description: "Filme-toi. Analyse sans son, sans image, puis ensemble.",
        tips: [
            "Règle des 5 vidéos parfaites",
            "Regarde sans le son (gestes)",
            "Écoute sans l'image (texte)",
        ],
    },
    {
        id: "practice",
        label: "Pratique réelle",
        icon: "🎯",
        letter: "P",
        color: "#FFD000",
        description: "Complice → Amis → Terrain (inconnus).",
        tips: [
            "Commence avec un complice bienveillant",
            "Passe aux amis proches",
            "Termine avec des inconnus (le vrai test)",
        ],
    },
] as const;

// ----------------------------------------------------------
// 🏆 GAMIFICATION
// ----------------------------------------------------------
export const gamificationConfig = {
    xpRewards: {
        completeSession: 50,
        completeAllSteps: 100,
        moveTrickToReady: 200,
        dailyLogin: 10,
        streakBonus: 25,
        rateConfidence: 15,
        firstTrick: 100,
    },

    ranks: [
        {
            id: "apprenti",
            label: "Apprenti",
            icon: "🔰",
            minXp: 0,
            maxXp: 999,
            minLevel: 1,
            maxLevel: 5,
            color: "#AAAAAA",
            description: "Tu fais tes premiers pas dans l'art de la magie.",
        },
        {
            id: "initie",
            label: "Initié",
            icon: "✨",
            minXp: 1000,
            maxXp: 4999,
            minLevel: 6,
            maxLevel: 10,
            color: "#FF9500",
            description: "Tu commences à maîtriser les bases. Les effets se précisent.",
        },
        {
            id: "maitre",
            label: "Maître",
            icon: "🔥",
            minXp: 5000,
            maxXp: 14999,
            minLevel: 11,
            maxLevel: 15,
            color: "#FF6200",
            description: "Tes tours font mouche. Le public ne s'en remet pas.",
        },
        {
            id: "grand_maitre",
            label: "Grand Maître",
            icon: "👑",
            minXp: 15000,
            maxXp: Infinity,
            minLevel: 16,
            maxLevel: 20,
            color: "#FFD000",
            description: "Tu es au sommet. La magie coule dans tes veines.",
        },
    ],

    streakMilestones: [3, 7, 14, 30, 60, 100],

    wheel: {
        spinsEveryNSessions: 5,
        rewards: [
            { label: "+100 XP", type: "xp", value: 100, weight: 30 },
            { label: "+250 XP", type: "xp", value: 250, weight: 15 },
            { label: "Bouclier Streak", type: "shield", value: 1, weight: 20 },
            { label: "Conseil du jour", type: "tip", value: 1, weight: 25 },
            { label: "+500 XP JACKPOT", type: "xp", value: 500, weight: 5 },
            { label: "Badge exclusif", type: "badge", value: 1, weight: 5 },
        ],
    },

    xpForLevel: (level: number): number => Math.floor(100 * Math.pow(level, 1.5)),
} as const;

// ----------------------------------------------------------
// 🤖 COACH IA
// ----------------------------------------------------------
export const aiCoachConfig = {
    name: "Le Coach",
    avatar: "/icons/coach-avatar.svg",
    maxFreeRequestsPerDay: 3,

    suggestedPrompts: [
        "Analyse ma routine et dis-moi ce que je peux améliorer",
        "Trouve-moi un boniment original pour un forçage classique",
        "Comment gérer un spectateur qui veut me griller ?",
        "Propose-moi un exercice pour travailler le Thunder Silence",
        "Mon tour est linéaire et ennuyeux, comment le dynamiser ?",
        "Aide-moi à construire un set de 3 tours pour un cocktail debout",
    ],
} as const;

// ----------------------------------------------------------
// 📋 TEXTES UI — Ré-exports depuis copy.ts
// ----------------------------------------------------------
// Pour modifier un texte, un label ou un message :
// → ouvrir config/copy.ts (c'est là que TOUT le copy vit)
// ----------------------------------------------------------
export {
    onboardingCopy as onboardingTexts,
    landingPageCopy,
    navigationCopy,
    libraryCopy,
    trainingCopy,
    gamificationCopy,
    coachCopy,
    profileCopy,
    emailsCopy,
    authCopy,
    conversionCopy,
    toastsCopy,
    skillTreeCopy,
    dashboardCopy,
} from "./copy";

// uiTexts — mapping rétrocompatible pour les composants existants
// Les composants utilisent uiTexts.landing.heroCta, uiTexts.library.title, etc.
// On mappe vers les objets enrichis du Copywriter tout en gardant la même API.
import {
    landingPageCopy as _landing,
    libraryCopy as _library,
    trainingCopy as _training,
    gamificationCopy as _gamification,
    coachCopy as _coach,
    profileCopy as _profile,
    authCopy as _auth,
} from "./copy";

export const uiTexts = {
    landing: {
        heroTitle: _landing.headline,
        heroSubtitle: _landing.subtitle,
        heroCta: _landing.ctaPrimary,
        ctaSecondary: _landing.ctaSecondary,
        benefits: _landing.benefits,
        socialProof: _landing.socialProof,
        ctaFinal: _landing.ctaFooter,
        howItWorks: _landing.howItWorks,
        mentorSection: _landing.mentorSection,
    },
    library: {
        title: _library.pageTitle,
        emptyState: _library.emptyState,
        kanbanTitle: _library.kanbanTitle,
        matrixTitle: _library.matrixTitle,
        filterPlaceholder: _library.searchPlaceholder,
        kanbanColumns: _library.kanbanColumns,
        categories: _library.categories,
        situationTags: _library.situationTags,
        addTrickCta: _library.addTrickCta,
        addTrickForm: _library.addTrickForm,
        trickActions: _library.trickActions,
    },
    training: {
        title: _training.pageTitle,
        selectTrick: _training.selectTrick.title,
        startSession: _training.timer.ctaStart,
        sessionComplete: _training.sessionEnd.title,
        xpEarned: _training.sessionEnd.xpEarned,
        tsvpSteps: _training.tsvpSteps,
        sessionStart: _training.sessionStart,
        sessionEnd: _training.sessionEnd,
        timer: _training.timer,
        confidenceRating: _training.confidenceRating,
    },
    gamification: {
        title: _gamification.pageTitle,
        levelUp: _gamification.levelUp.title,
        newAchievement: _gamification.achievementUnlocked.title,
        streakAlive: _gamification.streakMessages.alive,
        streakDead: _gamification.streakMessages.dead,
        rankUp: _gamification.rankUp,
        streakMessages: _gamification.streakMessages,
        wheel: _gamification.wheel,
        spacedRepetition: _gamification.spacedRepetition,
        progressionLabels: _gamification.progressionLabels,
    },
    coach: {
        title: _coach.pageTitle,
        quotaWarning: "Il te reste {remaining} message(s) aujourd'hui.",
        quotaExhausted: _coach.quota.exhaustedMessage,
        inputPlaceholder: _coach.inputPlaceholder,
        welcomeMessage: _coach.welcomeMessage,
        defaultSuggestions: _coach.defaultSuggestions,
        offTopicResponse: _coach.offTopicResponse,
        thinkingMessage: _coach.thinkingMessage,
        errorMessage: _coach.errorMessage,
        quota: _coach.quota,
    },
    profile: {
        title: _profile.pageTitle,
        exportButton: _profile.exportSection.ctaExport,
        exportDescription: _profile.exportSection.description,
        statsLabels: _profile.statsLabels,
        exportSection: _profile.exportSection,
        settings: _profile.settings,
        deleteAccount: _profile.deleteAccount,
    },
    auth: {
        loginTitle: _auth.loginTitle,
        loginSubtitle: _auth.loginSubtitle,
        emailPlaceholder: _auth.emailPlaceholder,
        sendMagicLink: _auth.sendMagicLink,
        checkInbox: _auth.checkInboxTitle,
        checkInboxDescription: _auth.checkInboxDescription,
        otpPlaceholder: _auth.otpPlaceholder,
        verifyCta: _auth.verifyCta,
        resendCode: _auth.resendCode,
        resendCooldown: _auth.resendCooldown,
        socialLoginDivider: _auth.socialLoginDivider,
        googleLogin: _auth.googleLogin,
        appleLogin: _auth.appleLogin,
        errors: _auth.errors,
    },
} as const;

// ----------------------------------------------------------
// 🏆 ACHIEVEMENTS
// ----------------------------------------------------------
export const achievementDefinitions = [
    // 🛠️ Entraînement
    { id: "first_session", name: "Premier Pas", description: "Complète ta première session", icon: "🥇", category: "training", xpReward: 50 },
    { id: "sessions_10", name: "Échauffé", description: "10 sessions complétées", icon: "🔥", category: "training", xpReward: 100 },
    { id: "sessions_50", name: "Machine de Guerre", description: "50 sessions complétées", icon: "⚔️", category: "training", xpReward: 250 },
    { id: "sessions_100", name: "Légende", description: "100 sessions complétées", icon: "🏆", category: "training", xpReward: 500 },
    { id: "tsvp_complete", name: "Les 4 Éléments", description: "Complète les 4 étapes TSVP sur un seul tour", icon: "🌀", category: "training", xpReward: 150 },
    { id: "hours_10", name: "10 Heures au Dojo", description: "10 heures d'entraînement cumulées", icon: "⏱️", category: "training", xpReward: 200 },
    { id: "hours_50", name: "Forgeron du Dojo", description: "50 heures d'entraînement", icon: "🔨", category: "training", xpReward: 500 },
    // 📚 Bibliothèque
    { id: "first_trick", name: "Mon Premier Tour", description: "Ajoute ton premier tour", icon: "🎴", category: "library", xpReward: 100 },
    { id: "tricks_10", name: "Collectionneur", description: "10 tours dans ta bibliothèque", icon: "📚", category: "library", xpReward: 150 },
    { id: "tricks_25", name: "Encyclopédie Vivante", description: "25 tours dans ta bibliothèque", icon: "📖", category: "library", xpReward: 250 },
    { id: "first_ready", name: "Prêt au Combat", description: "Un tour au stade 'Prêt'", icon: "⭐", category: "library", xpReward: 200 },
    { id: "ready_5", name: "Arsenal Chargé", description: "5 tours prêts pour le public", icon: "💎", category: "library", xpReward: 300 },
    { id: "ready_10", name: "Maître du Set", description: "10 tours prêts pour le public", icon: "👑", category: "library", xpReward: 500 },
    { id: "all_categories", name: "Polyvalent", description: "Au moins 1 tour dans 5 catégories", icon: "🎯", category: "library", xpReward: 200 },
    // 🔥 Streak
    { id: "streak_3", name: "Flamme Allumée", description: "3 jours consécutifs", icon: "🕯️", category: "streak", xpReward: 75 },
    { id: "streak_7", name: "Semaine de Feu", description: "7 jours consécutifs", icon: "🔥", category: "streak", xpReward: 150 },
    { id: "streak_14", name: "Infernal", description: "14 jours consécutifs", icon: "🌋", category: "streak", xpReward: 300 },
    { id: "streak_30", name: "Inarrêtable", description: "30 jours consécutifs", icon: "☄️", category: "streak", xpReward: 500 },
    { id: "streak_60", name: "Phénix", description: "60 jours consécutifs", icon: "🦅", category: "streak", xpReward: 750 },
    { id: "streak_100", name: "Flamme Éternelle", description: "100 jours consécutifs", icon: "💎", category: "streak", xpReward: 1000 },
    // 🎯 Social / Confiance
    { id: "first_confidence", name: "Feedback Courageux", description: "Note ta confiance après 1 présentation", icon: "💪", category: "social", xpReward: 50 },
    { id: "confidence_10", name: "Terrain Conquis", description: "10 notes de confiance", icon: "📊", category: "social", xpReward: 200 },
    { id: "confidence_max", name: "Invincible", description: "Note ta confiance à 10/10", icon: "🔱", category: "social", xpReward: 300 },
] as const;

// ----------------------------------------------------------
// 🌳 ARBRE DE COMPÉTENCES
// ----------------------------------------------------------
export const skillTreeConfig = {
    categories: [
        {
            id: "cards",
            label: "Cartes",
            icon: "♠️",
            nodes: [
                { id: "card_basics", name: "Bases de Cartomagie", parent: null, xpCost: 0, unlocked: true },
                { id: "classic_force", name: "Forçage Classique", parent: "card_basics", xpCost: 100 },
                { id: "false_shuffle", name: "Faux Mélange", parent: "card_basics", xpCost: 100 },
                { id: "double_lift", name: "Double Lift", parent: "card_basics", xpCost: 150 },
                { id: "palm", name: "Empalmage", parent: "double_lift", xpCost: 250 },
                { id: "pass", name: "La Passe", parent: "palm", xpCost: 500 },
                { id: "color_change", name: "Color Change", parent: "double_lift", xpCost: 200 },
            ],
        },
        {
            id: "coins",
            label: "Pièces",
            icon: "🪙",
            nodes: [
                { id: "coin_basics", name: "Bases de Pièces", parent: null, xpCost: 0, unlocked: true },
                { id: "french_drop", name: "French Drop", parent: "coin_basics", xpCost: 100 },
                { id: "coin_retention", name: "Retention Vanish", parent: "coin_basics", xpCost: 150 },
                { id: "coin_production", name: "Production de Pièce", parent: "french_drop", xpCost: 200 },
            ],
        },
        {
            id: "mentalism",
            label: "Mentalisme",
            icon: "🧠",
            nodes: [
                { id: "mentalism_basics", name: "Bases du Mentalisme", parent: null, xpCost: 0, unlocked: true },
                { id: "cold_reading", name: "Cold Reading", parent: "mentalism_basics", xpCost: 200 },
                { id: "hot_reading", name: "Hot Reading", parent: "cold_reading", xpCost: 300 },
                { id: "dual_reality", name: "Double Réalité", parent: "mentalism_basics", xpCost: 250 },
            ],
        },
    ],
} as const;

// ----------------------------------------------------------
// 📊 MOCK DATA (pour le développement)
// ----------------------------------------------------------
export const mockData = {
    user: {
        id: "mock-user-1",
        username: "MagicMaster42",
        avatarUrl: null,
        level: 7,
        totalXp: 2350,
        currentStreak: 12,
        longestStreak: 23,
        trainingCount: 34,
        tricksMastered: 5,
        rank: "initie" as const,
    },

    tricks: [
        {
            id: "t1",
            name: "Ambitious Card",
            category: "cards" as const,
            stage: "ready" as const,
            difficulty: 3,
            practiceCount: 15,
            description: "La carte choisie remonte systématiquement sur le dessus du jeu.",
        },
        {
            id: "t2",
            name: "Two Card Monte",
            category: "cards" as const,
            stage: "rehearsal" as const,
            difficulty: 2,
            practiceCount: 8,
            description: "Le spectateur ne peut jamais trouver la bonne carte.",
        },
        {
            id: "t3",
            name: "Matrix",
            category: "coins" as const,
            stage: "study" as const,
            difficulty: 4,
            practiceCount: 3,
            description: "4 pièces se rassemblent une par une sous une seule carte.",
        },
        {
            id: "t4",
            name: "Out of This World",
            category: "mentalism" as const,
            stage: "ready" as const,
            difficulty: 2,
            practiceCount: 20,
            description: "Le spectateur sépare les cartes rouges et noires sans les regarder.",
        },
        {
            id: "t5",
            name: "French Drop",
            category: "coins" as const,
            stage: "ready" as const,
            difficulty: 1,
            practiceCount: 50,
            description: "La pièce disparaît d'une main à l'autre.",
        },
        {
            id: "t6",
            name: "Triumph",
            category: "cards" as const,
            stage: "rehearsal" as const,
            difficulty: 4,
            practiceCount: 6,
            description: "Les cartes mélangées face/dos se retournent toutes sauf la carte choisie.",
        },
        {
            id: "t7",
            name: "Invisible Deck",
            category: "mentalism" as const,
            stage: "study" as const,
            difficulty: 1,
            practiceCount: 2,
            description: "Le spectateur nomme une carte, elle est retournée dans un jeu invisible.",
        },
        {
            id: "t8",
            name: "Sponge Balls",
            category: "close_up" as const,
            stage: "rehearsal" as const,
            difficulty: 3,
            practiceCount: 12,
            description: "Les balles éponge se multiplient dans les mains du spectateur.",
        },
    ],

    recentSessions: [
        { id: "s1", trickName: "Ambitious Card", step: "technique", xp: 50, date: "2026-02-18" },
        { id: "s2", trickName: "Matrix", step: "script", xp: 50, date: "2026-02-17" },
        { id: "s3", trickName: "Two Card Monte", step: "video", xp: 50, date: "2026-02-16" },
    ],

    chatMessages: [
        {
            id: "m1",
            role: "user" as const,
            content: "Comment améliorer ma routine d'Ambitious Card ?",
        },
        {
            id: "m2",
            role: "assistant" as const,
            content: "Bonne question ! L'Ambitious Card est un classique qui peut devenir extraordinaire. Voici 3 axes d'amélioration :\n\n1. **Le Thunder Silence** — Après chaque phase où la carte remonte, marque une pause de 2-3 secondes. Laisse le silence faire le travail.\n\n2. **La Courbe Cardiaque** — Varie l'intensité. Commence en douceur (carte signée, première montée simple), puis accélère (montée dans l'étui, retournement face visible).\n\n3. **L'Empreinte** — Termine avec un kicker que personne n'attend. Par exemple, la carte se retrouve dans ta poche ou collée dans le dos du spectateur.\n\nTu veux qu'on travaille un de ces axes en détail ?",
        },
    ],
} as const;

// ----------------------------------------------------------
// 📱 RESPONSIVE BREAKPOINTS
// ----------------------------------------------------------
export const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
} as const;
