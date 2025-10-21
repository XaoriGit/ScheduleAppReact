import { useToastStore } from "@/store/ToastStore"
import axios from "axios"
import { AxiosError } from "axios"

export function translateError(error: unknown): string {
    if (error instanceof AxiosError) {
        const status = error.response?.status

        switch (status) {
            case 400:
                return "Некорректный запрос"
            case 401:
                return "Не авторизован"
            case 403:
                return "Доступ запрещён"
            case 404:
                return "Не найдено"
            case 500:
                return "Внутренняя ошибка сервера"
            default:
                return "Ошибка сети или сервера"
        }
    }

    if (error instanceof Error) {
        return error.message
    }

    return "Неизвестная ошибка"
}

export const api = axios.create({
    timeout: 10000,
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error)
        const message = translateError(error)
        useToastStore.getState().addToast({ message, type: "error", duration: 60000 })
        return Promise.reject(error)
    },
)
