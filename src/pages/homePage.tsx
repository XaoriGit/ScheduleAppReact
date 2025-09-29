import { useSchedule } from "@/api"
import { Header, SchedulePager } from "@/components"
import { WeekDayRow } from "@/components/schedule/weekDayRow/weekDayRow"
import { useState } from "react"
import styles from "./homePage.module.scss"
import SettingsIcon from "@/assets/ic_settings.svg?react"

export const HomePage = () => {
    type HeaderStatus = "idle" | "loading" | "error" | "success"
    const { data, isLoading, error } = useSchedule("ИСР-32")
    const [selectedIndex, setSelectedIndex] = useState(0)

    const status: "error" | "loading" | "success" = error
        ? "error"
        : isLoading
          ? "loading"
          : "success"

    return (
        <div className={styles.main}>
            <Header
                title="Расписание"
                status={status}
                text={status == "error" ? error?.message : data?.client_name}
                rightContent={<SettingsIcon className="icon" />}
            />
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
            {error && <>ОШИБКА {error.message}</>}
        </div>
    )
}
