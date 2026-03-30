import { useSchedule } from "@/api"
import {
    BottomSheet,
    CircleLoader,
    Header,
    SchedulePager,
    useBottomSheet,
} from "@/components"
import { WeekDayRow } from "@/components/schedule/weekDayRow/weekDayRow"
import { useEffect, useState } from "react"
import styles from "./homePage.module.scss"
import SettingsSvg from "@/assets/ic_settings.svg?react"
import { useNavigate } from "react-router-dom"
import { ClientChoice } from "@/pages"
import { useClientStore } from "@/store/ClientStore"
import { translateError } from "@/api/axios.ts"

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!data) return
            if (e.key === "ArrowLeft" && !sheet.isOpen) {
                setSelectedIndex(i => Math.max(0, i - 1))
            }
            if (e.key === "ArrowRight" && !sheet.isOpen) {
                setSelectedIndex(i => Math.min(data.schedules.length - 1, i + 1))
            }

            if (e.key === "ArrowUp") {
                sheet.open()
            }
            if (e.key === "Escape") {
                sheet.close()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [data, sheet.isOpen])

    return (
        <>
            <div className={styles.main}>
                <Header
                    className={styles.header}
                    title="Расписание"
                    status={status}
                    text={
                        status == "error"
                            ? translateError(error)
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
                {error && <div className={styles.error}>
                    {translateError(error)}
                </div>}
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
