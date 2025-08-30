import { v4 as uuidV4, validate } from "uuid"
import { confirmBookingDto, createBookingDto } from "../dto/bookingDto";
import { createBookingRepo, getBookingById } from "../repo/bookingRepo";
import Redlock from "redlock";
import { redLock } from "../config/redis";
import { PrismaClient } from "@prisma/client";
import {uuid as uuidValidate} from "uuid"
const prisma = new PrismaClient()

export async function createBookingService(data: createBookingDto) {
  try {

    const ttl = 5000
    const bookingResource = `hotelId: ${data.hotelId}`

    console.log("booking service", bookingResource)

    await redLock.on("error", (error) => {
      console.log("error in creating red lock")
    }).acquire([bookingResource], ttl)

    const booking = await createBookingRepo(data)

    if (!booking) {
      throw new Error("failed to create booking")
    }

    return booking

  } catch (e) {
    throw ("failed to aquire lock on resource")
  }
}

export async function confirmBooking(data: confirmBookingDto) {
  try {

    const booking = await prisma.$transaction(async (tx) => {


      const bookingId = await getBookingById(data.bookingId)

      if (bookingId.bookingStatus == "CONFIRM") {
        throw new Error("booking is already confirm")
      }


    })

  } catch (e) {

  }
}