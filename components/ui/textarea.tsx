import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, hint, id, ...props }, ref) => {
        const textareaId = id || label?.toLowerCase().replace(/\s/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium text-white-muted mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={cn(
                        "w-full min-h-[100px] rounded-card bg-black-card border border-black-border",
                        "text-white placeholder:text-white-dim",
                        "font-body text-sm",
                        "p-3 resize-y",
                        "transition-colors duration-200",
                        "hover:border-white-dim/30",
                        "focus:outline-none focus:ring-2 focus:ring-fire-orange/50 focus:border-fire-orange/50",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        error && "border-error/50 focus:ring-error/50",
                        className
                    )}
                    aria-invalid={error ? "true" : undefined}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-error" role="alert">
                        {error}
                    </p>
                )}
                {hint && !error && (
                    <p className="mt-1 text-xs text-white-dim">
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
