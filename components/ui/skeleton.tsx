import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
    className?: string;
    variant?: "line" | "circle" | "card";
}

export function Skeleton({ className, variant = "line" }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-white/5 rounded-card",
                variant === "line" && "h-4 w-full",
                variant === "circle" && "h-10 w-10 rounded-full",
                variant === "card" && "h-32 w-full",
                className
            )}
            aria-hidden="true"
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-3">
                <Skeleton variant="circle" className="h-8 w-8" />
                <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <div className="flex gap-2 mt-2">
                <Skeleton className="h-5 w-16 rounded-pill" />
                <Skeleton className="h-5 w-20 rounded-pill" />
            </div>
        </div>
    );
}
