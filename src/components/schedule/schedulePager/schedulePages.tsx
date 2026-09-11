import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react"
import type { ScheduleDayDTO } from "@/api"
import { Lesson } from "../lesson/lesson"
import styles from "./schedulePager.module.scss"
import "swiper/swiper.css"
import { useEffect, useRef, useState } from "react"
import { ScheduleDayEmpty } from "@/components"
import { formatTimeUpdate } from "@/utils"
import { useToastStore } from "@/store"

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
	const [devCounter, setDevCounter] = useState(0);

	const incrementDevCounter = () => {
		setDevCounter((prev) => prev + 1)
	}

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(selectedIndex)
        }
	}, [selectedIndex])

	useEffect(() => {
		if (devCounter == 7) {
			useToastStore.getState().addToast({ message: "Вы стали разработчиком!", type: "info", duration: 2000 })
		} else if (devCounter > 4 && devCounter < 7) {
			useToastStore.getState().addToast({ message: `Осталось ${7 - devCounter} шагов до включения режима разработчика`, type: "info", duration: 2000 })
		} else if (devCounter > 7) {
			useToastStore.getState().addToast({ message: "Вы уже стали разработчиком!", type: "info", duration: 2000 })
		}

 }, [devCounter])

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
                            <>
                                {day.lessons.map((lesson, index) => (
                                    <Lesson
                                        key={index}
                                        number={lesson.number}
                                        time={lesson.time}
                                        items={lesson.items}
                                    />
                                ))}
                                <div className={styles.update}>
                                    Обновлено
                                    <span className={styles.update__date} onClick={incrementDevCounter}>
                                        {formatTimeUpdate(last_updated)}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <ScheduleDayEmpty />
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
