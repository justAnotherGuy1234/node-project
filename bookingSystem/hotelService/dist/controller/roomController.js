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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomController = createRoomController;
exports.getRoomByCategoryController = getRoomByCategoryController;
exports.getRoomController = getRoomController;
const roomService_1 = require("../service/roomService");
function createRoomController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { hotel, price, roomType, roomCount, dataOfAvailability } = req.body;
            const room = yield (0, roomService_1.createRoomService)({ hotel, price, roomType, roomCount, dataOfAvailability });
            if (!room) {
                return res.status(500).json("failed to create new room");
            }
            return res.json({
                msg: "created room successfully",
                data: room
            });
        }
        catch (e) {
            console.log("error in create room controller", e);
            return res.status(500).json({
                msg: "Internal server error",
                error: e
            });
        }
    });
}
function getRoomByCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { roomType, hotelId } = req.body;
            const room = yield (0, roomService_1.getRoomByCategoryService)(roomType, hotelId);
            if (!room) {
                return res.json("failed to get room by category");
            }
            return res.json({
                msg: "got room by category requested",
                data: room
            });
        }
        catch (e) {
            console.log("error in get room by category controller", e);
            return res.status(500).json({
                msg: "Internal server error",
                error: e.message
            });
        }
    });
}
function getRoomController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("cookies", req.cookies.token);
            // let userId 
            // try {
            //   const res = await axios.get("http://localhost:6000/api/v0/info/get-user-info" , {headers : {
            //    "Cookie" : `token=${req.cookies.token}`
            //   }})
            //   console.log("res from hotel service" , res.data.userId)
            //   userId = res.data.userId
            // } catch (e:any) {
            //    console.log("failed to get data in from go api in get room controller", e.message) 
            //    return res.status(500).json("internal server error")
            // }
            const { hotel, userId, roomType, startDate, endDate, pricePayed } = req.body;
            const room = yield (0, roomService_1.getRoomService)({ hotel, userId, roomType, startDate, endDate, pricePayed });
            if (!room) {
                return res.json("failed to book room");
            }
            return res.json({
                msg: "created new room booking",
                data: room
            });
        }
        catch (e) {
            console.log("error in get room controller", e);
            return res.status(500).json({
                msg: "Internal server error",
                error: e.message
            });
        }
    });
}
