package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"server/internal/api/routers"
	"server/pkg/db"
)

func main() {

	database := db.GetDatabaseInstance()
	defer database.CloseConnection()

	appHandlers := routers.AppHandlers(database)

	server := &http.Server{
		Addr:    fmt.Sprint(":%s", os.Getenv("SERVER_PORT")),
		Handler: appHandlers,
	}

	go func() {
		if startAppErr := server.ListenAndServe(); startAppErr != nil {
			log.Fatalf("Ошибка запуска сервера: %s", startAppErr)
		}
	}()

}
