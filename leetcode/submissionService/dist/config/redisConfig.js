"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewRedisConnection = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisConfig = {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null
};
exports.redis = new ioredis_1.default(redisConfig);
exports.redis.on("connect", () => {
    console.log("connected to redis");
});
exports.redis.on("error", (error) => {
    console.log("error connecting to redis", error);
});
const createNewRedisConnection = () => {
    return new ioredis_1.default(redisConfig);
};
exports.createNewRedisConnection = createNewRedisConnection;
