import type { ToastProps } from "@/components/toast/toast"
import { create } from "zustand"

interface ToastStore {
    toasts: ToastProps[]
    addToast: (toast: Omit<ToastProps, "id">) => void
    removeToast: (id: string) => void
    clearAll: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        set((state) => ({
            toasts: [
                ...state.toasts,
                {
                    id: crypto.randomUUID(),
                    duration: toast.duration || 4000,
                    ...toast,
                },
            ],
        }))
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
    clearAll: () => set({ toasts: [] }),
}))
