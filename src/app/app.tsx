import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "@/pages"
import "./app.scss"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/settings" element={<></>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
