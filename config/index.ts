// ============================================================
// 🔥 LE DOJO 2.0 — BARREL EXPORT (config/)
// ============================================================
// Point d'entrée unique pour toute la configuration.
// Import: import { appConfig, uiTexts, libraryCopy } from "@/config";
// ============================================================

// ⚙️ Configuration technique (thème, navigation, gamification, IA, breakpoints)
export {
    appConfig,
    themeConfig,
    navigationConfig,
    trickCategories,
    tsvpSteps,
    gamificationConfig,
    aiCoachConfig,
    defaultSituationTags,
    achievementDefinitions,
    skillTreeConfig,
    mockData,
    breakpoints,
} from "./site-config";

// 📋 Textes UI — ré-exportés depuis site-config (qui importe copy.ts)
export {
    uiTexts,
    onboardingTexts,
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
} from "./site-config";
