import { createRoomDto, getRoomDto } from "../dto/roomDto";
import { createRoomBookingRepo, createRoomRepo, getRoomByCategoryRepo, reduceRoomCountRepo} from "../repo/roomRepo";

export async function createRoomService(data : createRoomDto){
    try {
       const room = await createRoomRepo(data) 

       if(!room){
        throw new Error("failed to create new room")
       }

       return room
    } catch (e) {
       console.log("error in create room" , e) 
        throw e
    }
}

export async function getRoomByCategoryService(category: "SINGLE" | "DOUBLE" | "FAMILY", hotelId: number) {
    try {
       const room = await getRoomByCategoryRepo(category , hotelId) 

       if(!room){
        throw new Error("failed to get room by category")
       }

       return room
    } catch (e) {
       console.log("error in get room by category service" , e) 
       throw e
    }
}

export async function getRoomService(data : getRoomDto) {
   try {
      const currentDate = new Date

     if(data.startDate < currentDate){
      throw new Error("start date should be of today or future")
     } 

     if (data.endDate < data.startDate){
      throw new Error("end date cannot be before start date")
     }

     const checkRoom = await getRoomByCategoryRepo(data.roomType , data.hotel)

     if(!checkRoom){
      throw new Error("failed to get room by category" )
     }

     const room = await createRoomBookingRepo(data)

     if(!room){
      throw new Error("failed to create new room booking ")
     }

     let roomId = checkRoom.id

     const updateRoom = await reduceRoomCountRepo( roomId , room.hotel , room.roomType)

     if(!updateRoom){
      throw new Error("failed to update room count  ")
     }

     return room

   } catch (e) {
      console.log('error in get room service ' , e)      
      throw e
   }
}