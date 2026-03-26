import { useClients } from "@/api"
import styles from "./clientChoice.module.scss"
import { CircleLoader, FilledTextField } from "@/components"
import { useNavigate } from "react-router-dom"
import ClientTabRow from "@/components/schedule/clientTabRow/clientTabRow"
import { useState } from "react"
import { useClientStore } from "@/store/ClientStore"

interface SettingsPageProps {
    callbackOnSelect?: () => void
    showCancel?: boolean  
}

export const SettingsPage = ({ }: SettingsPageProps) => {
    return (
        <div className={styles.main}>
            
        </div>
    )
}
