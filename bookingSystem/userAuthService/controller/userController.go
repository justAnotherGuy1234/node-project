package controller

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"time"
	"userAuth/dto"
	"userAuth/util"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

type UserController interface {
	CreateUser(w http.ResponseWriter, r *http.Request)
	LoginUser(w http.ResponseWriter, r *http.Request)
}

type UserControllerImpl struct {
	db *sql.DB
}

func NewUserController(db *sql.DB) UserController {
	return &UserControllerImpl{
		db: db,
	}
}

func (uc *UserControllerImpl) CreateUser(w http.ResponseWriter, r *http.Request) {
	var userData dto.CreateUserDto

	if err := util.ReadJson(r, &userData); err != nil {
		fmt.Println("error reading json", err)
		return
	}

	query := "SELECT email FROM User WHERE email = ? "

	err := uc.db.QueryRow(query, userData.Email).Scan()

	if err == sql.ErrNoRows {

		query1 := "INSERT INTO User  (username , email , password) VALUES ( ? , ? , ?)"

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userData.Password), 10)

		if err != nil {
			fmt.Println("error hashing password", err)
			return
		}

		result, err := uc.db.Exec(query1, userData.Username, userData.Email, hashedPassword)

		if err != nil {
			fmt.Println("error executing insert query in db")
			return
		}

		rowsAffected, err := result.RowsAffected()

		if rowsAffected > 0 {
			util.JsonResponse(w, map[string]any{
				"msg": "created user successfully",
				"data": map[string]any{
					"username": userData.Username,
					"email":    userData.Email,
					"password": userData.Password,
				},
			}, 200)
		} else {
			http.Error(w, "failed to create new user", 500)
			return
		}
	} else {
		http.Error(w, "user already exists with this email", 400)
	}
}

type loginResponse struct {
	id       int
	username string
	email    string
	password string
}

func (uc *UserControllerImpl) LoginUser(w http.ResponseWriter, r *http.Request) {
	var loginUserDto dto.LoginUser

	if err := util.ReadJson(r, &loginUserDto); err != nil {
		fmt.Println("error reading json data", err)
		return
	}

	var user loginResponse

	query := "SELECT id , username , email , password FROM User WHERE email = ?"

	err := uc.db.QueryRow(query, loginUserDto.Email).Scan(&user.id, &user.username, &user.email, &user.password)

	if err == sql.ErrNoRows {
		http.Error(w, "no user found with this email", 400)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.password), []byte(loginUserDto.Password)); err != nil {
		http.Error(w, "incorrect password", 400)
		return
	}

	payload := jwt.MapClaims{
		"userId":   user.id,
		"email":    user.email,
		"username": user.username,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)

	err = godotenv.Load()

	if err != nil {
		fmt.Println("error getting data from env", err)
	}

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		fmt.Println("something went wrong", err)
	}

	cookie := http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		Domain:   "",
	}

	http.SetCookie(w, &cookie)

	util.JsonResponse(w, map[string]any{
		"msg":      "logged in user",
		"id":       user.id,
		"email":    user.email,
		"username": user.username,
	}, 200)

}
