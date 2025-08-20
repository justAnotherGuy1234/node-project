import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../util/axios";

interface AuthStoreType {
    authUser : any | null 
    signup : (data : any) => Promise<void>
    login : (data : any) =>Promise<any>
}

export const useAuthStore = create<AuthStoreType>((set)=>({
    authUser : null,
    //todo : add a loader when request is being send

    signup : async(data : any)=>{
        try {
           const res = await axiosInstance.post("/users/signup" , data ) 

           set({authUser : res.data})

           toast.success("sign up successfull")
        } catch (e) {
            console.log("error in signup store " , e)
            toast.error("Some error occured")
        }
    },

    login : async(data : any) => {
        try {
           const res = await axiosInstance.post("/users/login" , data ) 

           set({authUser : res.data})
        } catch (e) {
            console.log("error in signup store " , e)
            toast.error("Some error occured")
        }
    }
}))

