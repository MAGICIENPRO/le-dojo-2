import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
    value: number; // 0-100
    max?: number;
    label?: string;
    showValue?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "fire" | "success" | "info" | "custom";
    color?: string;
    className?: string;
    animated?: boolean;
}

const sizeStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
};

export function ProgressBar({
    value,
    max = 100,
    label,
    showValue = false,
    size = "md",
    variant = "fire",
    color,
    className,
    animated = true,
}: ProgressBarProps) {
    const percent = Math.min(Math.max((value / max) * 100, 0), 100);

    const barBackground = (() => {
        if (color) return color;
        switch (variant) {
            case "fire":
                return "linear-gradient(90deg, #FF9500, #FF6200, #E03000)";
            case "success":
                return "#22C55E";
            case "info":
                return "#3B82F6";
            default:
                return "linear-gradient(90deg, #FF9500, #FF6200)";
        }
    })();

    return (
        <div className={cn("w-full", className)}>
            {(label || showValue) && (
                <div className="flex items-center justify-between mb-1.5">
                    {label && <span className="text-xs font-medium text-white-muted">{label}</span>}
                    {showValue && (
                        <span className="text-xs font-medium text-white-muted">
                            {Math.round(value)}/{max}
                        </span>
                    )}
                </div>
            )}
            <div
                className={cn(
                    "w-full rounded-pill bg-white/5 overflow-hidden",
                    sizeStyles[size]
                )}
                role="progressbar"
                aria-valuenow={Math.round(value)}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label={label}
            >
                <div
                    className={cn(
                        "h-full rounded-pill",
                        animated && "transition-all duration-700 ease-out",
                        variant === "fire" && "shadow-glow-fire-sm"
                    )}
                    style={{
                        width: `${percent}%`,
                        background: barBackground,
                    }}
                />
            </div>
        </div>
    );
}
