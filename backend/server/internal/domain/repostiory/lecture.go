package repostiory

import (
	"fmt"
	"net/http"
	"server/internal/types/dto"
	"server/internal/types/models"
	"server/pkg/db"
)

type LectureRepositoryI interface {
	AddLecture(addLectureRequest dto.AddLectureRequest) (httpCode int, err error)
	FetchAllLectures() (httpCode int, err error, lectures []models.LectureModel)
}

type LectureRepository struct {
	*db.Database
}

func NewLectureRepository(db *db.Database) *LectureRepository {
	return &LectureRepository{db}
}

func (r *LectureRepository) AddLecture(addLectureRequest dto.AddLectureRequest) (httpCode int, err error) {
	_, dbErr := r.Db.Exec(
		`INSERT INTO lectures VALUES ($1,$2,$3);`,
		addLectureRequest.Title,
		addLectureRequest.Filename,
		addLectureRequest.SubjectId,
	)
	if dbErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка добавления лекции БД: %s", dbErr.Error())
	}

	return http.StatusOK, nil
}

func (r *LectureRepository) FetchAllLectures() (httpCode int, err error, lectures []models.LectureModel) {
	rows, dbErr := r.Db.Exec(
		`SELECT id,title,filename,subjectId VALUES($1,$2,$3,$4);`,

	)
}
