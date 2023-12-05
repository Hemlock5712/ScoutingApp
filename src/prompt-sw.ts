/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
import {
	cleanupOutdatedCaches,
	createHandlerBoundToURL,
	precacheAndRoute
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

let allowList: undefined | RegExp[];
if (import.meta.env.DEV) {
	allowList = [/^\/$/];
}

registerRoute(new NavigationRoute(createHandlerBoundToURL('/'), { allowlist: allowList }));
