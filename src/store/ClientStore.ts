import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ClientStore {
    selectedClient: string
    setSelectedClient: (client: string) => void
    completedOnBoardingSteps: number
    setCompletedOnBoardingSteps: (step: number) => void
    passedOnboarding: boolean
    passOnboarding: () => void
}

export const useClientStore = create<ClientStore>()(
    persist(
        (set) => ({
            selectedClient: "",
            setSelectedClient: (client) => set({ selectedClient: client }),

            completedOnBoardingSteps: 0,
            setCompletedOnBoardingSteps: (step) => {
                set({ completedOnBoardingSteps: step })
            },

            passedOnboarding: false,
            passOnboarding: () => {
                set((state) => ({ ...state, passedOnboarding: true }))
            },
        }),
        { name: "client" },
    ),
)
