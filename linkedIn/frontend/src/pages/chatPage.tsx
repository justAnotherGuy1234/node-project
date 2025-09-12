import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"

const socket = io("http://localhost:4000")


interface msgType {
    msg: String
    senderName: String
}

export default function ChatPage() {
    const [senderName, setSenderName] = useState("")
    const [confirmSenderName, setConfirmSenderName] = useState("")
    const { receiverName } = useParams()
    const [msg, setMsg] = useState("")
    const [socketId, setSocketId] = useState("")

    const [allMsgs, setAllMsgs] = useState<msgType[]>([])
    const [gotMsgFrom, setGotMsgFrom] = useState("")
    const [gotMsg, setGotMsg] = useState("")

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to socket", socket.id)
            setSocketId(socket.id!)
        })

        socket.on("socket-added", (data) => {
            console.log(data)
        })

        socket.on("rcv-msg", ({ confirmSenderName, msg }) => {
            console.log("got msg from ", confirmSenderName, msg)
            // setGotMsgFrom(confirmSenderName)
            // setGotMsg(msg)
            setAllMsgs(prev => [...prev , { msg, senderName: confirmSenderName }])
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    function submitMsg() {
        socket.emit("send-msg", { confirmSenderName, receiverName, msg, socketId })
    }

    function sendUsername(e: any) {
        e.preventDefault()
        socket.emit("user-connected", { senderName, socketId })
        setConfirmSenderName(senderName)
        setSenderName("")
    }

    return (
        <div>
            <h1 className="mb-5">Sending to {receiverName}</h1>
            <h1 className="mb-5">Socket Id {socketId}</h1>
            chat page
            <div>
                <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="send msg" className="p-2 border border-black" />
                <button onClick={submitMsg} className="p-2 border border-black">send msg</button>
            </div>
            <div>
                <h1>Sender Name</h1>
                <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="enter senderId" className="border border=black" />
                {/* when connecting to other service . user details will from jwt stored in cookies */}
                <button onClick={sendUsername}>send user details to server</button>
            </div>
            <div>your name {confirmSenderName}</div>
            <div className="mt -10">
                Messages
                {allMsgs.map((v , i)=>{
                    return <div key={i}>{v.senderName} - {v.msg}</div>
                })}
            </div>
        </div>
    )
}