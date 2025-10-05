import { Button } from "@/components"
import type { OnboardingScreenProps } from "../onboardingWrapper/onboardingWrapper"
import { useState } from "react"

export const AllowNotificationScreen = ({ onNext }: OnboardingScreenProps) => {
    const [permission, setPermission] = useState(Notification.permission)

    const requestPermission = async () => {
        const permission = await Notification.requestPermission()
        setPermission(permission)
    }

    return (
        <div>
            <div>
                <div>
                    <div>🔔</div>
                    <h2>Оповещения</h2>
                    <p>Дай засирать тебе фид оповещений</p>
                    <div>
                        {permission === "denied" ? (
                            <p>Вам необходимо сбросить настройки оповещений</p>
                        ) : (
                            <Button
                                disabled={permission === "granted"}
                                onClick={requestPermission}
                            >
                                {permission === "granted"
                                    ? "Оповещения включены"
                                    : "Разрешить оповещения"}
                            </Button>
                        )}
                        <Button onClick={onNext}>
                            {permission === "granted"
                                ? "Продолжить"
                                : "Пропустить"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
