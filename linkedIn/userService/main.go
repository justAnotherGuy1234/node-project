package main

import (
	"fmt"
	"net/http"
	"userService/config"
	"userService/controller"
	"userService/router"
)

func main() {
	db, err := config.DbConfig()

	if err != nil {
		fmt.Println("error connecting to db ")
	}

	uc := controller.NewUserController(db)
	ur := router.NewUserRouter(uc)

	pc := controller.NewProtectedController(db)
	pr := router.NewProtectedRoute(pc)

	server := http.Server{
		Addr:    ":5000",
		Handler: router.RouterSetup(ur, pr),
	}

	fmt.Println("server started at port", server.Addr)

	server.ListenAndServe()

}
