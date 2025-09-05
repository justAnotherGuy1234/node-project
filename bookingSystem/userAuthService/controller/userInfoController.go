package controller

import (
	"database/sql"
	"fmt"
	"net/http"
	"userAuth/util"
)

type UserInfoController interface {
	GetUserInfo(w http.ResponseWriter, r *http.Request)
}

type UserInfoControllerImpl struct {
	db *sql.DB
}

func NewUserInfoController(db *sql.DB) UserInfoController {
	return &UserInfoControllerImpl{
		db: db,
	}
}

func (uc *UserInfoControllerImpl) GetUserInfo(w http.ResponseWriter, r *http.Request) {

	ctx := r.Context()
	var id int
	userId := ctx.Value("userData")

	if userId != nil {
		id = userId.(int)
	}
	fmt.Println("userId ", id)
	util.JsonResponse(w, map[string]any{
		"userId": id,
	}, 200)

}
