const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const store = require('store')
require('dotenv/config')

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const PORT = process.env.PORT || 8000

app.use(cors)
app.get("/", (request, response) => {
    response.send("Server is running")
})

io.on("connection", (socket) => {
    socket.emit('me', socket.id)

    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("calluser", { signal: signalData, from, callerName: name })
    })

    socket.on("answercall", (data)=> {
        io.to(data.caller).emit("callaccepted", data.signal)
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("User left the call")
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})