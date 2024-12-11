package db

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"log"
	"sync"
)

type Database struct {
	Db *sqlx.DB
}

var (
	once     sync.Once
	instance *Database
)

func GetDatabaseInstance() *Database {
	once.Do(func() {
		connString := "user = k0fanov36 password = k0fanov36 dbname = yakuninapp sslmode = disable host = db port = 5432"
		db, err := sqlx.Open("postgres", connString)
		if err != nil {
			log.Fatalf("Ошибка подключения к БД: %v", err.Error())
		}

		pingErr := db.Ping()
		if pingErr != nil {
			log.Fatalf("Ошибка пинга БД: %v", pingErr.Error())
		}

		fmt.Println("Подключение к БД успешно")

		instance = &Database{Db: db}
	})
	return instance
}

func (d *Database) CloseConnection() {
	err := d.Db.Close()
	if err != nil {
		log.Fatalf("Ошибка разрыва соедиения с БД: %v", err.Error())
	}
	log.Println("Соединение с БД успешно прекращено")
}
