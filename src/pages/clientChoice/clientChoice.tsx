import { useClients } from "@/api"
import styles from "./clientChoice.module.scss"
import { CircleLoader, FilledTextField } from "@/components"
import { useNavigate } from "react-router-dom"
import ClientTabRow from "@/components/schedule/clientTabRow/clientTabRow"
import { useEffect, useRef, useState } from "react"
import { useClientStore } from "@/store/ClientStore"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"

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
    const swiperRef = useRef<SwiperType | null>(null)

    const isSearching = value.trim().length > 0

    const filteredGroups = data
        ? data.groups.filter((g) =>
            g.toLowerCase().includes(value.trim().toLowerCase()),
        )
        : []

    const filteredTeachers = data
        ? data.teachers.filter((t) =>
            t.toLowerCase().includes(value.trim().toLowerCase()),
        )
        : []

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeList = isSearching
        ? [...filteredGroups, ...filteredTeachers]
        : selectedClientTab === 0
            ? filteredGroups
            : filteredTeachers

    const itemRefs = useRef<(HTMLLIElement | null)[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        itemRefs.current = []
    }, [selectedClientTab, value])

    useEffect(() => {
        if (swiperRef.current && !isSearching) {
            swiperRef.current.slideTo(selectedClientTab)
        }
    }, [selectedClientTab, isSearching])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!data) return
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                inputRef.current?.focus()
                return
            }
            if (e.key === "ArrowLeft" && !isSearching) {
                setSelectedClientTab(0)
            }
            if (e.key === "ArrowRight" && !isSearching) {
                setSelectedClientTab(1)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [data, activeList, isSearching])

    const handleSelect = (item: string) => {
        setSelectedClient(item)
        if (callbackOnSelect) {
            callbackOnSelect()
        } else {
            navigate("/")
        }
    }

    const renderList = (list: string[], indexOffset = 0) => {
        if (list.length === 0) {
            return (
                <div className={styles.client_list_empty}>
                    Ничего не найдено
                </div>
            )
        }
        return list.map((item, idx) => {
            const globalIndex = indexOffset + idx
            return (
                <li
                    ref={(el) => {
                        itemRefs.current[globalIndex] = el
                    }}
                    className={`${styles.client_list__item}`}
                    onClick={() => handleSelect(item)}
                    key={item}
                >
                    {item}
                </li>
            )
        })
    }

    return (
        <div className={styles.main}>
            <ClientTabRow
                selected={selectedClientTab}
                setSelected={(index) => {
                    setSelectedClientTab(index)
                    swiperRef.current?.slideTo(index)
                }}
            />
            <FilledTextField
                ref={inputRef}
                label="Введите группу или фамилию"
                value={value}
                onChange={setValue}
            />
            {isLoading ? (
                <CircleLoader />
            ) : isSearching ? (
                <ul className={styles.client_list}>
                    {renderList(activeList)}
                </ul>
            ) : (
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    onSlideChange={(swiper) => {
                        setSelectedClientTab(swiper.activeIndex)
                    }}
                    initialSlide={selectedClientTab}
                    className={styles.swiper}
                >
                    <SwiperSlide>
                        <ul className={styles.client_list}>
                            {renderList(filteredGroups, 0)}
                        </ul>
                    </SwiperSlide>
                    <SwiperSlide>
                        <ul className={styles.client_list}>
                            {renderList(filteredTeachers, 0)}
                        </ul>
                    </SwiperSlide>
                </Swiper>
            )}
        </div>
    )
}