import Redis from "ioredis";


const redisConfig = {
    host : "localhost",
    port : 6379,
    maxRetriesPerRequest : null    
}

const redis = new Redis(redisConfig)


redis.on("connect" , ()=>{
    console.log("redis connected in evaluation service")
})

redis.on("error" , (error) => {
    console.log("error connecting to redis in evaluation service")
})

export const createNewRedisConnection = () => {
    return new Redis(redisConfig) 
}