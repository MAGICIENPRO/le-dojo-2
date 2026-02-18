import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

const sizeStyles = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
    return (
        <div
            className={cn(
                "animate-spin rounded-full",
                "border-2 border-white/10 border-t-fire-orange",
                sizeStyles[size],
                className
            )}
            role="status"
            aria-label="Chargement"
        >
            <span className="sr-only">Chargement...</span>
        </div>
    );
}
