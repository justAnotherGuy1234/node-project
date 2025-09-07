"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
const port = 4000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const userMap = new Map();
io.on("connection", (socket) => {
    console.log("connected to socket.io", socket.id);
    socket.on("user-connected", ({ senderName, socketId }) => {
        userMap.set(socketId, senderName);
        console.log("username , socket id added to map  ", { senderName, socketId });
    });
    // socket.on("send-msg" , ({senderName , receiverName , msg , socketId})=>{
    //     redis.set(socketId , senderName)
    //     console.log(senderName , "is sending msg to" , receiverName , "msg is " , msg )
    //     //todo - db logic 
    //     socket.emit("rcv-msg" , {senderName , receiverName , msg})
    // })
});
server.listen(port, () => {
    console.log("server started at port :", port);
});
