import { useState } from "react"
import { AllowNotificationScreen } from "../allowNotificationScreen/allowNotificationScreen"
import { ChooseClientScreen } from "../chooseClientScreen/chooseClientScreen"
import { useNavigate } from "react-router-dom"
import { SettingsPage } from "@/pages/settings/settingsPage"
import { useOnboardingStore } from "@/store/OnboardingStore"

export interface OnboardingScreenProps {
    onNext: () => void
}

export const OnboardingWrapper = () => {
    const navigate = useNavigate()
    const { passOnboarding } = useOnboardingStore()
    const [currentStep, setCurrentStep] = useState(0)

    const totalSteps = 2
    const progress = ((currentStep + 1) / totalSteps) * 100

    return (
        <div>
            <div>
                <div style={{ width: `${progress}%` }} />
            </div>
            <div>
                {currentStep === 0 && (
                    <ChooseClientScreen
                        onNext={() => setCurrentStep((v) => v + 1)}
                    />
                )}
                {currentStep === 1 && (
                    <SettingsPage
                        callbackOnSelect={() => setCurrentStep((v) => v + 1)}
                    />
                )}
                {currentStep === 2 && (
                    <AllowNotificationScreen
                        onNext={() => {
                            passOnboarding()
                            navigate("/")
                        }}
                    />
                )}
            </div>
        </div>
    )
}
