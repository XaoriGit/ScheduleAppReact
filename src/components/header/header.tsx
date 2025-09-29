import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import styles from "./header.module.scss"

interface HeaderProps {
    title: string
    text?: string
    status: "loading" | "error" | "success"
    rightContent?: ReactNode
}

export const Header = ({ title, text, status, rightContent }: HeaderProps) => {
    const [displayedStatus, setDisplayedStatus] = useState(status)
    const [animating, setAnimating] = useState(false)

    useEffect(() => {
        if (status !== displayedStatus) {
            setAnimating(true)
            const timeout = setTimeout(() => {
                setDisplayedStatus(status)
                setAnimating(false)
            }, 150)
            return () => clearTimeout(timeout)
        }
    }, [status, displayedStatus])

    const renderText = () => {
        switch (displayedStatus) {
            case "loading":
                return <p className={styles.header_loading}>Загрузка...</p>
            case "error":
                return <p className={styles.header_error}>{text}</p>
            case "success":
                return <p className={styles.header_success}>для {text}</p>
        }
    }

    return (
        <header>
            <div className={styles.header}>
                <div className={styles.header__info}>
                    <h1>{title}</h1>
                    <div
                        className={`${styles.header__textWrapper} ${
                            animating ? styles.fadeOut : styles.fadeIn
                        }`}
                    >
                        {renderText()}
                    </div>
                </div>
                {rightContent && (
                    <button className={styles.header__left_content}>
                        {rightContent}
                    </button>
                )}
            </div>
        </header>
    )
}
