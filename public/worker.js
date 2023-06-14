self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(
    data.message, // title of the notification
    {
      body: "Push notification from section.io", //the body of the push notification
      image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
      icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon 
    }
  );
});

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