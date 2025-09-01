import { createHotelDto } from "../dto/hotelDto";
import { createHotelRepo, getHotelByIdRepo } from "../repo/hotelRepo";

export async function createHotelService(data: createHotelDto) {
  try {
    const hotel = await createHotelRepo(data)

    if (!hotel) {
      throw new Error("failed to create new hotel")
    }

    return hotel
  } catch (e) {
    console.log("error in create hotel service", e)
    throw e
  }
}

export async function getHotelByIdService(id: number) {
  try {
    const hotel = await getHotelByIdRepo(id)

    if (!hotel) {
      throw new Error("no hotel found with this")
    }

    return hotel
  } catch (e) {
    console.log("error in get hotel by id service " , e)
    throw e
  }
}

