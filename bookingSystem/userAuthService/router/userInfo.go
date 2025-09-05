package router

import (
	"userAuth/controller"

	"github.com/go-chi/chi/v5"
)

type UserInfo struct {
	UserInfoController controller.UserInfoController
}

func NewUserInfoRouter(controller controller.UserInfoController) Router {
	return &UserInfo{
		UserInfoController: controller,
	}
}

func (ur *UserInfo) Register(r chi.Router) {
	r.Get("/get-user-info", ur.UserInfoController.GetUserInfo)
}
