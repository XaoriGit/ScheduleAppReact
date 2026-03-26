import type { ReactNode } from "react"
import styles from "./settingsItem.module.scss"

interface SettingsItemProps {
    leftContent?: ReactNode
    title: string
    description: string
    rightContent?: ReactNode
    onClick?: () => void
}

export const SettingsItem = ({
    leftContent,
    title,
    description,
    rightContent,
    onClick,
}: SettingsItemProps) => {
    return (
        <div
            className={`${styles.container} ${onClick ? styles.clickable : ""}`}
            onClick={onClick}
        >
            {leftContent && (
                <div className={styles.leftContent}>{leftContent}</div>
            )}

            <div className={styles.info}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
            </div>

            {rightContent && (
                <div className={styles.rightContent}>{rightContent}</div>
            )}
        </div>
    )
}
