import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialMode: ThemeMode = prefersDark ? "dark" : "light";

  return {
    mode: initialMode,
    toggleTheme: () =>
      set((state) => ({
        mode: state.mode === "light" ? "dark" : "light",
      })),
    setTheme: (mode) => set({ mode }),
  };
});
