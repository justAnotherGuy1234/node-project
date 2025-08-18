import express from "express"
import userRoutes from "/router/userRoutes"

const app = express()
const port = 5000
app.use(express.json())

app.use("/api/users" , userRoutes)


app.listen(port , () => {
    console.log("server running on port : " , port)
})
