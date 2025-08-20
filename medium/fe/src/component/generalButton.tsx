interface ButtonProps {
    buttonText : string
    onClick? : (e : any) => void
    size : "sm" | "md" | "lg"
    varientStyle : "primary" | "secondary"
}

const varientStyle = {
    "primary" : "bg-black text-white text-center",
    "secondary" : "bg-white border-2 border-black text-center"
}

const size = {
    "sm" : "text-lg p-2 ",
    "md" : "text-xl p-3",
    "lg" : "text-2xl p-4"
}



export default function GeneralButton(props : ButtonProps){
    return (
        <button type="submit" onClick={props.onClick} className={`${varientStyle[props.varientStyle]} ${size[props.size]}`}>
            {props.buttonText}
        </button>
    )
}