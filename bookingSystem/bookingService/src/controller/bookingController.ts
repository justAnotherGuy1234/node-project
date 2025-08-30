import { Request, Response } from "express";
import {v4 as uuidV4} from "uuid"
import { createBookingService } from "../service/bookingService";

export async function createBookingController(req : Request , res : Response) : Promise<any> {
    try {
        let {userId , hotelId , totalGuest} = req.body

        const newKey = uuidV4()

        const idempotencyKey = newKey

        const booking = await createBookingService({userId , hotelId , idempotencyKey , totalGuest})

        if(!booking){
            return res.status(500).json("failed to create booking")
        }

        return res.json({
            msg : "created booking",
            data : {
                bookingId : booking.id,
                idempotencyKey : booking.idempotencyKey
            }
        })
    } catch (e : any) {
       console.log("error in create booking controller" , e) 
       return res.status(500).json({msg : "Internal server errro" , error :  e || "unknown error"})
    }
}