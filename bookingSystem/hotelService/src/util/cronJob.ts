import { PrismaClient } from "@prisma/client"
import cron from "node-cron"

const prisma = new PrismaClient()

export async function scheduleTask( hotelId : number , endDate : Date , roomType : "SINGLE" | "DOUBLE" | "FAMILY"){
    
}