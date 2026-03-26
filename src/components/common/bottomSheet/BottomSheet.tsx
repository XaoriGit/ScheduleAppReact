import {
    useState,
    useRef,
    useEffect,
    useCallback,
    type ReactNode,
    type PointerEvent as ReactPointerEvent,
} from "react"
import { createPortal } from "react-dom"
import styles from "./BottomSheet.module.scss"

export type BottomSheetSize = "compact" | "medium" | "full"

interface BottomSheetProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title?: string
    size?: BottomSheetSize
    /** Allow dragging to resize between compact/medium/full */
    draggable?: boolean
    /** Show scrim overlay */
    showScrim?: boolean
    /** Close on scrim click */
    closeOnScrimClick?: boolean
}

const SIZE_HEIGHT: Record<BottomSheetSize, string> = {
    compact: "40%",
    medium: "60%",
    full: "92%",
}

const SNAP_THRESHOLDS = [0.4, 0.6, 0.92]

function snapToClosest(ratio: number): BottomSheetSize {
    const diffs = SNAP_THRESHOLDS.map((t) => Math.abs(t - ratio))
    const idx = diffs.indexOf(Math.min(...diffs))
    return (["compact", "medium", "full"] as BottomSheetSize[])[idx]
}

export const BottomSheet = ({
    isOpen,
    onClose,
    children,
    title,
    size = "medium",
    draggable = true,
    showScrim = true,
    closeOnScrimClick = true,
}: BottomSheetProps) => {
    const [currentSize, setCurrentSize] = useState<BottomSheetSize>(size)
    const [dragging, setDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState(0)
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(false)

    const sheetRef = useRef<HTMLDivElement>(null)
    const dragStartY = useRef(0)
    const dragStartHeight = useRef(0)

    // Sync size prop → currentSize when sheet opens
    useEffect(() => {
        if (isOpen) setCurrentSize(size)
    }, [isOpen, size])

    // Mount/unmount with animation
    useEffect(() => {
        if (isOpen) {
            setMounted(true)
            // setTimeout гарантирует что браузер успел отрисовать начальный
            // translateY(100%) до добавления класса .visible с transition
            const timer = setTimeout(() => setVisible(true), 16)
            return () => clearTimeout(timer)
        } else {
            setVisible(false)
            const timer = setTimeout(() => setMounted(false), 350)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    const getSheetHeight = () => {
        const base = SIZE_HEIGHT[currentSize]
        if (!dragging || dragOffset === 0) return base
        return `calc(${base} - ${dragOffset}px)`
    }

    const onPointerDown = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            if (!draggable) return
            setDragging(true)
            dragStartY.current = e.clientY
            dragStartHeight.current = sheetRef.current?.offsetHeight ?? 0
            ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        },
        [draggable],
    )

    const onPointerMove = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            if (!dragging) return
            const delta = e.clientY - dragStartY.current
            setDragOffset(delta)
        },
        [dragging],
    )

    const onPointerUp = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            if (!dragging) return
            setDragging(false)

            const windowH = window.innerHeight
            const newHeight = dragStartHeight.current - dragOffset
            const ratio = newHeight / windowH

            // Swipe down fast → close
            const delta = e.clientY - dragStartY.current
            if (delta > 120) {
                setDragOffset(0)
                onClose()
                return
            }

            const snapped = snapToClosest(Math.max(0.1, Math.min(0.95, ratio)))
            setCurrentSize(snapped)
            setDragOffset(0)
        },
        [dragging, dragOffset, onClose],
    )

    if (!mounted) return null

    return createPortal(
        <div className={`${styles.root} ${visible ? styles.visible : ""}`}>
            {showScrim && (
                <div
                    className={styles.scrim}
                    onClick={closeOnScrimClick ? onClose : undefined}
                    aria-hidden="true"
                />
            )}

            <div
                ref={sheetRef}
                className={`${styles.sheet} ${dragging ? styles.dragging : ""}`}
                style={{ height: getSheetHeight() }}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                {/* Drag handle */}
                {draggable && (
                    <div
                        className={styles.handleArea}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        role="presentation"
                    >
                        <span className={styles.handle} />
                    </div>
                )}

                {/* Header */}
                {title && (
                    <div className={styles.header}>
                        <h2 className={styles.title}>{title}</h2>
                    </div>
                )}

                {/* Content */}
                <div className={styles.content}>{children}</div>
            </div>
        </div>,
        document.body,
    )
}
