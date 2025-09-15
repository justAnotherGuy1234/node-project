package main

import (
	"fmt"
	"net/http"
	"postService/config"
	"postService/controller"
	"postService/route"
)

func main() {
	db, _ := config.DbConfig()

	pc := controller.NewPostController(db)

	pr := route.NewPostRouter(pc)

	server := http.Server{
		Addr:    ":6000",
		Handler: route.NewRouterConfig(pr),
	}

	fmt.Println("server started at port", server.Addr)
	server.ListenAndServe()

}
