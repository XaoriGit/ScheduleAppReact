import styles from "./Button.module.scss"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger"
    size?: "small" | "medium" | "large"
}

const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "medium",
    ...props
}: ButtonProps) => {
    const buttonClass = `
    ${styles.button}
    ${styles[`button--${variant}`]}
    ${styles[`button--${size}`]}
    ${className}
  `.trim()

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    )
}

export default Button
