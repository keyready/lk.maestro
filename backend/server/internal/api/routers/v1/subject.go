package v1

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
)

func NewSubjectRouters(r *gin.Engine, sbjc *controllers.SubjectController) {
	subjectRouters := r.Group("/subject")

	subjectRouters.GET("", sbjc.FetchAllSubjects)
	subjectRouters.GET("/:subjectId", sbjc.FetchOneSubject)
}
