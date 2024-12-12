package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
)

func NewSentencesRouters(r *gin.Engine, sc *controllers.SentenceControllers) {
	sentencesControllers := r.Group("/sentence")

	sentencesControllers.POST("/add", sc.AddSentence)
	sentencesControllers.GET("/", sc.FetchAllSentences)
}
