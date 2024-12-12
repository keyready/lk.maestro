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
		Addr: ":5000",
		//Addr:    fmt.Sprint(":%s", os.Getenv("SERVER_PORT")),
		Handler: appHandlers,
	}

	//go func() {
	//	if startAppErr := server.ListenAndServe(); startAppErr != nil {
	//		log.Fatalf("Ошибка запуска сервера: %s", startAppErr)
	//	}
	//}()

	server.ListenAndServe()

}
