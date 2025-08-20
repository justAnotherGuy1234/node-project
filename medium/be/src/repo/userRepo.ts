import { Prisma, PrismaClient } from "@prisma/client";
import { userSignUpDto } from "../dto/userDto";

const prisma = new PrismaClient()

export async function CreateUserRepo(userData : userSignUpDto ) {
    try {
        const user = await prisma.user.findUnique({where : {email : userData.email}})

        if(user){
            throw new Error("user with email already exists")
        }

        const newUser = await prisma.user.create({data : {
            username : userData.username,
            email : userData.email,
            password : userData.password,
            profilePic : userData.profilePic
        }})

        if(!newUser){
            throw new Error("error creating new user")
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