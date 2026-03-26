import {
    BrowserRouter,
    Route,
    Routes,
    Outlet,
    useNavigate,
} from "react-router-dom"
import { HomePage } from "@/pages"
import "./app.scss"
import Toast from "@/components/toast/toast"
import { useToastStore } from "@/store/ToastStore"
import { OnboardingWrapper } from "@/pages/onboarding"
import { useEffect } from "react"
import { useClientStore } from "@/store/ClientStore"

function ProtectedRoutes() {
    const { passedOnboarding } = useClientStore()
    const navigate = useNavigate()
    const isReady =
        passedOnboarding || window.location.pathname === "/onboarding"

    useEffect(() => {
        if (!passedOnboarding && window.location.pathname !== "/onboarding") {
            navigate("/onboarding")
        }
    }, [passedOnboarding, navigate])

    if (!isReady) return null

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
                        {/* <Route path="/settings" element={() => {}} /> */}
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
