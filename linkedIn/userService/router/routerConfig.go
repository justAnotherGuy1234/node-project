package router

import (
	"userService/middleware"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
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
		cors := cors.New(cors.Options{
			AllowedOrigins: []string{"*"},
			// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"X-PINGOTHER", "Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
			ExposedHeaders:   []string{"Link"},
			AllowCredentials: true,
			MaxAge:           300, // Maximum value not ignored by any of major browsers
		})
		r.Use(cors.Handler, middleware.ProtectedMiddleware)
		protectedRoute.Register(r)
	})

	return router
}
