import express from 'express';
import {createServer} from 'node:http';
import {Server} from "socket.io"

const app = express()
const server = createServer(app)
const ioServer =  new Server(server)
app.use(express.static("frontend/dist"))

ioServer.on("connection", (socket) => {
    console.log("new client", socket.id)
    socket.on("message", (message) =>{
        console.log("message from clien:", message)
        ioServer.emit("message", message);
    })
})



server.listen(3000, ()=>{
    console.log("server is running")
}) 