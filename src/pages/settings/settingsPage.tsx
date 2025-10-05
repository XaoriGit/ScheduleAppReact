import { useClients } from "@/api"
import styles from "./settingsPages.module.scss"
import { CircleLoader, FilledTextField, Header } from "@/components"
import CancelSvg from "@/assets/ic_cancel.svg?react"
import { useNavigate } from "react-router-dom"
import ClientTabRow from "@/components/schedule/clientTabRow/clientTabRow"
import { useMemo, useState } from "react"
import { useLocalStorage } from "@/hooks"

interface SettingsPageProps {
    callbackOnSelect?: () => void
    showCancel?: boolean  
}

export const SettingsPage = ({ callbackOnSelect, showCancel = true }: SettingsPageProps) => {
    const navigate = useNavigate()
    const { data, isLoading, error } = useClients()
    const [value, setValue] = useState("")
    const [selectedClientTab, setSelectedClientTab] = useState(0)
    const [_, setSelectedClient] = useLocalStorage<string | null>(
        "client",
        null,
    )

    const status: "error" | "loading" | "success" = error
        ? "error"
        : isLoading
          ? "loading"
          : "success"

    const filteredList = useMemo(() => {
        if (!data) return []

        const query = value.trim().toLowerCase()

        if (query.length > 0) {
            const groups = data.groups.filter((g) =>
                g.toLowerCase().includes(query),
            )
            const teachers = data.teachers.filter((t) =>
                t.toLowerCase().includes(query),
            )
            return [...groups, ...teachers]
        } else {
            return selectedClientTab === 0 ? data.groups : data.teachers
        }
    }, [data, value, selectedClientTab])

    return (
        <div className={styles.main}>
            <Header
                title="Расписание"
                status={status}
                text={status == "error" ? error?.message : "Выбор расписания"}
                rightContent={showCancel && <CancelSvg className="icon" />}
                onRightContent={() => navigate("/")}
            />
            <ClientTabRow
                selected={selectedClientTab}
                setSelected={(index) => setSelectedClientTab(index)}
            />
            <FilledTextField
                label="Введите группу или фамилию"
                value={value}
                onChange={setValue}
            />
            {isLoading ? (
                <CircleLoader />
            ) : (
                <ul className={styles.client_list}>
                    {filteredList.length > 0 ? (
                        filteredList.map((item, index) => (
                            <li
                                className={styles.client_list__item}
                                onClick={() => {
                                    setSelectedClient(item)
                                    if (callbackOnSelect) {
                                        callbackOnSelect()
                                    } else {
                                        navigate("/")
                                    }
                                }}
                                key={index}
                            >
                                {item}
                            </li>
                        ))
                    ) : (
                        <div className={styles.client_list_empty}>
                            Ничего не найдено
                        </div>
                    )}
                </ul>
            )}
        </div>
    )
}
