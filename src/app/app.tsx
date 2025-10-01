import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, SettingsPage } from "@/pages"
import "./app.scss"
import Toast from "@/components/toast/toast"
import { useToastStore } from "@/store/ToastStore"

function App() {
    const { toasts } = useToastStore((state) => state)

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </BrowserRouter>
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </>
    )
}

export default App
