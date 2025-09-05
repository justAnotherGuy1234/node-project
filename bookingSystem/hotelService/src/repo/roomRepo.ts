import { PrismaClient } from "@prisma/client";
import { createRoomDto, getRoomDto } from "../dto/roomDto";

const prisma = new PrismaClient()

export async function createRoomRepo(data: createRoomDto) {
   try {
      const room = await prisma.room.create({ data: data })

      if (!room) {
         throw new Error("failed to create room")
      }
      return room
   } catch (e) {
      console.log("error in create room repo", e)
      throw e
   }
}

export async function getRoomByCategoryRepo(category: "SINGLE" | "DOUBLE" | "FAMILY", hotelId: number) {
   try {
      const room = await prisma.room.findFirst({
         where: {
            hotel: hotelId,
            roomType: category,
            roomCount: { gt: 0 }
         }
      })

      if(room?.roomCount == 0){
         throw new Error("no rooms available for this category")
      }
      if (!room) {
         throw new Error("failed to get room by the category request")
      }

      return room

   } catch (e) {
      console.log("error in get room by category repo", e)
      throw e
   }
}

export async function createRoomBookingRepo(data : getRoomDto){
   try {
     const roomBooked = prisma.roomBooked.create({data : data}) 

     if(!roomBooked){
      throw new Error("failed to create room booking")
     }

     return roomBooked
   } catch (e) {
     console.log("error in get room repo " , e) 
     throw e 
   }
}

export async function reduceRoomCountRepo(roomId : number , hotelId : number , roomType : "SINGLE" | "DOUBLE" | "FAMILY" ){
  try {
     const room = await prisma.room.update({
            where: {
               id : roomId ,
                hotel: hotelId,
                roomType: roomType,
                roomCount: { gt: 0 }
            },
            data: {
                roomCount: {
                    decrement: 1
                }
            }
        });

   if(!room){
      throw new Error("no rooms available in this hotel ")
   }


   return room

  } catch (e) {
   console.log("error in reduce room count repo " , e) 
   throw e
  } 
}