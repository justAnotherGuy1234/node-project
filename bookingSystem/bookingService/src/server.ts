import express from "express"
import bookingRoute from "./router/bookingRouter"

const app = express()
app.use(express.json())

const port = 4000

app.use("/api/v0/booking" , bookingRoute)

app.listen(port , () => {
    console.log("booking service started at port " , port )
})