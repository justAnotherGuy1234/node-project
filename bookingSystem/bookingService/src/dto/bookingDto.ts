export type createBookingDto =  {
    userId : number
    hotelId : number
    totalGuest : number
    idempotencyKey : string
}

export type confirmBookingDto = {
    bookingId : number 
    userId : number 
    hotelId : number
    idempotencyKey : string
}
