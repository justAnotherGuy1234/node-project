package dto

type CreateUserDto struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginUserDto struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
