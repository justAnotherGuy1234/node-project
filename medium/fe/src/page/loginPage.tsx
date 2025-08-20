import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import GeneralForm from "../component/generalForm"
import GeneralButton from "../component/generalButton"

export default function LoginPage(){
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    
    const {login} = useAuthStore()

    const input = [
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
        }
    ]

    function handleSubmit(e : React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        login({email , password})
    }


    return (
        <div>
            <GeneralForm headline="login" input={input} button={<GeneralButton buttonText="Submit" varientStyle="primary" size="md" onClick={handleSubmit} />}  />
        </div>
    )
}