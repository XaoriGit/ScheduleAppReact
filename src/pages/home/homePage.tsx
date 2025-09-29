import { useSchedule } from "@/api"
import { Header, SchedulePager } from "@/components"
import { WeekDayRow } from "@/components/schedule/weekDayRow/weekDayRow"
import { useState } from "react"
import styles from "./homePage.module.scss"
import SettingsSvg from "@/assets/ic_settings.svg?react"
import { useNavigate } from "react-router-dom"

export const HomePage = () => {
    const { data, isLoading, error } = useSchedule("ИСР-32")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigate = useNavigate()

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
                text={status == "error" ? error?.message : `для ${data?.client_name}`}
                rightContent={<SettingsSvg className="icon" />}
                onRightContent={() => navigate("/settings")}
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
