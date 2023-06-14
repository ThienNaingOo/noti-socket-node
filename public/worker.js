self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(
    data.title,
    {
      body: 'Message from Socket Server Nodejs',
      image: "https://noti-socket-node.onrender.com/img/icons/logo-72.png",
      icon: "https://noti-socket-node.onrender.com/img/icons/logo-72.png" // icon 
    }
  );
});

const staticNotiSocket = "dev-noti-socket-node"
const assets = [
  "/",
  "/index.html",
  "/index.css",
  "/script.js",
  "/worker.js"
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