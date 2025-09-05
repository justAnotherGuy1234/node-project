import express from "express"
import bookingRoute from "./router/bookingRouter"
import cookie from "cookie-parser"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin : "*",
    credentials : true
}))

const port = 8000

app.use("/api/v0/booking" , bookingRoute)

app.listen(port , () => {
    console.log("booking service started at port " , port )
})