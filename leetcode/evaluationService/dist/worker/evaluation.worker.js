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
function setupEvaluationWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        const worker = new bullmq_1.Worker(contants_1.SUBMISSION_QUEUE, (job) => __awaiter(this, void 0, void 0, function* () {
            console.log("processing job", job.id);
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
