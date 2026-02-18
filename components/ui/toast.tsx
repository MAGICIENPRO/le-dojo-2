"use client";

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastData {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

const icons: Record<ToastType, ReactNode> = {
    success: <CheckCircle className="h-4 w-4 text-success" />,
    error: <AlertCircle className="h-4 w-4 text-error" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning" />,
    info: <Info className="h-4 w-4 text-info" />,
};

const borderColors: Record<ToastType, string> = {
    success: "border-l-success",
    error: "border-l-error",
    warning: "border-l-warning",
    info: "border-l-info",
};

// --- Toast Item ---
function ToastItem({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onDismiss(toast.id);
        }, toast.duration || 4000);
        return () => clearTimeout(timeout);
    }, [toast, onDismiss]);

    return (
        <div
            className={cn(
                "glass-card px-4 py-3 flex items-start gap-3",
                "border-l-2 animate-slide-up",
                "shadow-card min-w-[280px] max-w-[400px]",
                borderColors[toast.type]
            )}
            role="alert"
        >
            <span className="flex-shrink-0 mt-0.5">{icons[toast.type]}</span>
            <p className="text-sm text-white flex-1">{toast.message}</p>
            <button
                onClick={() => onDismiss(toast.id)}
                className="flex-shrink-0 text-white-dim hover:text-white transition-colors"
                aria-label="Fermer"
            >
                <X className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}

// --- Toast Container ---
export function ToastContainer({ toasts, onDismiss }: { toasts: ToastData[]; onDismiss: (id: string) => void }) {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

// --- Hook ---
export function useToast() {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setToasts((prev) => [...prev, { id, type, message, duration }]);
    }, []);

    const dismissToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return {
        toasts,
        addToast,
        dismissToast,
        success: (msg: string) => addToast("success", msg),
        error: (msg: string) => addToast("error", msg),
        warning: (msg: string) => addToast("warning", msg),
        info: (msg: string) => addToast("info", msg),
    };
}

export type { ToastData, ToastType };
