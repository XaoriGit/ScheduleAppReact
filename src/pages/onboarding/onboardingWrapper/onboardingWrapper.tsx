import { ChooseClientScreen } from "../chooseClientScreen/chooseClientScreen"
import { useNavigate } from "react-router-dom"
import { ClientChoice } from "@/pages/clientChoice/clientChoice"
import { useClientStore } from "@/store/ClientStore"
import { useBottomSheet } from "@/components/common/bottomSheet/useBottomSheet"
import { BottomSheet } from "@/components/common/bottomSheet/BottomSheet"

export interface OnboardingScreenProps {
    onNext: () => void
}

export const OnboardingWrapper = () => {
    const navigate = useNavigate()
    const sheet = useBottomSheet()
    const {
        passOnboarding,
        completedOnBoardingSteps,
        setCompletedOnBoardingSteps,
    } = useClientStore()

    return (
        <>
            {/* <div className={styles.progressContainer}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                />
            </div> */}
            <>
                {completedOnBoardingSteps === 0 && <>
                    <ChooseClientScreen
                        onNext={() => sheet.open()}
                    />
                    <BottomSheet
                        isOpen={sheet.isOpen}
                        onClose={sheet.close}
                        size="full"
                        draggable
                    >
                        <ClientChoice
                            callbackOnSelect={() => {
                                setCompletedOnBoardingSteps(1)
                                passOnboarding()
                                navigate("/")
                                sheet.close()
                            }}
                            showCancel={false}
                        />
                    </BottomSheet>
                    </>
                }
                {/*{completedOnBoardingSteps === 1 && (
                    
                )}
                 {currentStep === 2 && (
                    <AllowNotificationScreen
                        onNext={() => {
                            passOnboarding()
                            navigate("/")
                        }}
                    />
                )} */}
            </>
        </>
    )
}
