import { cn } from "@/lib/utils/cn";
import { type HTMLAttributes } from "react";

type BadgeVariant = "default" | "fire" | "success" | "warning" | "error" | "info" | "outline";
type BadgeSize = "sm" | "md";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    color?: string;
    icon?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-white/10 text-white-muted border-white/10",
    fire: "bg-fire-orange/15 text-fire-orange border-fire-orange/30",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    error: "bg-error/15 text-error border-error/30",
    info: "bg-info/15 text-info border-info/30",
    outline: "bg-transparent text-white-muted border-black-border",
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: "text-[10px] px-1.5 py-0.5 gap-0.5",
    md: "text-xs px-2.5 py-1 gap-1",
};

function Badge({
    className,
    variant = "default",
    size = "md",
    color,
    icon,
    children,
    ...props
}: BadgeProps) {
    const customColorStyle = color
        ? {
            backgroundColor: `${color}20`,
            color: color,
            borderColor: `${color}40`,
        }
        : undefined;

    return (
        <span
            className={cn(
                "inline-flex items-center font-body font-medium rounded-pill border",
                "whitespace-nowrap leading-none",
                !color && variantStyles[variant],
                sizeStyles[size],
                className
            )}
            style={customColorStyle}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </span>
    );
}

export { Badge, type BadgeProps, type BadgeVariant };
