const express = require("express")
const app = express()
const http = require("http").Server(app)
const PORT = process.env.PORT || 8080
const path = require("path")
const socketIO = require("socket.io")(http)
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors')

const publicVapidKey = 'BCjLrm9PnKTU65e3s6kEh7AqKVWbG20OWkXfb_E1ILENJLp1NCjqWRFz8giR2HK61IFaGP7ZzscA6GobgxeLj68';
const privateVapidKey = 'QVqMAuGboj7HT-fOo8oRePfUwsRKuy_zEymaFdS1qr8';
webpush.setVapidDetails('mailto:scm.theinnaingoo@gmail.com', publicVapidKey, privateVapidKey);

var name;

app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cors())

socketIO.on("connection", socket => {
    console.log(`⚡: ${socket.id} user just connected`)
    socket.on("message", data => {
        socket.broadcast.emit("response", data)
    })
    socket.on('joining msg', (username) => {
        name = username;
        console.log(`user connected ${username}`);
        socketIO.emit('chat message', `---${name} joined the chat---`);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`);
        socketIO.emit('chat message', `---${name} left the chat---`);

    });
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    const params = req.query;
    res.status(201).json({})
    const payload = JSON.stringify({ title: params.message });
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
})

http.listen(PORT, () => {
    console.log(`App listening at ${PORT}`)
})