import { useState } from "react"
import styles from "./clientTabRow.module.scss"

export default function ClientTabRow() {
    const [active, setActive] = useState<"group" | "teacher">("group")

    return (
        <div className={styles.tabs}>
            <button
                className={`${styles.tab} ${active === "group" ? styles.active : ""}`}
                onClick={() => setActive("group")}
            >
                Группа
            </button>
            <button
                className={`${styles.tab} ${active === "teacher" ? styles.active : ""}`}
                onClick={() => setActive("teacher")}
            >
                Преподаватель
            </button>
            <span
                className={styles.indicator}
                style={{
                    transform:
                        active === "group"
                            ? "translateX(0%)"
                            : "translateX(100%)",
                }}
            />
        </div>
    )
}
