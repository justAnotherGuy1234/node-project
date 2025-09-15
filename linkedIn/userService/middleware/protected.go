package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

func ProtectedMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if err := godotenv.Load(); err != nil {
			fmt.Println("error loading env data in protected middlware ", err)
			return
		}

		secretKey := []byte(os.Getenv("JWT_SECRET"))

		cookie, err := r.Cookie("token")

		if err != nil {
			http.Error(w, "error getting cookie name token", 400)
			return
		}

		value := jwt.MapClaims{}

		token, err := jwt.ParseWithClaims(cookie.Value, value, func(t *jwt.Token) (any, error) {
			return secretKey, nil
		})

		fmt.Println("value", value)

		if err != nil {
			http.Error(w, "failed to get value from token", 500)
			return
		}

		if !token.Valid {
			http.Error(w, "invalid token", 400)
			return
		}

		var mainUserEmail string

		if userEmail, ok := value["email"].(string); ok {
			mainUserEmail = userEmail
		}

		ctx := context.WithValue(r.Context(), "userData", mainUserEmail)

		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
