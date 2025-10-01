import SuccessSvg from "@/assets/ic_success.svg?react"
import ErrorSvg from "@/assets/ic_error.svg?react"
import InfoSvg from "@/assets/ic_info.svg?react"
import WarningSvg from "@/assets/ic_warning.svg?react"
import CancelSvg from "@/assets/ic_cancel.svg?react"
import styles from "./toast.module.scss"
import { useToastStore } from "@/store/ToastStore"
import { useEffect } from "react"
import type { UUID } from "@/utils"

export interface ToastProps {
    id: UUID
    message: string
    type: "success" | "error" | "warning" | "info"
    duration?: number
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const iconMap = {
    success: <SuccessSvg className={styles.toast__icon} />,
    error: <ErrorSvg className={styles.toast__icon} />,
    info: <InfoSvg className={styles.toast__icon} />,
    warning: <WarningSvg className={styles.toast__icon} />,
}

const Toast = (toast: ToastProps) => {
    const removeToast = useToastStore((state) => state.removeToast)

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeout(() => removeToast(toast.id), 300)
        }, toast.duration)
        return () => clearTimeout(timer)
    }, [toast.id, toast.duration, removeToast])

    return (
        <div
            onClick={toast.onClick}
            className={`${styles.toast} ${styles[`toast--${toast.type}`]}`}
        >
            {iconMap[toast.type]}
            <p className={styles.toast__message}>{toast.message}</p>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    removeToast(toast.id)
                }}
                className={styles.toast__close}
            >
                <CancelSvg />
            </button>
        </div>
    )
}

export default Toast
