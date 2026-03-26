import styles from "./settingsPage.module.scss"
import ArrowBackSvg from "@/assets/ic_arrow_back.svg?react"
import PaletteSvg from "@/assets/ic_palette.svg?react"
import {
    AlertDialog,
    BottomSheet, RadioButton,
    SettingsItem,
    useAlertDialog,
    useBottomSheet
} from "@/components"
import { ClientChoice } from "@/pages"
import { useNavigate } from "react-router-dom"
import { APP_THEME_LABELS, Theme, useThemeStore } from "@/store"

export const SettingsPage = () => {
    const sheet = useBottomSheet()
    const dialog = useAlertDialog()
    const navigate = useNavigate()

    const { theme, setTheme } = useThemeStore()

    const handleSelect = (item: Theme) => {
        setTheme(item)
        dialog.close()
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.header} onClick={() => window.history.back()}>
                    <ArrowBackSvg
                        className="icon__primary"
                    />
                    <h1>Настройки</h1>
                </div>
                <div className={styles.content}>
                    <SettingsItem
                        leftContent={<PaletteSvg className="icon__secondary" />}
                        title={"Тема приложения"}
                        description={APP_THEME_LABELS[theme]}
                        onClick={dialog.open}
                    />
                    <hr className={styles.content__line} />
                    <SettingsItem
                        title={"Расписание"}
                        description={"Здесь можно выбрать расписание"}
                        onClick={sheet.open}
                    />
                </div>
            </div>
            <AlertDialog
                title={"Тема"}
                isOpen={dialog.isOpen}
                onDismiss={dialog.close}
                dismissButton={<button className={styles.alert__button} onClick={dialog.close}>Отмена</button>}
                content={
                    <div className={styles.list}>
                        {Object.values(Theme).map((item) => (
                            <div
                                key={item}
                                className={styles.row}
                                onClick={() => handleSelect(item)}
                            >
                                <RadioButton
                                    selected={theme === item}
                                    onClick={() => handleSelect(item)}
                                />
                                <span className={styles.label}>
                                {APP_THEME_LABELS[item]}
                            </span>
                            </div>
                        ))}
                    </div>
                }
            />
            <BottomSheet
                isOpen={sheet.isOpen}
                onClose={sheet.close}
                size="full"
                draggable
            >
                <ClientChoice
                    callbackOnSelect={() => {
                        sheet.close()
                        navigate("/")
                    }}
                />
            </BottomSheet>
        </>
    )
}
