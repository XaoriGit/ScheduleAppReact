import type { OnboardingScreenProps } from "../onboardingWrapper/onboardingWrapper"
import EducationSvg from "@/assets/ic_education.svg?react"
import styles from "./chooseClientScreen.module.scss"
import { Button } from "@/components"

export const ChooseClientScreen = ({ onNext }: OnboardingScreenProps) => {
    return (
        <>
            <EducationSvg className={styles.education} />
            <div>
                <h2 className={styles.heading}>Добро пожаловать!</h2>
                <p className={styles.info}>Сначала нужно сделать важный выбор</p>
            </div>
            <Button size="small" onClick={onNext}>Выбрать расписание</Button>
        </>
    )
}
