import { v4 as uuidV4, validate } from "uuid"
import { confirmBookingDto, createBookingDto } from "../dto/bookingDto";
import { confirmBookingRepo, createBookingRepo, getBookingById, getIdemptencyKeyWithLock } from "../repo/bookingRepo";
import Redlock from "redlock";
import { redLock } from "../config/redis";
import { PrismaClient } from "@prisma/client";
import { validate as uuidValidate } from "uuid"
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

export async function confirmBookingService(data: confirmBookingDto) {
  try {
    return await prisma.$transaction(async (tx) => {
      if (!uuidValidate(data.idempotencyKey)) {
        throw new Error("incorrect idempotency key")
      }

      console.log(data.idempotencyKey, "idempotency key in confirm booking service")
      const checkBooking = await getIdemptencyKeyWithLock(tx, data.idempotencyKey)


      if (!checkBooking) {
        throw new Error("failed to get idempotency key with lock")
      }

      const currentBooking = checkBooking[0]

      if (currentBooking.bookingStatus == "CONFIRM") {
        throw new TypeError("booking is already confirmed")
      }

      const confirmBooking = await confirmBookingRepo(tx, data.bookingId, data.idempotencyKey, data.hotelId, data.userId)

      if (!confirmBooking) {
        throw new Error("failed to confirm booking")
      }

      return confirmBooking

    })
  } catch (e : any) {
    if (e instanceof TypeError){
      throw "booking is already confirmed"
    }
    throw e
  }
}

