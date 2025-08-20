import { Routes , Route } from "react-router-dom"
import SignUpPage from "./page/signupPage"
import LoginPage from "./page/loginPage"
import HomePage from "./page/homePage"
import CreateBlogPage from "./page/createBlogPage"

export default function App(){
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/create-blog" element={<CreateBlogPage/>} />
      </Routes>
    </div>
  )
}