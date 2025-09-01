"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelController_1 = require("../controller/hotelController");
const router = express_1.default.Router();
router.post("/create", hotelController_1.createHotelController);
router.get("/:id", hotelController_1.getHotelByIdController);
exports.default = router;
