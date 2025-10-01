import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, SettingsPage } from "@/pages"
import "./app.scss"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
