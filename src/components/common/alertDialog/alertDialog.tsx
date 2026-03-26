import { type ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./alertDialog.module.scss"

interface AlertDialogProps {
    isOpen: boolean
    onDismiss: () => void
    title?: string
    content?: ReactNode
    confirmButton?: ReactNode
    dismissButton?: ReactNode
}

export const AlertDialog = ({
    isOpen,
    onDismiss,
    title,
    content,
    confirmButton,
    dismissButton,
}: AlertDialogProps) => {
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setMounted(true)
            const timer = setTimeout(() => setVisible(true), 16)
            return () => clearTimeout(timer)
        } else {
            setVisible(false)
            const timer = setTimeout(() => setMounted(false), 250)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!mounted) return null

    return createPortal(
        <div className={`${styles.root} ${visible ? styles.visible : ""}`}>
            <div
                className={styles.scrim}
                onClick={onDismiss}
                aria-hidden="true"
            />

            <div
                className={styles.dialog}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={title ? "dialog-title" : undefined}
                aria-describedby="dialog-text"
            >
                {title && (
                    <h2 id="dialog-title" className={styles.title}>
                        {title}
                    </h2>
                )}

                {content && (
                    <div id="dialog-text" className={styles.text}>
                        {content}
                    </div>
                )}

                {(confirmButton || dismissButton) && (
                    <div className={styles.actions}>
                        {dismissButton}
                        {confirmButton}
                    </div>
                )}
            </div>
        </div>,
        document.body,
    )
}
