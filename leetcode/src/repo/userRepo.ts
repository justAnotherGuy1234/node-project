import { PrismaClient } from "@prisma/client";
import { createUserDto, loginUserDto } from "../dto/userDto";

const prisma = new PrismaClient()

export async function createUserRepo (data : createUserDto) {
    try {
       const user = await prisma.user.findUnique({where : {email : data.email}})


       if(user){
        throw new Error("user with this email already exists")
       }

       const newUser = await prisma.user.create({data : {
        username : data.username,
        email : data.email,
        password : data.password
       }})


       if (!newUser){
        throw new Error("failed to create new user")
       }

       return newUser
    } catch (e) {
       console.log("error in create user repo" , e) 
        throw e
    }
}


export async function GetUserByEmail(email : string){
    try {
       const user = await prisma.user.findUnique({where : {email : email}}) 
    
       if(!user){
        throw new Error("no user found with this email")
       }

       return user
    } catch (e) {
       console.log("error in get user by email" , e) 
       throw e
    }
}