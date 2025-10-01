import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface OnboardingStore {
    passedOnboarding: boolean
    passOnboarding: () => void
}

export const useOnboardingStore = create<OnboardingStore>()(
    persist(
        (set) => ({
            passedOnboarding: false,
            passOnboarding: () => {
                set((state) => ({ ...state, passedOnboarding: true }))
            },
        }),
        {
            name: "onboarding",
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
