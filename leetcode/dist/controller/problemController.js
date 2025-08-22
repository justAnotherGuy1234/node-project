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
exports.createProblemController = createProblemController;
const multer_1 = __importDefault(require("multer"));
const problemService_1 = require("../service/problemService");
function createProblemController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const upload = (0, multer_1.default)({
                storage: multer_1.default.memoryStorage()
            });
            const { question, difficulty } = req.body;
            if (!question || !difficulty) {
                return res.status(400).json("question and difficulty is mandatory");
            }
            const testCasesFile = req.file;
            if (!testCasesFile) {
                return res.status(400).json("upload test case file");
            }
            const userId = req.user.id;
            const problemDto = {
                userId: userId,
                question,
                difficulty,
                testCases: testCasesFile.buffer
            };
            const problem = yield (0, problemService_1.createProblemService)(problemDto);
            return res.json({
                "msg": "problem created",
                "data": problem
            });
        }
        catch (error) {
            console.log("error in create problem", error);
            return res.status(500).json(error);
        }
    });
}
