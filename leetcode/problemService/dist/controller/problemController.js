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
exports.ProblemController = void 0;
const problemService_1 = require("../service/problemService");
const problemValidator_1 = require("../validator/problemValidator");
const problemRepo_1 = require("../repo/problemRepo");
const problemRepo = new problemRepo_1.ProblemRepo();
const problemService = new problemService_1.ProblemService(problemRepo);
exports.ProblemController = {
    createProblem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validator = problemValidator_1.createProblemSchema.safeParse(req.body);
                if (!validator.success) {
                    return res.status(500).json({
                        msg: "incorrect input ",
                        error: validator.error
                    });
                }
                const problem = yield problemService.createProblemService(validator.data);
                if (!problem) {
                    return res.json("failed to create problem");
                }
                return res.json({
                    msg: "created problem",
                    data: problem
                });
            }
            catch (e) {
                console.log("error in create problem", e);
                return res.status(500).json({
                    msg: "Internal server error"
                });
            }
        });
    },
    getProblemById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Id = req.params.id;
            const problemId = parseInt(Id);
            const problem = yield problemService.getProblemByIdService(problemId);
            if (!problem) {
                return res.json("failed to get problem with given id");
            }
            return res.json({
                "msg": "got problem with id",
                "data": problem
            });
        });
    }
};
