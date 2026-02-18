import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";

interface SelectOption {
    value: string;
    label: string;
    icon?: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, id, ...props }, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium text-white-muted mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={cn(
                            "w-full h-10 rounded-card bg-black-card border border-black-border",
                            "text-white font-body text-sm",
                            "px-3 pr-10 appearance-none",
                            "transition-colors duration-200",
                            "hover:border-white-dim/30",
                            "focus:outline-none focus:ring-2 focus:ring-fire-orange/50 focus:border-fire-orange/50",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            error && "border-error/50 focus:ring-error/50",
                            className
                        )}
                        aria-invalid={error ? "true" : undefined}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled className="text-white-dim bg-black-card">
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="bg-black-card text-white"
                            >
                                {option.icon ? `${option.icon} ${option.label}` : option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white-dim pointer-events-none"
                        aria-hidden="true"
                    />
                </div>
                {error && (
                    <p className="mt-1 text-xs text-error" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";

export { Select, type SelectProps, type SelectOption };
