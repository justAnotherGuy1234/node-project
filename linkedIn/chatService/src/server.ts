import express from "express"
import cors from "cors"
import { Server } from "socket.io"
import http from "http"
import { PrismaClient } from "@prisma/client"
import { resolve } from "path"
import { rejects } from "assert"

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true
}))

const port = 4000

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

const userMap = new Map<string, any>()


io.on("connection", (socket) => {
    let rcvSocketId: string
    console.log("connected to socket.io", socket.id)

    socket.on("user-connected", ({ senderName, socketId }) => {
        userMap.set(socketId, senderName)
        io.emit("socket-added", Array.from(userMap.keys()))
    })

    socket.on("send-msg", async ({ confirmSenderName, receiverName, socketId, msg }) => {
        if (userMap.get(socketId) == confirmSenderName) {
            console.log("sender verified", confirmSenderName)
        } else {
            console.log("no user found with this socket id ")
        }

        for (const [key, value] of userMap) {
            if (value == receiverName) {
                rcvSocketId = key
            }
        }

        if (rcvSocketId) {
            io.to(rcvSocketId).emit("rcv-msg", ({ confirmSenderName, msg }))
            io.to(socketId).emit("rcv-msg" , ({confirmSenderName , msg}))
            try {
                await prisma.chat.create({
                    data: {
                        senderName: confirmSenderName,
                        receiverName: receiverName,
                        message: msg
                    }
                })
            } catch (e) {
                console.log("failed to save msg to database")
            }
        }
    })

    socket.on("disconnect", () => {
        const user = userMap.get(socket.id)
        if (user) {
            userMap.delete(user)
            console.log("disconnected user deleted from maps")
        }
    })

})



server.listen(port, () => {
    console.log("server started at port :", port)
})