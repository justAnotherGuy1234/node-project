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
exports.createRoomRepo = createRoomRepo;
exports.getRoomByCategoryRepo = getRoomByCategoryRepo;
exports.createRoomBookingRepo = createRoomBookingRepo;
exports.reduceRoomCountRepo = reduceRoomCountRepo;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createRoomRepo(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const room = yield prisma.room.create({ data: data });
            if (!room) {
                throw new Error("failed to create room");
            }
            return room;
        }
        catch (e) {
            console.log("error in create room repo", e);
            throw e;
        }
    });
}
function getRoomByCategoryRepo(category, hotelId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const room = yield prisma.room.findFirst({
                where: {
                    hotel: hotelId,
                    roomType: category,
                    roomCount: { gt: 0 }
                }
            });
            if ((room === null || room === void 0 ? void 0 : room.roomCount) == 0) {
                throw new Error("no rooms available for this category");
            }
            if (!room) {
                throw new Error("failed to get room by the category request");
            }
            return room;
        }
        catch (e) {
            console.log("error in get room by category repo", e);
            throw e;
        }
    });
}
function createRoomBookingRepo(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roomBooked = prisma.roomBooked.create({ data: data });
            if (!roomBooked) {
                throw new Error("failed to create room booking");
            }
            return roomBooked;
        }
        catch (e) {
            console.log("error in get room repo ", e);
            throw e;
        }
    });
}
function reduceRoomCountRepo(roomId, hotelId, roomType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const room = yield prisma.room.update({
                where: {
                    id: roomId,
                    hotel: hotelId,
                    roomType: roomType,
                    roomCount: { gt: 0 }
                },
                data: {
                    roomCount: {
                        decrement: 1
                    }
                }
            });
            if (!room) {
                throw new Error("no rooms available in this hotel ");
            }
            return room;
        }
        catch (e) {
            console.log("error in reduce room count repo ", e);
            throw e;
        }
    });
}
