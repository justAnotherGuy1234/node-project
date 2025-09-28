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
exports.ProblemService = void 0;
const markdown_1 = require("../util/markdown");
class ProblemService {
    constructor(problemRepo) {
        this.problemRepo = problemRepo;
        console.log("problem service called");
    }
    createProblemService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sanitizedPayload = Object.assign(Object.assign({}, data), { description: yield (0, markdown_1.sanitize)(data.description) });
            console.log("sanitize payload", sanitizedPayload);
            const problem = yield this.problemRepo.createProblem(sanitizedPayload);
            if (!problem) {
                console.log("error in create problem service ");
                throw new Error("failed to create problem");
            }
            return problem;
        });
    }
    getProblemByIdService(problemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const problem = yield this.problemRepo.getProblemById(problemId);
            if (!problem) {
                console.log("error in get problm by id service", problemId);
                throw new Error("failed to get problem with given id");
            }
            return problem;
        });
    }
}
exports.ProblemService = ProblemService;
