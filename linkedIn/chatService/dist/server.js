"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
    let rcvSocketId;
    console.log("connected to socket.io", socket.id);
    socket.on("user-connected", ({ senderName, socketId }) => {
        userMap.set(socketId, senderName);
        io.emit("socket-added", Array.from(userMap.keys()));
    });
    socket.on("send-msg", (_a) => __awaiter(void 0, [_a], void 0, function* ({ confirmSenderName, receiverName, socketId, msg }) {
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
            io.to(socketId).emit("rcv-msg", ({ confirmSenderName, msg }));
            try {
                yield prisma.chat.create({
                    data: {
                        senderName: confirmSenderName,
                        receiverName: receiverName,
                        message: msg
                    }
                });
            }
            catch (e) {
                console.log("failed to save msg to database");
            }
        }
    }));
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
