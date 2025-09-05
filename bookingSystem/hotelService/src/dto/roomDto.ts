export type createRoomDto = {
  hotel : number
  roomType : "SINGLE" | "DOUBLE" | "FAMILY"
  price : string  
  roomCount : number
  dataOfAvailability : Date
}

export type getRoomDto = {
  hotel : number
  userId : number
  roomType : "SINGLE" | "DOUBLE" | "FAMILY"
  startDate : Date
  endDate : Date
  pricePayed : string
}