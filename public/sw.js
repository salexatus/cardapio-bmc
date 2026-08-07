// Kill-switch service worker.
// O site já foi um PWA (build React+Vite com vite-plugin-pwa). Navegadores que
// visitaram aquela versão podem ter um service worker antigo preso, servindo
// assets velhos (inclusive o painel /admin com a URL da API errada) → login falha.
// Este SW substitui o antigo, limpa TODOS os caches, se desregistra e recarrega
// as abas, devolvendo o site "limpo" (sem PWA/offline). Auto-destrutivo.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
      } catch (e) {
        /* ignora */
      }
      try {
        await self.registration.unregister()
      } catch (e) {
        /* ignora */
      }
      const clients = await self.clients.matchAll({ type: 'window' })
      for (const client of clients) {
        try {
          client.navigate(client.url)
        } catch (e) {
          /* ignora */
        }
      }
    })()
  )
})
