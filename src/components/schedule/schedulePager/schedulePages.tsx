import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { ScheduleDayDTO } from "@/api"
import { Lesson } from "../lesson/lesson"
import styles from "./schedulePager.module.scss"
import "swiper/css"
import "swiper/css/pagination"

interface SchedulePagerProps {
    days: ScheduleDayDTO[]
}

export const SchedulePager = ({ days }: SchedulePagerProps) => {
    return (
        <Swiper modules={[Pagination]}>
            {days.map((day) => (
                <SwiperSlide>
                    <div className={styles.schedule_list}>
                        {day.lessons.map((lesson) => (
                            <Lesson
                                number={lesson.number}
                                time={lesson.time}
                                items={lesson.items}
                            />
                        ))}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
