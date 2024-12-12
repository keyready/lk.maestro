package main

import (
	"net/http"
	"server/internal/api/routers"
	"server/pkg/db"
)

func main() {

	database := db.GetDatabaseInstance()
	defer database.CloseConnection()

	appHandlers := routers.AppHandlers(database)

	server := &http.Server{
		Addr:    ":5000",
		Handler: appHandlers,
	}

	server.ListenAndServe()
}
