"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewRedisConnection = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redisConfig = {
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null
};
const redis = new ioredis_1.default(redisConfig);
redis.on("connect", () => {
    console.log("redis connected in evaluation service");
});
redis.on("error", (error) => {
    console.log("error connecting to redis in evaluation service");
});
const createNewRedisConnection = () => {
    return new ioredis_1.default(redisConfig);
};
exports.createNewRedisConnection = createNewRedisConnection;
