import express from "express"
import hotelRouter from "./router/hotelRouter"
import roomRouter from "./router/RoomRouter"

const app = express()
app.use(express.json())

const port = 5000

app.use("/api/v0/hotel" , hotelRouter)
app.use("/api/v0/room" , roomRouter)

app.listen(port , () => {
    console.log("hotel service on port : " , port)
})