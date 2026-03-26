import { useSchedule } from "@/api"
import {
    BottomSheet,
    CircleLoader,
    Header,
    SchedulePager,
    useBottomSheet,
} from "@/components"
import { WeekDayRow } from "@/components/schedule/weekDayRow/weekDayRow"
import { useState } from "react"
import styles from "./homePage.module.scss"
import SettingsSvg from "@/assets/ic_settings.svg?react"
import { useNavigate } from "react-router-dom"
import { ClientChoice } from "../clientChoice/clientChoice"
import { useClientStore } from "@/store/ClientStore"

export const HomePage = () => {
    const { selectedClient } = useClientStore()
    const { data, isLoading, error } = useSchedule(selectedClient)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const sheet = useBottomSheet()
    const navigate = useNavigate()

    const status: "error" | "loading" | "success" = error
        ? "error"
        : isLoading
          ? "loading"
          : "success"

    return (
        <>
            <div className={styles.main}>
                <Header
                    className={styles.header}
                    title="Расписание"
                    status={status}
                    text={
                        status == "error"
                            ? error?.message
                            : `для ${data?.client_name}`
                    }
                    rightContent={<SettingsSvg className="icon" />}
                    onTextClick={sheet.open}
                    onRightContent={() => navigate("/settings")}
                />
                {isLoading ? (
                    <CircleLoader />
                ) : (
                    data && (
                        <>
                            <WeekDayRow
                                days={data.schedules}
                                selectedIndex={selectedIndex}
                                onDayClick={(index) => setSelectedIndex(index)}
                            />
                            <SchedulePager
                                days={data.schedules}
                                last_updated={data!.last_update}
                                selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                            />
                        </>
                    )
                )}
                {error && <>ОШИБКА {error.message}</>}
            </div>
            <BottomSheet
                isOpen={sheet.isOpen}
                onClose={sheet.close}
                size="full"
                draggable
            >
                <ClientChoice callbackOnSelect={() => {
                    sheet.close()
                }} />
            </BottomSheet>
        </>
    )
}
