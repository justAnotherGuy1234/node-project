package router

import (
	"userService/controller"

	"github.com/go-chi/chi/v5"
)

type UserRouter struct {
	userController controller.UserController
}

func NewUserRouter(controller controller.UserController) Router {
	return &UserRouter{
		userController: controller,
	}
}

func (ur *UserRouter) Register(r chi.Router) {
	r.Post("/signup", ur.userController.CreateUser)
	r.Post("/login", ur.userController.LoginUser)
}
