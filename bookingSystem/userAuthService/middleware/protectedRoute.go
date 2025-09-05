package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

type UserContext struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

func ProtectedRoute(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if err := godotenv.Load(); err != nil {
			fmt.Println("error loading env")
			return
		}

		var secretKey = []byte(os.Getenv("JWT_SECRET"))

		value := jwt.MapClaims{}

		cookie, err := r.Cookie("token")

		if err != nil {
			fmt.Println("error getting cookie", err)
			http.Error(w, "failed to get cookies ", 400)
			return
		}

		token, err := jwt.ParseWithClaims(cookie.Value, value, func(t *jwt.Token) (any, error) {
			return secretKey, nil
		})

		if err != nil {
			fmt.Println("error getting value from token ")
			return
		}

		if !token.Valid {
			fmt.Println("invalid token")
			http.Error(w, "invalid token", 400)
			return
		}

		var mainUserId int

		if userId, ok := value["userId"].(float64); ok {
			mainUserId = int(userId)
		}

		ctx := context.WithValue(r.Context(), "userData", mainUserId)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
