import { PrismaClient } from "@prisma/client";
import { createBookingDto } from "../dto/bookingDto";

const prisma = new PrismaClient()

export async function createBookingRepo(data : createBookingDto) {
    try {
       const newBooking = await prisma.booking.create({data : data}) 

       if(!newBooking){
        throw new Error("failed to create new booking")
       }

       return newBooking
    } catch (e) {
        console.log("error in create booking repo" , e)
        throw e
    }
}

export async function confirmBooking(tx : any , bookingId : number) {
    const booking = await tx.booking.update({where : {id : bookingId}  , data : {bookingStatus : "CONFIRM"}})

    return booking
}

export async function getBookingById(id :number){
    try {
       const booking = await prisma.booking.findUnique({where : {id : id}}) 
    
       if(!booking){
        throw new Error("no found with this id")
       }

       return booking
    } catch (e) {
       console.log("error in get booking by id" , e) 
       throw e 
    }
}