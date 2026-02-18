# 📂 STRUCTURE.md — Le Dojo 2.0 Frontend

> **Dernière mise à jour** : Phase 8 - Connexion Supabase Navigation terminée
> **Stack** : Next.js 14 · Tailwind CSS · Framer Motion
> **Build** : ✅ 0 erreurs

---

## 🗂 Arborescence

```
02_FRONTEND/
│
├── app/                          # App Router Next.js
│   ├── page.tsx                  # Landing page publique
│   ├── layout.tsx                # Layout racine (fonts, SEO)
│   ├── globals.css               # Variables CSS + design system Magma
│   │
│   ├── (auth)/                   # Groupe routes auth
│   │   ├── layout.tsx            # Layout spécial auth
│   │   └── login/page.tsx        # Connexion (email + code)
│   │
│   └── (dashboard)/              # Groupe routes app
│       ├── layout.tsx            # Layout avec sidebar/topbar/mobile-nav
│       ├── bibliotheque/         # Ta collection de tours
│       ├── entrainement/         # Entraînement TSVP
│       ├── progression/          # XP, streak, roue, achievements
│       ├── coach/                # Coach IA (chat)
│       └── profil/               # Ton profil
│
├── components/
│   ├── ui/                       # Composants réutilisables
│   │   ├── button.tsx            # Bouton (5 variantes)
│   │   ├── card.tsx              # Carte glass
│   │   ├── badge.tsx             # Badge catégorie/stade
│   │   ├── input.tsx             # Champ texte
│   │   ├── select.tsx            # Menu déroulant
│   │   ├── textarea.tsx          # Zone de texte
│   │   ├── modal.tsx             # Fenêtre modale
│   │   ├── progress-bar.tsx      # Barre de progression
│   │   ├── avatar.tsx            # Avatar avec badge
│   │   ├── timer.tsx             # Timer circulaire SVG
│   │   ├── tooltip.tsx           # Info-bulle
│   │   ├── skeleton.tsx          # Placeholder de chargement
│   │   ├── spinner.tsx           # Loading spinner
│   │   └── toast.tsx             # Notifications
│   │
│   ├── layouts/                  # Structure des pages
│   │   ├── sidebar.tsx           # Menu latéral (desktop)
│   │   ├── mobile-nav.tsx        # Navigation mobile
│   │   ├── topbar.tsx            # Barre supérieure
│   │   ├── dashboard-layout.tsx  # Assemblage dashboard
│   │   └── auth-layout.tsx       # Assemblage auth
│   │
│   └── features/                 # Composants métier
│       ├── library/              # Bibliothèque de tours
│       │   ├── trick-card.tsx
│       │   ├── kanban-board.tsx
│       │   └── filter-bar.tsx
│       ├── training/             # Entraînement
│       │   ├── tsvp-stepper.tsx
│       │   └── session-summary.tsx
│       ├── gamification/         # Gamification 🔥
│       │   ├── xp-level-display.tsx      # Barre XP / niveau
│       │   ├── streak-display.tsx        # Affichage streak
│       │   ├── achievement-card.tsx      # Carte de succès
│       │   ├── reward-wheel.tsx          # Roue simple
│       │   ├── flame-effect.tsx      ★   # Flamme SVG animée (5 paliers)
│       │   ├── xp-popup.tsx          ★   # Popup "+XP" avec particules
│       │   ├── rank-ceremony.tsx     ★   # Cérémonie passage de rang
│       │   ├── skill-tree-premium.tsx ★  # Arbre de compétences
│       │   ├── reward-wheel-premium.tsx ★ # Roue premium (Framer Motion)
│       │   ├── level-up-overlay.tsx  ★   # Overlay level up
│       │   └── trick-card-3d.tsx     ★   # Carte 3D avec bordure animée
│       └── coach/                # Coach IA
│           └── chat-interface.tsx
│
├── config/
│   └── site-config.ts            # Source de vérité centrale
│
├── lib/
│   └── utils/cn.ts               # Merge classes Tailwind
│
├── tailwind.config.ts            # Tokens design (couleurs, fonts, animations)
└── package.json                  # Dépendances
```

> ★ = Composants Premium Phase 7 (Framer Motion)

---

## 🎨 Design System "Magma"

| Token | Usage |
|-------|-------|
| `fire-amber` (#FF9500) | Couleur primaire, CTAs |
| `fire-orange` (#FF6200) | Accents, bordures actives |
| `fire-red` (#E03000) | Alertes, streak danger |
| `fire-yellow` (#FFD000) | Or, récompenses |
| `black-base` (#020202) | Fond principal |
| `black-card` (#0F0F0F) | Fond cartes glass |
| `glass-card` | Glassmorphism (backdrop-blur) |
| `glow-fire` | Halo feu (radial-gradient) |
