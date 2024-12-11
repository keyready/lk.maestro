package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
)

func NewUserRouters(r *gin.Engine, uc *controllers.UserControllers) {
	userRouters := r.Group("/api/user")

	userRouters.GET("/login", uc.Login)
}
