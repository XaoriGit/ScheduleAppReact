import SuccessSvg from "@/assets/ic_success.svg?react"
import ErrorSvg from "@/assets/ic_error.svg?react"
import InfoSvg from "@/assets/ic_info.svg?react"
import WarningSvg from "@/assets/ic_warning.svg?react"
import CancelSvg from "@/assets/ic_cancel.svg?react"
import styles from "./toast.module.scss"
import { useToastStore } from "@/store/ToastStore"
import { useEffect, useState } from "react"

export interface ToastProps {
    id: string
    message: string
    type: "success" | "error" | "info"
    duration?: number
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const iconMap = {
    success: <SuccessSvg className={styles.toast_success__icon} />,
    error: <ErrorSvg className={styles.toast_error__icon} />,
    info: <InfoSvg className={styles.toast_info__icon} />,
    warning: <WarningSvg className={styles.toast_warning__icon} />,
}

export const toastThemeVars = {
    success: {
        bg: "var(--inverse-surface)",
        color: "var(--inverse-primary)",
        icon: "var(--inverse-primary)",
    },
    error: {
        bg: "var(--error)",
        color: "var(--on-error)",
        icon: "var(--error)",
    },
    info: {
        bg: "var(--inverse-surface)",
        color: "var(--on-secondary)",
        icon: "var(--secondary)",
    },
} as const

const Toast = (toast: ToastProps) => {
    const removeToast = useToastStore((state) => state.removeToast)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true))

        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => removeToast(toast.id), 300)
        }, toast.duration)

        return () => clearTimeout(timer)
    }, [toast.id, toast.duration, removeToast])

    return (
        <>
            <div
                style={{
                    backgroundColor: toastThemeVars[toast.type].bg,
                    color: toastThemeVars[toast.type].color,
                }}
                className={`${styles.toast} ${
                    isVisible ? styles["toast--enter"] : styles["toast--exit"]
                }`}
            >
                {iconMap[toast.type]}
                <p className={styles.toast__message}>{toast.message}</p>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsVisible(false)
                        setTimeout(() => removeToast(toast.id), 300)
                    }}
                    className={styles.toast__close}
                >
                    <CancelSvg />
                </button>
            </div>
        </>
    )
}

export default Toast
