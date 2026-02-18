import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, hint, iconLeft, iconRight, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-white-muted mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {iconLeft && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white-dim">
                            {iconLeft}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            "w-full h-10 rounded-card bg-black-card border border-black-border",
                            "text-white placeholder:text-white-dim",
                            "font-body text-sm",
                            "px-3",
                            "transition-colors duration-200",
                            "hover:border-white-dim/30",
                            "focus:outline-none focus:ring-2 focus:ring-fire-orange/50 focus:border-fire-orange/50",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            iconLeft && "pl-10",
                            iconRight && "pr-10",
                            error && "border-error/50 focus:ring-error/50 focus:border-error/50",
                            className
                        )}
                        aria-invalid={error ? "true" : undefined}
                        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
                        {...props}
                    />
                    {iconRight && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white-dim">
                            {iconRight}
                        </div>
                    )}
                </div>
                {error && (
                    <p id={`${inputId}-error`} className="mt-1 text-xs text-error" role="alert">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p id={`${inputId}-hint`} className="mt-1 text-xs text-white-dim">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input, type InputProps };
