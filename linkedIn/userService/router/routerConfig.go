package router

import (
	"userService/middleware"

	"github.com/go-chi/chi/v5"
)

type Router interface {
	Register(r chi.Router)
}

func RouterSetup(userRouter, protectedRoute Router) *chi.Mux {
	router := chi.NewRouter()

	router.Route("/api/v0/user", func(r chi.Router) {
		userRouter.Register(r)
	})

	router.Route("/api/v0/protect", func(r chi.Router) {
		r.Use(middleware.ProtectedMiddleware)
		protectedRoute.Register(r)
	})

	return router
}
