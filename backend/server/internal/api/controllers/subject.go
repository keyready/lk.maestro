package controllers

import (
	"github.com/gin-gonic/gin"
	"server/internal/domain/usecase"
)

type SubjectController struct {
	subjUsecase *usecase.SubjectUsecase
}

func NewSubjectControllers(subjUsecase *usecase.SubjectUsecase) *SubjectController {
	return &SubjectController{subjUsecase: subjUsecase}
}

func (sc *SubjectController) FetchAllSubjects(ctx *gin.Context) {
	httpCode, err, subjects := sc.subjUsecase.FetchAllSubjects()
	if err != nil {
		ctx.AbortWithStatusJSON(
			httpCode,
			gin.H{"error": err},
		)
		return
	}

	ctx.JSON(httpCode, subjects)
}

func (sc *SubjectController) FetchOneSubject(ctx *gin.Context) {
	subjectIdString := ctx.Param("subjectId")

	httpCode, err, subject := sc.subjUsecase.FetchOneSubject(subjectIdString)
	if err != nil {
		ctx.AbortWithStatusJSON(
			httpCode,
			gin.H{"error": err},
		)
		return
	}

	ctx.JSON(httpCode, subject)
}
