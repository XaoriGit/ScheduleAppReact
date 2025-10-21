/// <reference lib="webworker" />

import { precacheAndRoute } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { NetworkFirst } from "workbox-strategies"
import { ExpirationPlugin } from "workbox-expiration"
import { CacheableResponsePlugin } from "workbox-cacheable-response"

declare const self: ServiceWorkerGlobalScope & {
    __WB_MANIFEST: Array<{ url: string; revision: string | null }>
}

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
    ({ url }) => url.href.startsWith("https://app.omsktec.ru/api"),
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
