/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { NetworkFirst, NetworkOnly } from "workbox-strategies"
import { ExpirationPlugin } from "workbox-expiration"
import { CacheableResponsePlugin } from "workbox-cacheable-response"
import { clientsClaim } from "workbox-core"
import { skipWaiting } from "workbox-core"

skipWaiting()
clientsClaim()

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting()
    }
})

declare const self: ServiceWorkerGlobalScope & {
    __WB_MANIFEST: Array<{ url: string; revision: string | null }>
}

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
    ({ url }) => url.pathname.match(/workbox-.*\.js$/),
    new NetworkOnly(),
)

registerRoute(
    ({ url }) =>
        url.origin === "https://app.omsktec.ru" &&
        url.pathname.startsWith("/api/schedule"),
    new NetworkFirst({
        cacheName: "api-cache",
        networkTimeoutSeconds: 3,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
            }),
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
)
