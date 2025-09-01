import { PrismaClient } from "@prisma/client";
import { createRoomDto, roomTypeDto } from "../dto/roomDto";

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
      const room = await prisma.room.findMany({
         where: {
            hotel: hotelId,
            roomType: category,
            roomCount: { gt: 0 }
         }
      })

      if(room.length == 0){
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