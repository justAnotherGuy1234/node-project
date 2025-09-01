"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelRouter_1 = __importDefault(require("./router/hotelRouter"));
const RoomRouter_1 = __importDefault(require("./router/RoomRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 5000;
app.use("/api/v0/hotel", hotelRouter_1.default);
app.use("/api/v0/room", RoomRouter_1.default);
app.listen(port, () => {
    console.log("hotel service on port : ", port);
});
