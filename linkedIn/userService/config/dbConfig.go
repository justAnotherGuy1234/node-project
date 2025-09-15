package config

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func DbConfig() (*sql.DB, error) {
	if err := godotenv.Load(); err != nil {
		fmt.Println("error loading env data")
	}

	db := mysql.NewConfig()

	db.User = "root"
	db.Addr = "127.0.0.1"
	db.DBName = "userService"
	db.Passwd = os.Getenv("DB_PASSWORD")
	db.Net = "tcp"

	res, err := sql.Open("mysql", db.FormatDSN())

	if err != nil {
		fmt.Println("error connecting to db", err)
	}

	if err = res.Ping(); err != nil {
		fmt.Println("error pinging db", err)
	}

	fmt.Println("connected to db ", db.DBName, db.FormatDSN())

	return res, nil
}
