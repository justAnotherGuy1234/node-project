"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controller/roomController");
const router = express_1.default.Router();
router.post("/create", roomController_1.createRoomController);
router.post("/category", roomController_1.getRoomByCategoryController);
router.post("/get-room", roomController_1.getRoomController);
router.post("/room-booking", roomController_1.getRoomController);
exports.default = router;
