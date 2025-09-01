import { Request, Response } from "express";
import { createRoomService, getRoomByCategoryService } from "../service/roomService";

export async function createRoomController(req : Request , res : Response) :Promise<any> { 
    try {
       const {hotel , price , roomType , roomCount , dataOfAvailability} = req.body 

       const room = await createRoomService({hotel , price , roomType , roomCount , dataOfAvailability})

       if(!room){
        return res.status(500).json("failed to create new room")
       }

       return res.json({
        msg : "created room successfully",
        data : room
       })

    } catch (e) {
       console.log("error in create room controller" , e) 
       return res.status(500).json({
        msg : "Internal server error",
        error : e
       })
    }
}

export async function getRoomByCategoryController(req : Request , res : Response) :Promise<any> {
   try {
      const {roomType , hotelId} = req.body

      const room = await getRoomByCategoryService(roomType , hotelId)

      if(!room){
         return res.json("failed to get room by category")
      }

      return res.json({
         msg : "got room by category requested",
         data : room
      })
   } catch (e : any) {
     console.log("error in get room by category controller" , e ) 
      return res.status(500).json({
         msg : "Internal server error",
         error : e.message
      })
   }
}