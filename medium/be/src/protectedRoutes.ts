import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import { GetUserByEmail } from "./repo/userRepo";

const jwtSecret = process.env.JWT_SECRET

interface IUser {
    id : number 
    username : string 
    email : string 
}

declare global{
    namespace Express {
        interface Request {
            user : IUser 
        }
    }
}

export async function ProtectedRoute(req : Request , res : Response , next : NextFunction) :Promise<any> {
    try {
        const cookie = req.cookies.token


        if (!cookie){
            return res.status(400).json("no cookies found")
        }

        if(!jwtSecret){
            console.log("failed to get jwt from env in protected routes")
            return 
        }

        const verifyToken = jwt.verify(cookie , jwtSecret) as JwtPayload

        if (!verifyToken){
            return res.status(400).json("incorrect token login again")
        }

        const email = verifyToken.email 

        const user = await GetUserByEmail(email)

        if (!user){
            console.log("failed to get user from get user email in protected routes")
            return 
        }

        req.user = user

        next()
    } catch (e) {
       console.log("error in protected routes" , e) 
       return res.status(500).json("Internal server error")
    }
}