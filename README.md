# Web Push notification with Nodejs socket
This project is to investigate enabling push notification in iOS pwa app.
It's mainly used Nodejs(Express) for server and html, css, js for client.
This project is deployed on [Render](https://render.com/docs). Deployed server [link](https://noti-socket-node.onrender.com/)


## Prerequisites
- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))


## Base dependencies
- [express](https://www.npmjs.com/package/express) for for HTTP server.
- [web-push](https://www.npmjs.com/package/web-push) for sending push notifications.
- [socket.io](https://www.npmjs.com/package/socket.io) for instant messaging between users.


## Usage

```
npm install
npm run start
```
Navigate to `http://localhost:3000`


## Limitations
- iOS ***16.4*** or later 
- Requires website to first be added to the Home Screen. Delivered silently, meaning no sound, vibration, haptics or screen wake.
(see more in [link](https://caniuse.com/push-api))


## Enableing Push API in your iphone
iOS ***16.4*** support for opt‑in notifications and badging for web apps. This lets you optionally receive Safari push notifications, but the process isn't straightforward. [ref1](https://www.apple.com/ios/ios-16/features/) [ref2](https://developer.apple.com/documentation/usernotifications/sending_web_push_notifications_in_web_apps_safari_and_other_browsers)

if you have an iPhone or iPad running version ***16.4*** or later, you can follow the steps below to enable Safari push notifications for specific websites. By doing so, you will receive alerts similar to those of native iOS apps.
1. Launch the **Settings** app on your iPhone or iPad running iOS/iPadOS ***16.4*** or later.
2. Scroll down and navigate to **Safari**.
3. Click *Advanced* and then *Experimental Features*.
4. You will find a **Push API** toggle at the bottom of the list. Make sure it's enabled.
5. Now launch the **Safari** app and visit the website you'd like to receive push notifications from. Note that the website has to support push notifications for this feature to work.
6. Tap on the Share button in the middle of the bottom bar
7. Choose **Add to Home Screen**.
8. Optionally rename the web app, then tap Add in the top right corner.
9. It will now appear on your Home Screen as a native app. Launch the newly-added web app.
10. Find the website's notifications settings and enable push notifications.
11. iOS will ask for your permission to enable them.

Now, the web app will be able to notify you as long as you keep it on your Home Screen. If you delete it, then the permission is revoked automatically, and you won't be able to receive alerts from it until you add it again.

As you can see, the process to enable Safari push notifications on iOS and iPadOS is more complex when compared to macOS because you need to add the web app to the Home Screen for it to work. On new Macs, you can just allow or deny website permissions without needing to bookmark it in any way. Regardless, it can be done now on newer versions of iOS 16.


