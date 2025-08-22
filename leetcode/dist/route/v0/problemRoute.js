"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const problemController_1 = require("../../controller/problemController");
const router = express_1.default.Router();
router.post("/create", problemController_1.createProblemController);
exports.default = router;
