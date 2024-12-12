package routers

import (
	"github.com/gin-gonic/gin"
	"server/internal/api/controllers"
	v1 "server/internal/api/routers/v1"
	"server/internal/domain/repostiory"
	"server/internal/domain/usecase"
	"server/pkg/db"
)

func AppHandlers(db *db.Database) *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	ur := repostiory.NewUserRepository(db)
	us := usecase.NewUserUsecase(ur)
	uc := controllers.NewUserControllers(us)
	v1.NewUserRouters(r, uc)

	lr := repostiory.NewLectureRepository(db)
	ls := usecase.NewLectureUsecase(lr)
	lc := controllers.NewLectureController(ls)
	v1.NewLectureRouters(r, lc)

	sr := repostiory.NewSentenceRepository(db)
	su := usecase.NewSentenceUsecase(sr)
	sc := controllers.NewSentenceControllers(su)
	v1.NewSentencesRouters(r, sc)

	sbjr := repostiory.NewSubjectRepository(db)
	sbju := usecase.NewSubjectUsecase(sbjr)
	sbjc := controllers.NewSubjectControllers(sbju)
	v1.NewSubjectRouters(r, sbjc)

	return r
}
