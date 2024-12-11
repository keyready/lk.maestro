package usecase

import (
	"encoding/base64"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"server/internal/domain/repostiory"
	"server/internal/types/dto"
	"strings"
)

type UserUsecaseI interface {
	Login(credentialsB64 string) (httpCode int, err error)
}

type UserUsecase struct {
	userRepo *repostiory.UserRepository
}

func NewUserUsecase(userRepo *repostiory.UserRepository) *UserUsecase {
	return &UserUsecase{userRepo}
}

func (uc *UserUsecase) Login(credentialsB64 string) (httpCode int, err error) {
	decodedBytes, decodedErr := base64.StdEncoding.DecodeString(credentialsB64)
	if decodedErr != nil {
		return http.StatusBadRequest, fmt.Errorf("Некорректный формат введенных данных")
	}

	credentials := strings.Split(string(decodedBytes), ":")
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(credentials[1]), bcrypt.DefaultCost)

	loginRequest := dto.LoginRequest{
		Login:    credentials[0],
		Password: string(hashPassword),
	}

	httpCode, err = uc.userRepo.Login(loginRequest)
	if err != nil {
		return httpCode, err
	}

	return httpCode, nil
}
