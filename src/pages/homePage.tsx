import { useSchedule } from "@/api"
import { Header, SchedulePager } from "@/components"
import { WeekDayRow } from "@/components/schedule/weekDayRow/weekDayRow"
import { useState } from "react"
import styles from "./homePage.module.scss"

export const HomePage = () => {
    const { data, isLoading, error } = useSchedule("ИСР-32")
    const [selectedIndex, setSelectedIndex] = useState(0)

    if (error) {
        return <>ОШИБКА {error.message}</>
    }

    return (
        <div className={styles.main}>
            <Header title="Расписание" />
            {isLoading ? (
                "Загрузка..."
            ) : (
                <>
                    <WeekDayRow
                        days={data!.schedules}
                        selectedIndex={selectedIndex}
                        onDayClick={(index) => setSelectedIndex(index)}
                    />
                    <SchedulePager
                        days={data!.schedules}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                </>
            )}

            {/* список раписания */}
        </div>
    )
}
