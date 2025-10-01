import Button from "@/components/button/button"
import type { OnboardingScreenProps } from "../onboardingWrapper/onboardingWrapper"

export const ChooseClientScreen = ({ onNext }: OnboardingScreenProps) => {
    return (
        <div>
            <div>
                <div>
                    <h2>Добро пожаловать!</h2>
                    <p>Сначала нужно сделать важный выбор</p>
                    <Button onClick={onNext}>Выбрать расписание</Button>
                </div>
            </div>
        </div>
    )
}
