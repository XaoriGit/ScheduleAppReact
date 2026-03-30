import { useClients } from "@/api"
import styles from "./clientChoice.module.scss"
import { CircleLoader, FilledTextField } from "@/components"
import { useNavigate } from "react-router-dom"
import ClientTabRow from "@/components/schedule/clientTabRow/clientTabRow"
import { useEffect, useMemo, useRef, useState } from "react"
import { useClientStore } from "@/store/ClientStore"

interface ClientChoiceProps {
    callbackOnSelect?: () => void
    showCancel?: boolean
}

export const ClientChoice = ({ callbackOnSelect }: ClientChoiceProps) => {
    const navigate = useNavigate()
    const { data, isLoading } = useClients()
    const [value, setValue] = useState("")
    const [selectedClientTab, setSelectedClientTab] = useState(0)
    const { setSelectedClient } = useClientStore()

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

    const itemRefs = useRef<(HTMLLIElement | null)[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const [hoveredIndex, setHoveredIndex] = useState<number>(-1)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!data) return
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                inputRef.current?.focus()
                return
            }
            if (e.key === "ArrowLeft") {
                setSelectedClientTab(0)
                setHoveredIndex(-1)
            }
            if (e.key === "ArrowRight") {
                setSelectedClientTab(1)
                setHoveredIndex(-1)
            }
            if (e.key === "ArrowDown") {
                e.preventDefault()
                setHoveredIndex(i => Math.min(filteredList.length - 1, i + 1))
            }
            if (e.key === "ArrowUp") {
                e.preventDefault()
                setHoveredIndex(i => Math.max(0, i - 1))
            }
            if (e.key === "Enter" && hoveredIndex >= 0) {
                const item = filteredList[hoveredIndex]
                setSelectedClient(item)
                if (callbackOnSelect) {
                    callbackOnSelect()
                } else {
                    navigate("/")
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [data, filteredList, hoveredIndex])

    useEffect(() => {
        if (hoveredIndex >= 0 && itemRefs.current[hoveredIndex]) {
            itemRefs.current[hoveredIndex]!.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            })
        }
    }, [hoveredIndex])

    return (
        <div className={styles.main}>
            <ClientTabRow
                selected={selectedClientTab}
                setSelected={(index) => setSelectedClientTab(index)}
            />
            <FilledTextField
                ref={inputRef}
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
                                ref={el => itemRefs.current[index] = el}
                                className={`${styles.client_list__item} ${hoveredIndex === index ? styles.client_list__item_hovered : ""}`}
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
