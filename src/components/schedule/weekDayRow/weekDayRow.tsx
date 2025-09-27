import type { ScheduleDayDTO } from "@/api"
import styles from "./weekDayRow.module.scss"
import { formatWeekDay } from "@/utils"

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
    return (
        <div className={styles.tab_row}>
            {days.map((day, index) => {
                const isActive = index === selectedIndex
                const label = formatWeekDay(day.week_day, day.date, isActive)

                return (
                    <button
                        key={day.date}
                        className={`${styles.tab_row__tab} ${
                            isActive ? styles.tab_row__tab_active : ""
                        }`}
                        onClick={() => onDayClick(index)}
                    >
                        {label}
                    </button>
                )
            })}
        </div>
    )
}
