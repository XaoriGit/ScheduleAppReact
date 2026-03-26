import { useState, useCallback } from "react"

interface UseBottomSheetReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useBottomSheet = (initialOpen = false): UseBottomSheetReturn => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return { isOpen, open, close, toggle }
}
