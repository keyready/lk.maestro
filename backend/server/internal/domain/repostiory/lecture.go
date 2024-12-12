package repostiory

import (
	"fmt"
	"net/http"
	"server/internal/types/dto"
	"server/internal/types/models"
	"server/pkg/db"
)

type LectureRepositoryI interface {
	AddLecture(addLectureRequest []dto.AddLectureRequest) (httpCode int, err error)
	FetchAllLectures() (httpCode int, err error, lectures []models.LectureModel)
	FetchOneLecture(subjectId string) (httpCode int, err error, lecture models.LectureModel)
}

type LectureRepository struct {
	*db.Database
}

func NewLectureRepository(db *db.Database) *LectureRepository {
	return &LectureRepository{db}
}

func (r *LectureRepository) FetchOneLecture(subjectId int64) (httpCode int, err error, lecture models.LectureModel) {
	dbErr := r.Db.Get(
		&lecture,
		`SELECT id,title,filename,subject_id FROM lectures WHERE subject_id = ?`,
		subjectId,
	)
	if dbErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка извлечения лекции: %s", dbErr.Error()), lecture
	}
	return http.StatusOK, nil, lecture
}

func (r *LectureRepository) AddLecture(addLectureRequest []dto.AddLectureRequest) (httpCode int, err error) {
	for i := 0; i < len(addLectureRequest); i++ {
		_, dbErr := r.Db.Exec(
			`INSERT INTO lectures VALUES ($1,$2,$3);`,
			addLectureRequest[i].Title,
			addLectureRequest[i].Filename,
			addLectureRequest[i].SubjectId,
		)
		if dbErr != nil {
			return http.StatusInternalServerError, fmt.Errorf("Ошибка добавления лекции БД: %s", dbErr.Error())
		}
	}
	return http.StatusOK, nil
}

func (r *LectureRepository) FetchAllLectures() (httpCode int, err error, lectures []models.LectureModel) {
	rows, err := r.Db.Query(`SELECT id,title,filename,subject_id FROM lectures;`)
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка извлечения всех лекций: %s", err.Error()), nil
	}
	defer rows.Close()

	for rows.Next() {
		var l models.LectureModel
		err = rows.Scan(&l.ID, &l.Title, &l.Filename, &l.SubjectId)
		if err != nil {
			return http.StatusInternalServerError, fmt.Errorf("Ошибка конвертации записи БД в структуру: %s", err.Error()), nil
		}
		lectures = append(lectures, l)
	}

	return http.StatusOK, nil, lectures
}
