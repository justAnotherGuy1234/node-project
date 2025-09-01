export type createRoomDto = {
  hotel : number
  roomType : "SINGLE" | "DOUBLE" | "FAMILY"
  price : string  
  roomCount : number
  dataOfAvailability : Date
}

export type roomTypeDto = {
  roomType : "SINGLE" | "DOUBLE" | "FAMILY"
}