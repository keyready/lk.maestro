package repostiory

import (
	"fmt"
	"log"
	"net/http"
	"server/internal/types/dto"
	"server/pkg/db"
)

type UserRepositoryI interface {
	Login(loginRequest dto.LoginRequest) (httpCode int, err error)
}

type UserRepository struct {
	*db.Database
}

func NewUserRepository(database *db.Database) *UserRepository {
	return &UserRepository{database}
}

func (r *UserRepository) Login(loginRequest dto.LoginRequest) (httpCode int, err error) {
	var userExist bool
	dbErr := r.Db.Get(
		&userExist,
		`SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)`,
		loginRequest.Login,
	)
	if dbErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка БД [/api/login]: %w", err.Error())
	}
	if userExist {
		return http.StatusBadRequest, fmt.Errorf("Пользователь зарегистрирован")
	}

	var insertedId int64
	dbErr = r.Db.Get(
		&insertedId,
		`INSERT INTO users(login,password) VALUES($1, $2) RETURNING id`,
		loginRequest.Login,
		loginRequest.Password,
	)
	if dbErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка БД [/api/login]: %w", err.Error())
	}

	log.Printf("Новый пользователь: %s", insertedId)

	return http.StatusOK, nil
}
