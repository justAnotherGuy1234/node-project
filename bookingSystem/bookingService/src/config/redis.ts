import IORedis, { Redis } from "ioredis"
import Client from "ioredis"
import Redlock from "redlock"

export const redis = new Redis({
   host: "localhost",
   port: 6379
})

export const client = new Client({host : "127.0.0.1"})

export const redLock = new Redlock([client], {
   driftFactor: 0.01,
   retryCount: 0,
   retryDelay: 200,
   retryJitter: 200
})