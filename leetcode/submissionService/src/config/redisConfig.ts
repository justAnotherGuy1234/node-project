import Redis from "ioredis";
import dotenv from "dotenv"

dotenv.config()


const redisConfig = {
    host : process.env.REDIS_HOST || "localhost",
    port : Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest : null
}

export const redis = new Redis(redisConfig)

redis.on("connect" , ()=>{
    console.log("connected to redis")
})

redis.on("error" , (error)=>{
    console.log("error connecting to redis" , error)
})

export const createNewRedisConnection = () => {
    return new Redis(redisConfig)
}