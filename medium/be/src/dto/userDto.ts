export type userSignUpDto = {
    username : string 
    email : string 
    password : string 
    profilePic? : string 
}

export type loginUserDto =  {
    email : string 
    password : string 
}