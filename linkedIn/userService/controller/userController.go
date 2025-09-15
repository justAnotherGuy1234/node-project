package controller

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"time"
	"userService/dto"
	"userService/util"

	"github.com/go-sql-driver/mysql"
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
		http.Error(w, "failed to read json data", 500)
	}

	query := "INSERT INTO User (username , email , password) VALUES(? , ? , ? )"

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userData.Password), 10)

	if err != nil {
		fmt.Println("error hashing password")
		http.Error(w, "error hashing password", 500)
		return
	}

	res, err := uc.db.Exec(query, userData.Username, userData.Email, hashedPassword)

	if err != nil {
		if mysqlErr, ok := err.(*mysql.MySQLError); ok && mysqlErr.Number == 1062 {
			util.SendJson(w, 400, map[string]any{
				"msg": "user with this username or email already exists",
			})
			return
		} else {
			fmt.Println("error in db exec", err)
			return
		}
	}

	rowsAffected, err := res.RowsAffected()

	if err != nil {
		fmt.Println("error in query exec", err)
	}

	if rowsAffected > 0 {
		util.SendJson(w, 200, map[string]any{
			"msg":  "user created",
			"data": userData,
		})
		return
	}

}

type loginResponse struct {
	id       int
	username string
	email    string
	password string
}

func (uc *UserControllerImpl) LoginUser(w http.ResponseWriter, r *http.Request) {
	var loginUser dto.LoginUserDto

	if err := util.ReadJson(r, &loginUser); err != nil {
		http.Error(w, "failed to read data", 500)
	}

	query1 := "SELECT id , username , email , password FROM User WHERE email = ?"

	var userData loginResponse

	res := uc.db.QueryRow(query1, loginUser.Email).Scan(&userData.id, &userData.username, &userData.email, &userData.password)

	fmt.Println("hashed password", userData.password)

	verifyPassword := bcrypt.CompareHashAndPassword([]byte(userData.password), []byte(loginUser.Password))

	if verifyPassword != nil {
		http.Error(w, "incorrect password", 400)
		fmt.Println("verify password error", verifyPassword)
		return
	}

	if res != nil {
		if res == sql.ErrNoRows {
			http.Error(w, "no user found with email", 400)
			return
		}
		http.Error(w, "internal server error", 500)
		return
	}

	payload := jwt.MapClaims{
		"username": userData.username,
		"email":    userData.email,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)

	if err := godotenv.Load(); err != nil {
		fmt.Println("failed to load data from .env in login user")
	}

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		http.Error(w, "failed to create jwt", 500)
	}

	cookie := http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: time.Now().Add(1 * time.Hour),
		Path:    "/",
		Domain:  "*",
	}

	http.SetCookie(w, &cookie)

	util.SendJson(w, 200, map[string]any{
		"msg": "logged in ",
		"data": map[string]any{
			"username": userData.username,
			"email":    userData.email,
		},
	})
}
