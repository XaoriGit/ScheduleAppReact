import { useEffect } from "react"
import { useThemeStore } from "@/store"
import { Theme } from "./theme"

/**
 * Вешай один раз в корне приложения (App.tsx).
 * Добавляет data-theme="light" | "dark" на <html>,
 * CSS читает атрибут и применяет нужные переменные.
 */
export const useTheme = () => {
    const { theme } = useThemeStore()

    useEffect(() => {
        const root = document.documentElement

        if (theme === Theme.System) {
            root.removeAttribute("data-theme")
        } else {
            root.setAttribute("data-theme", theme)
        }
    }, [theme])
}