const notify = document.querySelector("#notification")
const message = document.querySelector("#message")
const button = document.querySelector("#send")
const button1 = document.querySelector("#notifyme")
const header = document.querySelector("#header")

const publicVapidKey = 'BCjLrm9PnKTU65e3s6kEh7AqKVWbG20OWkXfb_E1ILENJLp1NCjqWRFz8giR2HK61IFaGP7ZzscA6GobgxeLj68';

const socket = io("https://noti-socket-node.onrender.com/")
// const socket = io("http://localhost:8080/")
let messages = []

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function printMessage(e) {
  e.preventDefault()
  const msg = document.getElementById("message")
  socket.emit("message", msg.value)
}
socket.on("response", data => {
  if ('serviceWorker' in navigator) {
    send(data).catch(err => console.error(err));
  }
  messages.push(data)
  const msg = document.createElement("p")
  const node = document.createTextNode(data)
  msg.appendChild(node)
  notify.appendChild(msg)
  header.style.backgroundColor = "#3F4E4F"
})

async function send(data) {
  console.log('send--->',data);
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,

    //public vapid key
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })
    .catch((error) => console.log(error))

  await fetch("/subscribe?message=" + data, {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}

function notifyme() {
  console.log('notify me');
  if (!("Notification" in window)) {

    console.log("This browser does not support desktop notification");
  }
  if (Notification.permission === "granted") {

    const notification = new Notification("Notification permission allowed.!");

  } else if (Notification.permission !== "denied") {

    Notification.requestPermission().then((permission) => {

      if (permission === "granted") {
        const notification = new Notification("Notification permission allowed.!");

      }
    });
  }
}

button.addEventListener("click", printMessage)
button1.addEventListener("click", notifyme)

if (navigator.serviceWorker) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/worker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}