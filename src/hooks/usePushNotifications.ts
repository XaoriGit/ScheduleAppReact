import { useState, useEffect } from "react"

export function usePushNotifications() {
    const [isSupported, setIsSupported] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(
        null,
    )
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [vapidPublicKey, setVapidPublicKey] = useState<string>("")

    useEffect(() => {
        setIsSupported("serviceWorker" in navigator && "PushManager" in window)

        // Check if already subscribed
        checkExistingSubscription()

        // Fetch VAPID public key from server
        fetch("http://localhost:3001/api/vapid-public-key")
            .then((res) => res.json())
            .then((data) => {
                console.log(
                    "Received VAPID public key:",
                    data.publicKey.substring(0, 20) + "...",
                )
                setVapidPublicKey(data.publicKey)
            })
            .catch(console.error)
    }, [])

    const checkExistingSubscription = async () => {
        try {
            const registration = await navigator.serviceWorker.ready
            const existingSub = await registration.pushManager.getSubscription()

            if (existingSub) {
                setSubscription(existingSub)
                setIsSubscribed(true)
                console.log("Found existing subscription")
            }
        } catch (error) {
            console.error("Error checking subscription:", error)
        }
    }

    const requestPermission = async () => {
        const permission = await Notification.requestPermission()
        return permission === "granted"
    }

    const subscribeToPush = async () => {
        if (!vapidPublicKey) {
            throw new Error("VAPID key not loaded yet")
        }

        try {
            const registration = await navigator.serviceWorker.ready

            // Check for existing subscription with different key
            const existingSub = await registration.pushManager.getSubscription()
            if (existingSub) {
                console.log("Unsubscribing from old subscription...")
                await existingSub.unsubscribe()
            }

            // Request permission
            const permissionGranted = await requestPermission()
            if (!permissionGranted) {
                throw new Error("Ошибка при получении разрешения показывать оповещения")
            }

            console.log(
                "Subscribing with VAPID key:",
                vapidPublicKey.substring(0, 20) + "...",
            )

            const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
            })

            setSubscription(sub)
            setIsSubscribed(true)

            // Send subscription to backend
            await fetch("http://localhost:3001/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sub),
            })

            console.log("Successfully subscribed to push notifications")
            return sub
        } catch (error) {
            console.error("Failed to subscribe:", error)
            throw error
        }
    }

    const unsubscribe = async () => {
        try {
            if (!subscription) {
                // Try to get subscription from service worker
                const registration = await navigator.serviceWorker.ready
                const existingSub =
                    await registration.pushManager.getSubscription()

                if (existingSub) {
                    await existingSub.unsubscribe()

                    // Notify backend
                    await fetch("http://localhost:3001/api/unsubscribe", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            endpoint: existingSub.endpoint,
                        }),
                    })
                }
            } else {
                await subscription.unsubscribe()

                // Notify backend
                await fetch("http://localhost:3001/api/unsubscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ endpoint: subscription.endpoint }),
                })
            }

            setSubscription(null)
            setIsSubscribed(false)
            console.log("Successfully unsubscribed")
        } catch (error) {
            console.error("Failed to unsubscribe:", error)
            throw error
        }
    }

    return {
        isSupported,
        isSubscribed,
        subscription,
        subscribeToPush,
        unsubscribe,
        vapidPublicKey, // Export this for debugging
    }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}
