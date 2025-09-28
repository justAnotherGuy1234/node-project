"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissionQueue = void 0;
const bullmq_1 = require("bullmq");
const redisConfig_1 = require("../config/redisConfig");
exports.submissionQueue = new bullmq_1.Queue("submission", {
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
    console.log("error creating submission queue", error);
});
exports.submissionQueue.on("waiting", (job) => {
    console.log("submission job waiting ", job.id);
});
