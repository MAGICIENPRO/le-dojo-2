import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-gradient-fire-btn text-black-base font-semibold shadow-glow-fire-sm hover:shadow-glow-fire active:shadow-none",
    secondary:
        "bg-black-card border border-black-border text-white hover:bg-black-hover hover:border-fire-orange/30",
    ghost:
        "bg-transparent text-white-muted hover:text-white hover:bg-white/5",
    danger:
        "bg-error/10 border border-error/30 text-error hover:bg-error/20",
    outline:
        "bg-transparent border border-fire-orange/40 text-fire-orange hover:bg-fire-orange/10",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm gap-1.5 rounded-lg",
    md: "h-10 px-5 text-sm gap-2 rounded-card",
    lg: "h-12 px-7 text-base gap-2.5 rounded-card-lg",
    icon: "h-10 w-10 rounded-card p-0 flex items-center justify-center",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    "inline-flex items-center justify-center font-body font-medium",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black-base",
                    "disabled:opacity-50 disabled:pointer-events-none",
                    "active:scale-[0.97]",
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>{children}</span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
