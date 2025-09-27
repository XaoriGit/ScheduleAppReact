import type { LessonDTO } from "@/api"
import styles from "./lesson.module.scss"

export const Lesson = ({ number, time, items }: LessonDTO) => {
    return (
        <ul className={styles.lesson}>
            {items.map((item, index) => (
                <article key={index}>
                    <div>
                        <span>{number} пара</span>
                        <time>{time}</time>
                    </div>
                    <h3>{item.title}</h3>
                    <div>
                        <div>
                            <span>{item.type}</span>
                            <span>{item.location}</span>
                        </div>
                        <span>{item.partner}</span>
                    </div>
                </article>
            ))}
        </ul>
    )
}
