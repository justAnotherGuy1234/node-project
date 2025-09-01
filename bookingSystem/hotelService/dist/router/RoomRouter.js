"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controller/roomController");
const router = express_1.default.Router();
router.post("/create", roomController_1.createRoomController);
router.get("/category", roomController_1.getRoomByCategoryController);
exports.default = router;
