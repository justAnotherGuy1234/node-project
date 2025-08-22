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
exports.createProblemRepo = createProblemRepo;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createProblemRepo(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const problem = yield prisma.problem.findUnique({ where: { question: data.question } });
            if (problem) {
                throw new Error("this question already exists");
            }
            const newProblem = yield prisma.problem.create({ data: {
                    userId: data.userId,
                    question: data.question,
                    difficulty: data.difficulty,
                    testCases: data.testCases
                } });
            if (!newProblem) {
                throw new Error("Failed to create new problem");
            }
            return newProblem;
        }
        catch (e) {
            console.log("error creating new problem ", e);
            throw e;
        }
    });
}
