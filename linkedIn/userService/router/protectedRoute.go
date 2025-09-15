package router

import (
	"userService/controller"

	"github.com/go-chi/chi/v5"
)

type ProtectedRoute struct {
	protectedController controller.ProtectedController
}

func NewProtectedRoute(controller controller.ProtectedController) Router {
	return &ProtectedRoute{
		protectedController: controller,
	}
}

func (pr *ProtectedRoute) Register(r chi.Router) {
	r.Post("/", pr.protectedController.ProtectedRoute)
	r.Get("/info", pr.protectedController.GetUserData)
}
