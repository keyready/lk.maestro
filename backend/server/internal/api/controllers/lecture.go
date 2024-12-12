package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/internal/domain/usecase"
	"server/internal/types/dto"
)

type LectureController struct {
	lectureUsecase *usecase.LectureUsecase
}

func NewLectureController(lectureUsecase *usecase.LectureUsecase) *LectureController {
	return &LectureController{lectureUsecase: lectureUsecase}
}

func (lc *LectureController) FetchAllLectures(ctx *gin.Context) {
	httpCode, err, lectures := lc.lectureUsecase.FetchAllLectures()
	if err != nil {
		ctx.AbortWithStatusJSON(
			httpCode,
			gin.H{"error": err},
		)
		return
	}
	ctx.JSON(httpCode, lectures)
}

func (lc *LectureController) AddLecture(ctx *gin.Context) {
	var addLectureRequest []dto.AddLectureRequest
	bindErr := ctx.ShouldBind(&addLectureRequest)
	if bindErr != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": bindErr.Error()})
	}

	httpCode, err := lc.lectureUsecase.AddLecture(addLectureRequest)
	if err != nil {
		ctx.AbortWithStatusJSON(httpCode, gin.H{"error": err})
		return
	}

	ctx.JSON(httpCode, gin.H{})
}

func (lc *LectureController) FetchOneLecture(ctx *gin.Context) {
	subjectIdStr := ctx.Param("subjectId")

	httpCode, err, subject := lc.lectureUsecase.FetchOneLecture(subjectIdStr)
	if err != nil {
		ctx.AbortWithStatusJSON(httpCode, gin.H{"error": err})
		return
	}

	ctx.JSON(httpCode, subject)
}
