import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./main.css"
import App from "./app.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { registerSW } from "virtual:pwa-register"

const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
        updateSW(true)
    },
})

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>,
)
