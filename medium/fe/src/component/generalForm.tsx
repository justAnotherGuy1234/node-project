import type { ReactElement } from "react"

interface FormProps {
    headline : string 
    button : ReactElement
    input : IInput[]
}


interface IInput {
    label : string 
    value : string | undefined 
    type : string
    placeholder : string 
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
}

export default function GeneralForm(props : FormProps){
    return (
        <form>
            <div className="pb-3">{props.headline}</div>
            {props.input.map((item)=>(
                <div className="m-2">
                    <label>{item.label}</label>
                    <input className="ml-8 border-2 border-black" type={item.type} value={item.value} placeholder={item.placeholder} onChange={item.onChange} />
                </div>
            ))}
            <button>{props.button}</button>
        </form>
    )
}