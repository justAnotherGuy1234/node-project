import { Request, Response } from "express";
import {v4 as uuidV4} from "uuid"
import { confirmBookingService, createBookingService } from "../service/bookingService";

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
       return res.status(500).json({msg : "Internal server error" , error :  e || "unknown error"})
    }
}

export async function confirmBookingController(req : Request , res : Response) :Promise<any> {
    try {
       const {bookingId, userId , hotelId ,  idempotencyKey} = req.body 

       const booking = await confirmBookingService({bookingId , userId , hotelId , idempotencyKey})

       if(!booking){
        return res.status(500).json("failed to confrim booking")
       }

       
       return res.json(booking)
    } catch (e : any) {
        return res.status(500).json({msg : "Internal server error test" , error : e || "unkown error"})
    }
}