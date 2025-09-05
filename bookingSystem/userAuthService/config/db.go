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
		fmt.Println("error loading env ", err)
		return nil, err
	}

	cfg := mysql.NewConfig()

	cfg.User = "root"
	cfg.Addr = "127.0.0.1"
	cfg.DBName = "userAuth"
	res, ok := os.LookupEnv("DB_PASSWORD")

	if !ok {
		fmt.Println("failed to get password in db config ")
	}

	cfg.Passwd = res

	cfg.Net = "tcp"

	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		fmt.Println("error opening db ", err)
		return nil, err
	}

	if err := db.Ping(); err != nil {
		fmt.Println("error pinging db ", err)
		return nil, err
	}

	fmt.Println("db connected", cfg.DBName, cfg.FormatDSN())
	return db, nil

}
