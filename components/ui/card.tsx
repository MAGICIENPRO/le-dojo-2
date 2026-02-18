import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "hover" | "fire-border" | "elevated";
    padding?: "none" | "sm" | "md" | "lg";
    children: ReactNode;
}

const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-4 md:p-5",
    lg: "p-5 md:p-6",
};

function Card({
    className,
    variant = "default",
    padding = "md",
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                // Base
                "rounded-card border border-black-border",
                "bg-black-card",
                // Glass effect
                "backdrop-blur-sm",
                // Variant styles
                variant === "hover" &&
                "transition-all duration-300 hover:border-fire-orange/30 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer",
                variant === "fire-border" &&
                "gradient-fire-border",
                variant === "elevated" &&
                "shadow-card bg-gradient-to-b from-white/[0.03] to-transparent",
                // Padding
                paddingStyles[padding],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

// --- Card sub-components ---

function CardHeader({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex items-center justify-between mb-3", className)} {...props}>
            {children}
        </div>
    );
}

function CardTitle({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn("font-heading text-lg uppercase tracking-wider text-white", className)}
            {...props}
        >
            {children}
        </h3>
    );
}

function CardDescription({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn("text-sm text-white-muted mt-1", className)} {...props}>
            {children}
        </p>
    );
}

function CardContent({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("", className)} {...props}>
            {children}
        </div>
    );
}

function CardFooter({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex items-center gap-2 mt-4 pt-3 border-t border-black-border", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps };
