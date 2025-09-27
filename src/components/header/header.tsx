import type { ReactNode } from "react"
import styles from "./header.module.scss"

interface HeaderProps {
    title: string
    leftContent?: ReactNode
}

export const Header = ({ title, leftContent }: HeaderProps) => {
    return (
        <header>
            <div className={styles.header}>
                <div className={styles.header__info}>
                    <h1>{title}</h1>
                    <p>Загрузка...</p>
                </div>
                <div className={styles.header__left_content}>{leftContent}</div>
            </div>
        </header>
    )
}
