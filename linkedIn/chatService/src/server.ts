import express from "express"
import cors from "cors"
import { Server } from "socket.io"
import http from "http"
import { redis } from "./config/redis"

const app = express()
app.use(express.json())
app.use(cors({
    origin : "*",
    credentials : true
}))

const port = 4000

const server =  http.createServer(app)
const io = new Server(server , {
    cors : {
        origin : "*"
    }
})

const userMap = new Map<string , any>()



io.on("connection" , (socket)=>{
    console.log("connected to socket.io" , socket.id)

    socket.on("user-connected" , ({senderName , socketId})=>{
        userMap.set(socketId , senderName)
        console.log("username , socket id added to map  " , {senderName, socketId})
    })

    // socket.on("send-msg" , ({senderName , receiverName , msg , socketId})=>{

    //     redis.set(socketId , senderName)
        
    //     console.log(senderName , "is sending msg to" , receiverName , "msg is " , msg )
    //     //todo - db logic 
    //     socket.emit("rcv-msg" , {senderName , receiverName , msg})
    // })
})



server.listen(port , ()=>{
    console.log("server started at port :" , port)
})