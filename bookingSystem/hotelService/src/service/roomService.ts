import { createRoomDto } from "../dto/roomDto";
import { createRoomRepo, getRoomByCategoryRepo } from "../repo/roomRepo";

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