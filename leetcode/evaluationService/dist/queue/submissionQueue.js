"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissionQueue = void 0;
const bullmq_1 = require("bullmq");
const redisConfig_1 = require("../config/redisConfig");
const contants_1 = require("../util/contants");
exports.submissionQueue = new bullmq_1.Queue(contants_1.SUBMISSION_QUEUE, {
    connection: (0, redisConfig_1.createNewRedisConnection)(),
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 2000
        }
    }
});
exports.submissionQueue.on("error", (error) => {
    console.log("error in submissionQueue in evaluation service", error);
});
exports.submissionQueue.on("waiting", (job) => {
    console.log("waiting for job in evaluation service", job.id);
});
