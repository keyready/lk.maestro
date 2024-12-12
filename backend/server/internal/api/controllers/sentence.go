package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/usecase"
	"server/internal/types/dto"
)

type SentenceControllers struct {
	sentenceUsecase *usecase.SentenceUsecase
}

func NewSentenceControllers(sentUsecase *usecase.SentenceUsecase) *SentenceControllers {
	return &SentenceControllers{sentenceUsecase: sentUsecase}
}

func (sc *SentenceControllers) AddSentence(ctx *gin.Context) {
	var addSentenceRequest dto.AddSentenceRequest
	bindErr := ctx.ShouldBind(&addSentenceRequest)
	if bindErr != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": bindErr.Error()})
		return
	}

	httpCode, err := sc.sentenceUsecase.AddSentence(addSentenceRequest)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	ctx.JSON(httpCode, gin.H{})
}

func (sc *SentenceControllers) FetchAllSentences(ctx *gin.Context) {
	httpCode, err, sentences := sc.sentenceUsecase.FetchAllSentences()
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	ctx.JSON(httpCode, sentences)
}
