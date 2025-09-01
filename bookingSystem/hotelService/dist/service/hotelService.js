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
exports.createHotelService = createHotelService;
exports.getHotelByIdService = getHotelByIdService;
const hotelRepo_1 = require("../repo/hotelRepo");
function createHotelService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hotel = yield (0, hotelRepo_1.createHotelRepo)(data);
            if (!hotel) {
                throw new Error("failed to create new hotel");
            }
            return hotel;
        }
        catch (e) {
            console.log("error in create hotel service", e);
            throw e;
        }
    });
}
function getHotelByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hotel = yield (0, hotelRepo_1.getHotelByIdRepo)(id);
            if (!hotel) {
                throw new Error("no hotel found with this");
            }
            return hotel;
        }
        catch (e) {
            console.log("error in get hotel by id service ", e);
            throw e;
        }
    });
}
