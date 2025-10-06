import { Button } from "@/components"
import type { OnboardingScreenProps } from "../onboardingWrapper/onboardingWrapper"
import { usePushNotifications } from "@/hooks/usePushNotifications"
import { useToastStore } from "@/store/ToastStore"

export const AllowNotificationScreen = ({ onNext }: OnboardingScreenProps) => {
    const { addToast } = useToastStore()
    const { isSupported, subscribeToPush, isSubscribed } =
        usePushNotifications()

    const handlePushPermission = async () => {
        try {
            await subscribeToPush()
            onNext()
        } catch (err) {
            console.error(err)
            if (err instanceof Error)
                addToast({ message: err.message, type: "error" })
        }
    }

    return (
        <div>
            <div>
                <div>
                    <div>🔔</div>
                    <h2>Оповещения</h2>
                    <p>Дай засирать тебе фид оповещений</p>
                    <div>
                        {isSupported ? (
                            <Button
                                disabled={isSubscribed}
                                onClick={handlePushPermission}
                            >
                                {!isSubscribed
                                    ? "Разрешить оповещения"
                                    : "Оповещения разрешены"}
                            </Button>
                        ) : (
                            <p>Ваш браузер не поддерживает оповещения</p>
                        )}
                        <Button onClick={onNext}>Пропустить</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
