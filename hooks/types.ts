export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type TrickCategory =
    | 'cards'
    | 'coins'
    | 'mentalism'
    | 'objects'
    | 'ropes'
    | 'bills'
    | 'close_up'
    | 'stage'
    | 'impromptu'
    | 'other'

export type TrickStage = 'study' | 'rehearsal' | 'ready'

export type TrickDifficulty = 1 | 2 | 3 | 4 | 5

export type TsvpStep = 'technique' | 'script' | 'video' | 'practice'

export type GamificationRank =
    | 'apprenti'
    | 'initie'
    | 'maitre'
    | 'grand_maitre'

export type AchievementCategory =
    | 'training'
    | 'library'
    | 'streak'
    | 'social'

export interface Profile {
    id: string
    username: string
    avatar_url: string | null
    level: number
    total_xp: number
    current_streak: number
    longest_streak: number
    last_training_date: string | null
    training_count: number
    tricks_mastered: number
    onboarding_completed: boolean
    created_at: string
    updated_at: string
}

export interface Trick {
    id: string
    user_id: string
    name: string
    category: TrickCategory
    stage: TrickStage
    description: string | null
    personal_notes: string | null
    source: string | null
    difficulty: TrickDifficulty
    preparation_required: boolean
    angle_sensitive: boolean
    duration_seconds: number | null
    practice_count: number
    last_practiced_at: string | null
    sort_order: number
    created_at: string
    updated_at: string
}

export interface TrainingSession {
    id: string
    user_id: string
    trick_id: string | null
    technique_id: string | null
    tsvp_step: TsvpStep
    duration_seconds: number
    notes: string | null
    xp_earned: number
    completed_at: string
    created_at: string
}

export interface GamificationProgress {
    id: string
    user_id: string
    rank: GamificationRank
    wheel_spins_available: number
    total_wheel_spins: number
    trainings_since_last_spin: number
    daily_streak_shield: boolean
    created_at: string
    updated_at: string
}

export interface Achievement {
    id: string
    name: string
    description: string
    icon: string
    xp_reward: number
    category: AchievementCategory
    requirement_type: string
    requirement_value: number
    sort_order: number
}

export interface AchievementLog {
    id: string
    user_id: string
    achievement_id: string
    unlocked_at: string
}

export interface Tag {
    id: string
    user_id: string
    name: string
    color: string
    icon: string
    is_system: boolean
}

export interface Technique {
    id: string
    user_id: string
    name: string
    category: string
    description: string
    difficulty: number
    mastered: boolean
    unlocked: boolean
    practice_count: number
}

export interface ConfidenceRating {
    id: string
    user_id: string
    trick_id: string
    rating: number
    context: string | null
    audience_type: string | null
    created_at: string
}
