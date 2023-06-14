const staticNotiSocket = "dev-noti-socket-node"
const assets = [
  "/",
  "/index.html",
  "/public/index.css",
  "/public/script.css",
  "/public/worker.css",
  "/index.js"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticNotiSocket).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})