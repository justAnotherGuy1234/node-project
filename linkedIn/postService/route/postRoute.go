package route

import (
	"postService/controller"

	"github.com/go-chi/chi/v5"
)

type PostRouter struct {
	postController controller.PostController
}

func NewPostRouter(controller controller.PostController) Router {
	return &PostRouter{
		postController: controller,
	}
}

func (pr *PostRouter) Register(r chi.Router) {
	r.Post("/create", pr.postController.CreatePost)
}
