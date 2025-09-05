import { Request, Response } from "express";
import { createRoomService, getRoomByCategoryService, getRoomService } from "../service/roomService";
import axios from "axios";



export async function createRoomController(req: Request, res: Response): Promise<any> {
   try {
      const { hotel, price, roomType, roomCount, dataOfAvailability } = req.body

      const room = await createRoomService({ hotel, price, roomType, roomCount, dataOfAvailability })

      if (!room) {
         return res.status(500).json("failed to create new room")
      }

      return res.json({
         msg: "created room successfully",
         data: room
      })

   } catch (e) {
      console.log("error in create room controller", e)
      return res.status(500).json({
         msg: "Internal server error",
         error: e
      })
   }
}

export async function getRoomByCategoryController(req: Request, res: Response): Promise<any> {
   try {
      const { roomType, hotelId } = req.body

      const room = await getRoomByCategoryService(roomType, hotelId)

      if (!room) {
         return res.json("failed to get room by category")
      }

      return res.json({
         msg: "got room by category requested",
         data: room
      })
   } catch (e: any) {
      console.log("error in get room by category controller", e)
      return res.status(500).json({
         msg: "Internal server error",
         error: e.message
      })
   }
}

export async function getRoomController(req: Request, res: Response): Promise<any> {
   try {

      console.log("cookies" , req.cookies.token)

      // let userId 
      // try {
      //   const res = await axios.get("http://localhost:6000/api/v0/info/get-user-info" , {headers : {
      //    "Cookie" : `token=${req.cookies.token}`
      //   }})

      //   console.log("res from hotel service" , res.data.userId)

      //   userId = res.data.userId
        
      // } catch (e:any) {
      //    console.log("failed to get data in from go api in get room controller", e.message) 
      //    return res.status(500).json("internal server error")
      // }

      const { hotel, userId , roomType, startDate, endDate, pricePayed } = req.body
      const room = await getRoomService({ hotel, userId , roomType, startDate, endDate, pricePayed })


      if(!room){
         return res.json("failed to book room")
      }

      return res.json({
         msg : "created new room booking",
         data : room
      })
      }catch (e: any) {
         console.log("error in get room controller", e)
         return res.status(500).json({
            msg: "Internal server error",
            error: e.message
         })
      }
   }