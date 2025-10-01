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
exports.startWorker = startWorker;
const bullmq_1 = require("bullmq");
const contants_1 = require("../util/contants");
const redisConfig_1 = require("../config/redisConfig");
const runCode_1 = require("../util/container/runCode");
const languageConfig_1 = require("../config/languageConfig");
const submissionApi_1 = require("../api/submissionApi");
function outputCheck(testCase, result) {
    let output = [];
    let finalRes = "ACCEPTED";
    testCase.map((testcase, index) => {
        if (result[index].status === "time_limit_exceeded") {
            output.push("time limit exceeded");
            finalRes = "WRONG_ANSWER";
        }
        else if (result[index].status === "failed") {
            output.push("wrong answer");
            finalRes = "WRONG_ANSWER";
        }
        else {
            if (result[index].output === testcase.output) {
                output.push("correct answer");
            }
            else {
                output.push("wrong answer");
                finalRes = "WRONG_ANSWER";
            }
        }
    });
    return finalRes;
}
function setupEvaluationWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        const worker = new bullmq_1.Worker(contants_1.SUBMISSION_QUEUE, (job) => __awaiter(this, void 0, void 0, function* () {
            console.log("processing job", job.id);
            const data = job.data;
            console.log("data", data);
            try {
                const testCasePromise = data.problem.testCase.map(testcase => {
                    return (0, runCode_1.runCode)({
                        code: data.code,
                        timeLimit: languageConfig_1.languageConfig[data.language].timeout,
                        imageName: languageConfig_1.languageConfig[data.language].imageName,
                        language: data.language,
                        input: testcase.input
                    });
                });
                const testCaseResult = yield Promise.all(testCasePromise);
                let output = outputCheck(data.problem.testCase, testCaseResult);
                console.log("output here", output);
                //    if (output !==  "PENDING" || "ACCEPTED" || "RUNNING" || "WRONG_ANSWER"){
                //         console.log(output , "output")
                //         throw new Error ( "incorrect status" )
                //    }
                const updateSubmissionStatus = yield (0, submissionApi_1.updateSubmissionStatusApi)({ submissionId: data.submissionId, status: output });
                console.log("output", updateSubmissionStatus);
            }
            catch (e) {
                console.log("error in testCase", e);
            }
        }), {
            connection: (0, redisConfig_1.createNewRedisConnection)()
        });
        worker.on("error", (error) => {
            console.log("error in creating worker", error);
        });
        worker.on("failed", (job, error) => {
            console.log("failed to complete job", job, error);
        });
        worker.on("completed", (job) => {
            console.log("completed job", job.id);
        });
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        yield setupEvaluationWorker();
    });
}
