import { Routes , Route } from "react-router-dom"
import ChatPage from "./pages/chatPage"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/chat/:receiverName" element={<ChatPage/>}/>
      </Routes>
      
    </div>
  )
}

export default App
