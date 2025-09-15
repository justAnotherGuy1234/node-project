package route

import (
	"github.com/go-chi/chi/v5"
)

type Router interface {
	Register(r chi.Router)
}

func NewRouterConfig(postRouter Router) *chi.Mux {
	router := chi.NewRouter()

	router.Route("/api/v0/post", func(r chi.Router) {
		postRouter.Register(r)
	})

	return router
}
