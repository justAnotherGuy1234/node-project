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
exports.ProblemRepo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProblemRepo {
    createProblem(problem) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProblem = yield prisma.problem.create({
                data: {
                    title: problem.title,
                    description: problem.description,
                    difficulty: problem.difficulty,
                    testCase: {
                        create: problem.testCase.map((test) => ({
                            input: test.input,
                            output: test.output
                        }))
                    }
                },
                include: {
                    testCase: true
                }
            });
            return newProblem;
        });
    }
    getProblemById(problemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const problem = yield prisma.problem.findUnique({ where: { id: problemId }, include: { testCase: true } });
            if (!problem) {
                throw new Error("failed to get problem with given id ");
            }
            return problem;
        });
    }
}
exports.ProblemRepo = ProblemRepo;
