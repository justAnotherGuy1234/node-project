import { Request, Response } from "express";
import { CreateUserService, LoginUserService } from "../service/userService";
import { userSignUpDto } from "../dto/userDto";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import SetCookie from "../util/setCookie";

const jwtSecret = process.env.JWT_SECRET

export async function signUpController(req :Request , res : Response) :Promise<any> {
    try {
        
        const {username , email , password , profilePic} = req.body

       const user = await CreateUserService({username , email , password , profilePic}) 


       if (!user){
        return res.status(400).json("failed to create user")
       }

       return res.json({
        msg : "user created successfully",
        data : user

       })
    } catch (e) {
       console.log("error in sign up controller" , e) 
       return res.status(500).json("Internal server error")
    }
}



export async function loginController(req :Request , res : Response) :Promise<any> {
    try {

        const {email , password} = req.body


       if(!jwtSecret){
        console.log("error getting jwt in login method")
        throw new Error("Internal server error")
       }


       const user = await LoginUserService({email , password })

       if (!user){
        return res.status(500).json('Failed to login user')
       }

       const token = jwt.sign({email :  user.email} , jwtSecret , {expiresIn : "1h"})

       SetCookie(res, token )

       return res.json({
        "msg" :"user login successfull",
        "data" : user
       })
    } catch (e) {
       console.log("error in sign up controller" , e) 
       return res.status(500).json("Internal server error")
    }
}


