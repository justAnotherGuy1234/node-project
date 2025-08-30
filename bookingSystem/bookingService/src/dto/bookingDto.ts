export type createBookingDto =  {
    userId : number
    hotelId : number
    totalGuest : number
    idempotencyKey : string
}