package controller

import (
	"database/sql"
	"net/http"
	"userService/util"
)

type ProtectedController interface {
	ProtectedRoute(w http.ResponseWriter, r *http.Request)
	GetUserData(w http.ResponseWriter, r *http.Request)
}

type ProtectedControllerImpl struct {
	db *sql.DB
}

func NewProtectedController(db *sql.DB) ProtectedController {
	return &ProtectedControllerImpl{
		db: db,
	}
}

func (pc *ProtectedControllerImpl) ProtectedRoute(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var mainUserEmail string

	userData := ctx.Value("userData")

	if userData != nil {
		mainUserEmail = userData.(string)
	}

	util.SendJson(w, 200, map[string]any{
		"msg":  "got user email",
		"data": mainUserEmail,
	})
}

type userData struct {
	id       int
	username string
	email    string
}

func (pc *ProtectedControllerImpl) GetUserData(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var mainUserEmail string

	userEmail := ctx.Value("userData")

	if userEmail != nil {
		mainUserEmail = userEmail.(string)
	}

	query := "SELECT id , username , email FROM User WHERE email = ?"

	var userInfo userData

	res := pc.db.QueryRow(query, mainUserEmail).Scan(&userInfo.id, &userInfo.username, &userInfo.email)

	if res != nil {
		if res == sql.ErrNoRows {
			http.Error(w, " no data found with the email in token", 400)
			return
		}
		http.Error(w, "internal server error", 500)
		return
	}

	payload := map[string]any{
		"id":       userInfo.id,
		"username": userInfo.username,
		"email":    userInfo.email,
	}

	util.SendJson(w, 200, payload)
}
