import { useClients } from "@/api"
import styles from "./settingsPages.module.scss"
import { FilledTextField, Header } from "@/components"
import CancelSvg from "@/assets/ic_cancel.svg?react"
import { useNavigate } from "react-router-dom"
import ClientTabRow from "@/components/schedule/clientTabRow/clientTabRow"
import { useState } from "react"

export const SettingsPage = () => {
    const navigate = useNavigate()
    const { data, isLoading, error } = useClients()
    const [value, setValue] = useState("")

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
                text={status == "error" ? error?.message : "Выбор расписания"}
                rightContent={<CancelSvg className="icon" />}
                onRightContent={() => navigate("/")}
            />
            <ClientTabRow />
            <FilledTextField
                label="Введите группу или фамилию"
                value={value}
                onChange={setValue}
            />
        </div>
    )
}
