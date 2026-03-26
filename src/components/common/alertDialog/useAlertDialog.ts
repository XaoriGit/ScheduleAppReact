import { useState, useCallback } from "react"

interface UseAlertDialogReturn {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useAlertDialog = (initialOpen = false): UseAlertDialogReturn => {
    const [isOpen, setIsOpen] = useState(initialOpen)

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    return { isOpen, open, close }
}