import express from "express"
import hotelRouter from "./router/hotelRouter"
import roomRouter from "./router/RoomRouter"
import cookie from "cookie-parser"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin : '*',
    credentials : true
}))

const port = 5000

app.use("/api/v0/hotel" , hotelRouter)
app.use("/api/v0/room" , roomRouter)


app.listen(port , () => {
    console.log("hotel service on port : " , port)
})