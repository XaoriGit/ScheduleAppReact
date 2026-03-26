import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { Theme } from "./theme.ts"

interface ThemeStore {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: Theme.System,
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: "theme",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)