import { Prisma, PrismaClient } from "@prisma/client";
import { createBookingDto } from "../dto/bookingDto";

const prisma = new PrismaClient()

export async function createBookingRepo(data: createBookingDto) {
  try {
    const newBooking = await prisma.booking.create({ data: data })

    if (!newBooking) {
      throw new Error("failed to create new booking")
    }

    return newBooking
  } catch (e) {
    console.log("error in create booking repo", e)
    throw e
  }
}

export async function confirmBookingRepo(tx: Prisma.TransactionClient, bookingId: number, idempotencyKey: string, hotelId: number, userId: number) {

  try {
    const booking = await tx.booking.update({
      where: {
        id: bookingId,
        userId: userId,
        bookingStatus: "PENDING",
        hotelId: hotelId,
        idempotencyKey: idempotencyKey
      },
      data: { bookingStatus: "CONFIRM" }
    })


    if (!booking) {
      throw new Error("failed to update booking in confirm booking")
    }

    return booking

  } catch (e) {
    console.log("error in confirm booking repo", e)
    throw e
  }
}

type res = {
  id: number,
  userId: number,
  hotelId: number,
  bookingStatus: string,
  totalGuest: number,
  createdAt: Date,
  updatedAt: Date,
  idempotencyKey: string

}
export async function getIdemptencyKeyWithLock(tx: Prisma.TransactionClient, idempotencyKey: string) {
  try {
    const key: Array<res> = await tx.$queryRaw` SELECT * FROM Booking WHERE idempotencyKey = ${idempotencyKey} FOR UPDATE `

    if (!key || key.length == 0) {
      throw new Error('idempotency key not found . create a booking first')
    }
    return key

  } catch (e) {
    console.log("error in get idempotency key with lock", e)
    throw e
  }
}

export async function getBookingById(id: number) {
  try {
    const booking = await prisma.booking.findUnique({ where: { id: id } })

    if (!booking) {
      throw new Error("no found with this id")
    }

    return booking
  } catch (e) {
    console.log("error in get booking by id repo", e)
    throw e
  }
}