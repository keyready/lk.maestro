package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/usecase"
)

type UserControllers struct {
	userUsecase *usecase.UserUsecase
}

func NewUserControllers(userUsecase *usecase.UserUsecase) *UserControllers {
	return &UserControllers{userUsecase: userUsecase}
}

func (c *UserControllers) Login(ctx *gin.Context) {
	credentials := ctx.Query("credentials")
	if credentials == "" {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Данные для входа отсутсвуют"})
		return
	}

	httpCode, usecaseErr := c.userUsecase.Login(credentials)
	if usecaseErr != nil {
		ctx.AbortWithStatusJSON(httpCode, gin.H{"error": usecaseErr})
		return
	}

	ctx.JSON(httpCode, gin.H{})
}
