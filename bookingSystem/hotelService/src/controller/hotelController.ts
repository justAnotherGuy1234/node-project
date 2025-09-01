import { Request, Response } from "express";
import { createHotelService, getHotelByIdService } from "../service/hotelService";

export async function createHotelController(req: Request, res: Response): Promise<any> {
    try {
        const { name, address } = req.body

        const hotel = await createHotelService({ name, address })

        if (!hotel) {
            return res.status(500).json("failed to created new hotel")
        }

        return res.json({
            msg: "created new hotel",
            data: hotel
        })

    } catch (e) {
        console.log("error in create hotel controller", e)
        return res.status(500).json({
            msg: "Internal server error",
            error: e
        })
    }
}

export async function getHotelByIdController(req : Request , res : Response):Promise<any> {
    try {
        const id = req.params.id


        if(!id){
            return res.json("no hotel id found in url params")
        }

        const hotelId = parseInt(id)

        const hotel = await getHotelByIdService(hotelId)

        if(!hotel){
            return res.json("failed to get hotel by id")
        }

        return res.json({
            msg : "got hotel with id provided",
            data : hotel
        })
    } catch (e : any) {
       console.log("error in get hotel by id controller" , e) 
       return res.status(500).json({
        msg : "Internal server error",
        error : e
       })
    }
}