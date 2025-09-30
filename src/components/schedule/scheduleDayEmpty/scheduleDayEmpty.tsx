import styles from "./scheduleDayEmpty.module.scss"

export const ScheduleDayEmpty = () => {
    return <div className={styles.empty}>
        <div className={styles.empty__image}>{"(>_<)"}</div>
        <div>
            <h2 className={styles.empty__head}>Расписания пока нет</h2>
            <p className={styles.empty__info}>Попробуйте позже</p>
        </div>
    </div>
}
