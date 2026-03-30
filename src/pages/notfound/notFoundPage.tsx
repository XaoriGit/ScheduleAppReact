import { useNavigate } from "react-router-dom"
import styles from "./notFoundPage.module.scss"

export const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.page}>
            <span className={styles.code}>404</span>
            <h1 className={styles.title}>Страница не найдена</h1>
            <p className={styles.subtitle}>
                Такой страницы не существует или она была удалена
            </p>
            <button className={styles.button} onClick={() => navigate("/")}>
                На главную
            </button>
        </div>
    )
}