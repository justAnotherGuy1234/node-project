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
const userToSocket = new Map();
io.on("connection", (socket) => {
    let rcvSocketId;
    console.log("connected to socket.io", socket.id);
    socket.on("user-connected", ({ senderName, socketId }) => {
        userMap.set(socketId, senderName);
        io.emit("socket-added", Array.from(userMap.keys()), Array.from(userToSocket.keys()));
    });
    socket.on("send-msg", ({ confirmSenderName, receiverName, socketId, msg }) => {
        if (userMap.get(socketId) == confirmSenderName) {
            console.log("sender verified", confirmSenderName);
        }
        else {
            console.log("no user found with this socket id ");
        }
        for (const [key, value] of userMap) {
            if (value == receiverName) {
                rcvSocketId = key;
            }
        }
        if (rcvSocketId) {
            io.to(rcvSocketId).emit("rcv-msg", ({ confirmSenderName, msg }));
        }
    });
    socket.on("disconnect", () => {
        const user = userMap.get(socket.id);
        if (user) {
            userMap.delete(user);
            console.log("disconnected user deleted from maps");
        }
    });
});
server.listen(port, () => {
    console.log("server started at port :", port);
});
