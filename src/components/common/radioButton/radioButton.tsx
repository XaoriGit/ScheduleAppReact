import styles from "./radioButton.module.scss"

interface RadioButtonProps {
    selected: boolean
    onClick: () => void
}

export const RadioButton = ({ selected, onClick }: RadioButtonProps) => {
    return (
        <div
            className={`${styles.radio} ${selected ? styles.selected : ""}`}
            onClick={onClick}
            role="radio"
            aria-checked={selected}
        >
            {selected && <span className={styles.dot} />}
        </div>
    )
}