import { useState, type FocusEvent } from "react"
import styles from "./filledTextField.module.scss"

interface FilledTextFieldProps {
    label: string
    value: string
    onChange: (value: string) => void
    type?: string
}

export const FilledTextField = ({
    label,
    value,
    onChange,
    type = "text",
}: FilledTextFieldProps) => {
    const [focused, setFocused] = useState(false)

    const handleFocus = (_e: FocusEvent<HTMLInputElement>) => setFocused(true)
    const handleBlur = (_e: FocusEvent<HTMLInputElement>) => setFocused(false)

    return (
        <div
            className={`${styles.field} ${focused || value ? styles.active : ""}`}
        >
            <label className={styles.label}>{label}</label>
            <input
                className={styles.input}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    )
}
