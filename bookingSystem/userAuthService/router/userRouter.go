package router

import (
	"userAuth/controller"

	"github.com/go-chi/chi/v5"
)

type UserRouter struct {
	UserController controller.UserController
}

func NewUserRouter(controller controller.UserController) Router {
	return &UserRouter{
		UserController: controller,
	}
}

func (ur *UserRouter) Register(r chi.Router) {
	r.Post("/signup", ur.UserController.CreateUser)
	r.Post("/login", ur.UserController.LoginUser)
}
