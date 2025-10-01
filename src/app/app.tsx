import {
    BrowserRouter,
    Route,
    Routes,
    Outlet,
    useNavigate,
} from "react-router-dom"
import { HomePage, SettingsPage } from "@/pages"
import "./app.scss"
import Toast from "@/components/toast/toast"
import { useToastStore } from "@/store/ToastStore"
import { OnboardingWrapper } from "@/pages/onboarding"
import { useEffect } from "react"
import { useOnboardingStore } from "@/store/OnboardingStore"

function ProtectedRoutes() {
    const { passedOnboarding } = useOnboardingStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!passedOnboarding && window.location.pathname !== "/onboarding") {
            navigate("/onboarding")
        }
    }, [passedOnboarding, navigate])

    return <Outlet />
}

function App() {
    const { toasts } = useToastStore((state) => state)

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route
                            path="/onboarding"
                            element={<OnboardingWrapper />}
                        />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </>
    )
}

export default App
