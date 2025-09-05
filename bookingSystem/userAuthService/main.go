package main

import (
	"fmt"
	"net/http"
	"userAuth/config"
	"userAuth/controller"
	"userAuth/router"
)

func main() {
	db, err := config.DbConfig()

	if err != nil {
		fmt.Println("error connecting db")
		return
	}

	uc := controller.NewUserController(db)
	ur := router.NewUserRouter(uc)

	uic := controller.NewUserInfoController(db)
	uir := router.NewUserInfoRouter(uic)

	server := http.Server{
		Addr:    ":6000",
		Handler: router.RouterSetup(ur, uir),
	}

	fmt.Println("server started at port", server.Addr)

	server.ListenAndServe()
}
