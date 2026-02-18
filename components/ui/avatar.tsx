import { cn } from "@/lib/utils/cn";

interface AvatarProps {
    src?: string | null;
    alt?: string;
    fallback?: string;
    size?: "sm" | "md" | "lg" | "xl";
    level?: number;
    className?: string;
}

const sizeStyles = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl",
};

const levelBadgeSizes = {
    sm: "h-4 w-4 text-[8px] -bottom-0.5 -right-0.5",
    md: "h-5 w-5 text-[9px] -bottom-0.5 -right-0.5",
    lg: "h-6 w-6 text-[10px] -bottom-0.5 -right-0.5",
    xl: "h-7 w-7 text-xs -bottom-1 -right-1",
};

export function Avatar({
    src,
    alt = "Avatar",
    fallback,
    size = "md",
    level,
    className,
}: AvatarProps) {
    const initials = fallback
        ? fallback.slice(0, 2).toUpperCase()
        : alt.slice(0, 2).toUpperCase();

    return (
        <div className={cn("relative inline-flex flex-shrink-0", className)}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className={cn(
                        "rounded-full object-cover border-2 border-black-border",
                        sizeStyles[size]
                    )}
                />
            ) : (
                <div
                    className={cn(
                        "rounded-full flex items-center justify-center",
                        "bg-gradient-fire-btn text-black-base font-heading font-bold",
                        "border-2 border-fire-orange/30",
                        sizeStyles[size]
                    )}
                    role="img"
                    aria-label={alt}
                >
                    {initials}
                </div>
            )}

            {level !== undefined && (
                <span
                    className={cn(
                        "absolute flex items-center justify-center",
                        "rounded-full bg-fire-orange text-black-base font-bold",
                        "border-2 border-black-base",
                        levelBadgeSizes[size]
                    )}
                    aria-label={`Niveau ${level}`}
                >
                    {level}
                </span>
            )}
        </div>
    );
}
