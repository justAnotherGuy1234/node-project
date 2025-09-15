package controller

import (
	"database/sql"
	"fmt"
	"net/http"
)

type PostController interface {
	CreatePost(w http.ResponseWriter, r *http.Request)
}

type PostControllerImpl struct {
	db *sql.DB
}

func NewPostController(db *sql.DB) PostController {
	return &PostControllerImpl{
		db: db,
	}
}

func (pc *PostControllerImpl) CreatePost(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hit create post endpoint")
}
