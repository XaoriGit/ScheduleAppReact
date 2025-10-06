import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react"
import type { ScheduleDayDTO } from "@/api"
import { Lesson } from "../lesson/lesson"
import styles from "./schedulePager.module.scss"
import "swiper/swiper.css"
import { useEffect, useRef } from "react"
import { ScheduleDayEmpty } from "@/components"
import { formatTimeUpdate } from "@/utils"

interface SchedulePagerProps {
    days: ScheduleDayDTO[]
    last_updated: string
    selectedIndex: number
    setSelectedIndex: (index: number) => void
}

export const SchedulePager = ({
    days,
    last_updated,
    selectedIndex,
    setSelectedIndex,
}: SchedulePagerProps) => {
    const swiperRef = useRef<null | SwiperRef>(null)

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(selectedIndex)
        }
    }, [selectedIndex])

    return (
        <Swiper
            modules={[Pagination]}
            // spaceBetween={16}
            onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
            initialSlide={selectedIndex}
            ref={swiperRef}
            pagination={{ clickable: true }}
        >
            {days.map((day, index) => (
                <SwiperSlide key={index}>
                    <div className={styles.schedule_list}>
                        {day.lessons.length > 0 ? (
                            day.lessons.map((lesson, index) => (
                                <>
                                    <Lesson
                                        key={index}
                                        number={lesson.number}
                                        time={lesson.time}
                                        items={lesson.items}
                                    />
                                    {index == day.lessons.length - 1 && (
                                        <div className={styles.update}>
                                            Обновлено
                                            <span
                                                className={styles.update__date}
                                            >
                                                {formatTimeUpdate(last_updated)}
                                            </span>
                                        </div>
                                    )}
                                </>
                            ))
                        ) : (
                            <ScheduleDayEmpty />
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
