import cloudinary from "../config/cloudinaryConfig";
import { loginUserDto, userSignUpDto } from "../dto/userDto";
import { CreateUserRepo, GetUserByEmail } from "../repo/userRepo";
import b from "bcryptjs"


export async function CreateUserService(userData : userSignUpDto){
    try {

        const hashedPassword = await b.hash(userData.password , 10)
        userData.password = hashedPassword


        if(userData.profilePic){
            const uploadImage = await cloudinary.uploader.upload(userData.profilePic)
            userData.profilePic = uploadImage.secure_url
        }

       const user = await CreateUserRepo(userData) 

       if (!user){
        console.log("error in create user service")
        throw new Error("error creating new user")
       }

       return user
    } catch (e) {
        console.log("error in create user service" , e)    
        throw e
    }
}

export async function LoginUserService(userData : loginUserDto) {
    try {

       const user = await GetUserByEmail(userData.email) 


       if(!user){
        throw new Error("error getting user by email ")
       }

       const verifyPassword = await b.compare(userData.password , user.password)

       if(!verifyPassword){
        throw new Error("incorrect credentials")
       }


       return user

    } catch (e) {
        
    }
}