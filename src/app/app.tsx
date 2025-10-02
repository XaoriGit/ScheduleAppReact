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
            {toasts.length > 0 && (
                <div className="toast-container">
                    {toasts.map((toast) => (
                        <Toast key={toast.id} {...toast} />
                    ))}
                </div>
            )}
        </>
    )
}

export default App
