import type { LessonDTO } from "@/api"
import styles from "./lesson.module.scss"

export const Lesson = ({ number, time, items }: LessonDTO) => {
    return (
        <ul className={styles.lesson}>
            {items.map((item, index) => (
                <>
                    <article key={index} className={styles.lesson__item}>
                        <div className={styles.lesson__header}>
                            <span>{number} пара</span>
                            <time>{time}</time>
                        </div>
                        <h3 className={styles.lesson__title}>{item.title}</h3>
                        <div className={styles.lesson__details}>
                            <div className={styles["lesson__details-group"]}>
                                <span
                                    className={styles.lesson__details__primary}
                                >
                                    {item.type}
                                </span>
                                {item.location && (
                                    <span
                                        className={
                                            styles.lesson__details__secondary
                                        }
                                    >
                                        {item.location}
                                    </span>
                                )}
                            </div>
                            <span className={styles.lesson__details__primary}>
                                {item.partner}
                            </span>
                        </div>
                    </article>
                    {items.length > 1 && index == 0 && (
                        <div className={styles.lesson__divider}/>
                    )}
                </>
            ))}
        </ul>
    )
}
