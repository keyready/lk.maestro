package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
)

func NewLectureRouters(r *gin.Engine, lc *controllers.LectureController) {
	lectureRouters := r.Group("/lecture")

	lectureRouters.POST("/add", lc.AddLecture)
	lectureRouters.GET("", lc.FetchAllLectures)
	lectureRouters.GET("/:subjectId", lc.FetchOneLecture)
}
