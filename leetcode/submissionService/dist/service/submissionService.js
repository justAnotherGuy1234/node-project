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
exports.SubmissionService = void 0;
const problemServiceApi_1 = require("../api/problemServiceApi");
const submissionProducer_1 = require("../producer/submissionProducer");
class SubmissionService {
    constructor(submissionRepo) {
        this.submissionRepo = submissionRepo;
    }
    createSubmissionService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO
            //have to add extra logic of evaluation service and send the submission payload to the queue 
            if (!data.problemId || !data.code || !data.language) {
                throw new Error("problem id , code , language  is mandatory");
            }
            const problem = yield (0, problemServiceApi_1.getProblemByIdApi)(data.problemId);
            if (!problem) {
                throw new Error("failed to get problem by id");
            }
            const submission = yield this.submissionRepo.createSubmissionRepo(data);
            if (!submission) {
                throw new Error("failed to create new submission ");
            }
            const jobId = yield (0, submissionProducer_1.SubmissionProducer)({
                submissionId: submission.id,
                problem: problem,
                code: submission.code,
                language: submission.language
            });
            // store job id in submission db 
            return submission;
        });
    }
}
exports.SubmissionService = SubmissionService;
