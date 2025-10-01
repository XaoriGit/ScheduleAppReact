import styles from "./clientTabRow.module.scss"

interface ClientTabRowProps {
    selected: number
    setSelected: (index: number) => void
}

export default function ClientTabRow({
    selected,
    setSelected,
}: ClientTabRowProps) {
    return (
        <div className={styles.tabs}>
            <button
                className={`${styles.tab} ${selected == 0 ? styles.active : ""}`}
                onClick={() => setSelected(0)}
            >
                Группа
            </button>
            <button
                className={`${styles.tab} ${selected == 1 ? styles.active : ""}`}
                onClick={() => setSelected(1)}
            >
                Преподаватель
            </button>
            <span
                className={styles.indicator}
                style={{
                    transform:
                        selected == 0 ? "translateX(0%)" : "translateX(100%)",
                }}
            />
        </div>
    )
}
