import { useState } from "react"
import GeneralButton from "../component/generalButton"
import GeneralForm from "../component/generalForm"
import { useAuthStore } from "../store/useAuthStore"

export default function SignUpPage(){
    const [username , setUsername] = useState("")    
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [profilePic , setProfilePic] = useState("")

    const {signup} = useAuthStore()

    const input = [
        {
            label : "Add Username",
            value : username,
            onChange : (e : React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value),
            placeholder : "Add username",
            type : "text"
        },
        {
            label : "Add Email",
            value : email,
            onChange : (e : React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value),
            placeholder : "Add Email",
            type : "text"
        },
        {
            label : "Add Password",
            value : password,
            onChange : (e : React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value),
            placeholder : "Add Password",
            type : "text"
        },
        {
            label : "Add Profile Image",
            value : "",
            placeholder : "Add profile Image",
            type : "file",
            onChange : handleFileChange
        }
    ]

    function handleFileChange(e : any){
        const file = e.target.files[0]

        console.log("file  " ,  file)
        const reader = new FileReader()

        reader.onload = function(e){
            const res = e.target?.result as string 

            console.log("res " ,res)
            setProfilePic(res)
        }
        reader.readAsDataURL(file)
    }


    function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        signup({username , email , password , profilePic})
    }

    return (
        <div>
            <GeneralForm headline="Sign Up" input={input} button={<GeneralButton buttonText="Submit" varientStyle="primary" size="md" onClick={handleSubmit} />}  />
        </div>
    )
}