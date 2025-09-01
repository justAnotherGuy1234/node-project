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
exports.createHotelController = createHotelController;
exports.getHotelByIdController = getHotelByIdController;
const hotelService_1 = require("../service/hotelService");
function createHotelController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, address } = req.body;
            const hotel = yield (0, hotelService_1.createHotelService)({ name, address });
            if (!hotel) {
                return res.status(500).json("failed to created new hotel");
            }
            return res.json({
                msg: "created new hotel",
                data: hotel
            });
        }
        catch (e) {
            console.log("error in create hotel controller", e);
            return res.status(500).json({
                msg: "Internal server error",
                error: e
            });
        }
    });
}
function getHotelByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (!id) {
                return res.json("no hotel id found in url params");
            }
            const hotelId = parseInt(id);
            const hotel = yield (0, hotelService_1.getHotelByIdService)(hotelId);
            if (!hotel) {
                return res.json("failed to get hotel by id");
            }
            return res.json({
                msg: "got hotel with id provided",
                data: hotel
            });
        }
        catch (e) {
            console.log("error in get hotel by id controller", e);
            return res.status(500).json({
                msg: "Internal server error",
                error: e
            });
        }
    });
}
