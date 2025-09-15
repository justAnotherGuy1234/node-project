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
		fmt.Println("error loading env data in db config", err)
		return nil, nil
	}

	cfg := mysql.NewConfig()

	cfg.Addr = "127.0.0.1"
	cfg.User = "root"
	cfg.Passwd = os.Getenv("DB_PASSWORD")
	cfg.DBName = "postService"

	cfg.Net = "tcp"

	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		fmt.Println("error connecting to db", err)
		return nil, nil
	}

	if err := db.Ping(); err != nil {
		fmt.Println("error pinging post service db", err)
		return nil, nil
	}

	fmt.Println("connected to db", cfg.DBName, cfg.FormatDSN())

	return db, nil
}
