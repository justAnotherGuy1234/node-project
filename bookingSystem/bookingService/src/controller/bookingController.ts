import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid"
import { confirmBookingService, createBookingService } from "../service/bookingService";
import axios from "axios";

export async function createBookingController(req: Request, res: Response): Promise<any> {

    let userId
    try {

        console.log("cookie in booking controller", req.cookies.token)
        try {
            const res = await axios.get("http://localhost:6000/api/v0/info/get-user-info", {
                headers: {
                    "Cookie": `token=${req.cookies.token}`
                }
            })

            console.log("res from booking service", res.data.userId)

            userId = res.data.userId
        } catch (e: any) {
            console.log("failed to get data in from go api in get room controller", e.message)
            return res.status(500).json("internal server error")
        }

        let { hotelId, totalGuest, roomType, startDate, endDate, pricePayed } = req.body
        let hotel = hotelId

        let result: any
        let result1: any

        try {
            result = await axios.post("http://localhost:5000/api/v0/room/category", { hotelId, roomType })
            console.log("reached result req")
            if (!result) {
                return res.json("failed to get room of this category ")
            }

            if (result.data.data.roomCount == 0) {
                return res.json({
                    msg: "no rooms available in this hotel of the category requested",
                    data: result.data
                })
            }

            if (result.data.data.dataOfAvailability > startDate) {
                return res.json("cannot create a booking before hotel makes the room available")
            }

            let roomId = result.data.data.id

            console.log("completed result request")
            if (result.data.data.roomCount > 0) {
                result1 = await axios.post("http://localhost:5000/api/v0/room/room-booking", {
                    roomId, userId, hotel, roomType, startDate, endDate, pricePayed, headers: {
                        "Cookie": `token=${req.cookies.token}`
                    }
                })

                if (!result1) {
                    return res.json({
                        msg: "failed to create room booking"
                    })
                }

                console.log("result 1 ", result1.data)

            }

        } catch (e: any) {
            console.log("error hitting hotel api in booking service", e)
            return res.json({
                msg: "Internal server error",
                error: e.response.data.error
            })
        }

        const newKey = uuidV4()

        const idempotencyKey = newKey

        const booking = await createBookingService({ userId, hotelId, idempotencyKey, totalGuest })

        if (!booking) {
            return res.status(500).json("failed to create booking")
        }

        return res.json({
            msg: "created booking",
            data: {
                bookingId: booking.id,
                idempotencyKey: booking.idempotencyKey
            }
        })
    } catch (e: any) {
        console.log("error in create booking controller", e)
        return res.status(500).json({ msg: "Internal server error", error: e || "unknown error" })
    }
}

export async function confirmBookingController(req: Request, res: Response): Promise<any> {
    let userId
    try {
        const { bookingId,  hotelId, idempotencyKey , roomType , startDate , endDate , pricePayed } = req.body

        try {
            const res = await axios.get("http://localhost:6000/api/v0/info/get-user-info", {
                headers: {
                    "Cookie": `token=${req.cookies.token}`
                }
            })

            console.log("res from booking service", res.data.userId)

            userId = res.data.userId
        } catch (e: any) {
            console.log("failed to get data in from go api in get room controller", e.message)
            return res.status(500).json("internal server error")
        }


        let hotel = hotelId

        let result: any
        let result1: any

        try {
            result = await axios.post("http://localhost:5000/api/v0/room/category", { hotelId, roomType })
            console.log("reached result req")
            if (!result) {
                return res.json("failed to get room of this category ")
            }

            if (result.data.data.roomCount == 0) {
                return res.json({
                    msg: "no rooms available in this hotel of the category requested",
                    data: result.data
                })
            }

            if (result.data.data.dataOfAvailability > startDate) {
                return res.json("cannot create a booking before hotel makes the room available")
            }

            let roomId = result.data.data.id

            console.log("completed result request")
            if (result.data.data.roomCount > 0) {
                result1 = await axios.post("http://localhost:5000/api/v0/room/room-booking", {
                    roomId, userId, hotel, roomType, startDate, endDate, pricePayed, headers: {
                        "Cookie": `token=${req.cookies.token}`
                    }
                })

                if (!result1) {
                    return res.json({
                        msg: "failed to create room booking"
                    })
                }

                console.log("result 1 ", result1.data)

            }

        } catch (e: any) {
            console.log("error hitting hotel api in booking service", e)
            return res.json({
                msg: "Internal server error",
                error: e.response.data.error
            })
        }


        const booking = await confirmBookingService({ bookingId, userId, hotelId, idempotencyKey })

        if (!booking) {
            return res.status(500).json("failed to confrim booking")
        }


        return res.json(booking)
    } catch (e: any) {
        return res.status(500).json({ msg: "Internal server error test", error: e || "unkown error" })
    }
}

export function test(req: Request, res: Response) {
    return res.json("test")
}