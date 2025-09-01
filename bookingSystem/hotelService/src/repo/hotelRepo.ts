import { PrismaClient } from "@prisma/client";
import { createHotelDto } from "../dto/hotelDto";

const prisma = new PrismaClient()


export async function createHotelRepo(data : createHotelDto) {
    try {
       const hotel = await prisma.hotel.create({data : {
        name : data.name,
        address : data.address
       }}) 

       if(!hotel){
        throw new Error("failed to create new hotel")
       }

       return hotel
    } catch (e) {
       console.log("error in create hotel service" , e) 
       throw e
    }
}

export async function getHotelByIdRepo(id : number){
   try {
     const hotel = await prisma.hotel.findUnique({where : {id : id}}) 

     if(!hotel){
      throw new Error("no hotel found with this")
     }

     return hotel
   } catch (e) {
     console.log("error in get hotel by id repo" , e) 
     throw e
   }
}