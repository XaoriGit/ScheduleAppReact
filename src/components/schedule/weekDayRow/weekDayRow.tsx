import type { ScheduleDayDTO } from "@/api"
import styles from "./weekDayRow.module.scss"
import { formatWeekDay } from "@/utils"
import { useEffect, useRef } from "react"

interface WeekDayRowProps {
    selectedIndex: number
    days: ScheduleDayDTO[]
    onDayClick: (index: number) => void
}

export const WeekDayRow = ({
    selectedIndex,
    days,
    onDayClick,
}: WeekDayRowProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current
            const activeTab = container.querySelector(
                `.${styles.tab_row__tab_active}`,
            ) as HTMLElement | null
            if (activeTab) {
                activeTab.scrollIntoView({
                    behavior: "smooth",
                    inline: "start", // можно 'nearest' или 'start'
                    block: "nearest",
                })
            }
        }
    }, [selectedIndex, styles.tab_row__tab_active])

    return (
        <div className={styles.tab_row} ref={containerRef}>
            {days.map((day, index) => {
                const isActive = index === selectedIndex
                const [week_day, dayNum] = formatWeekDay(
                    day.week_day,
                    day.date,
                    isActive,
                )

                return (
                    <button
                        key={day.date}
                        className={`${styles.tab_row__tab} ${
                            isActive ? styles.tab_row__tab_active : ""
                        }`}
                        onClick={() => onDayClick(index)}
                    >
                        {week_day}, <span>{dayNum}</span>
                    </button>
                )
            })}
        </div>
    )
}
