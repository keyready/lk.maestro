package repostiory

import (
	"fmt"
	"net/http"
	"server/internal/types/models"
	"server/pkg/db"
)

type SubjectRepositoryI interface {
	FetchAllSubjects() (httpCode int, err error, subjects []models.SubjectModel)
	FetchOneSubject(subjectId int64) (httpCode int, err error, subject models.SubjectModel)
}

type SubjectRepository struct {
	*db.Database
}

func NewSubjectRepository(db *db.Database) *SubjectRepository {
	return &SubjectRepository{db}
}

func (r *SubjectRepository) FetchAllSubjects() (httpCode int, err error, subjects []models.SubjectModel) {
	rows, err := r.Db.Query(`SELECT id,title FROM subjects;`)
	if err != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка извлечения всех предметов: %s", err.Error()), nil
	}
	defer rows.Close()

	for rows.Next() {
		var s models.SubjectModel
		err = rows.Scan(&s.ID, &s.Title)
		if err != nil {
			return http.StatusInternalServerError, fmt.Errorf("Ошибка конвертации записи БД в структуру: %s", err.Error()), nil
		}
		subjects = append(subjects, s)
	}

	return http.StatusOK, nil, subjects
}

func (r *SubjectRepository) FetchOneSubject(subjectId int64) (httpCode int, err error, subject models.SubjectModel) {
	dbErr := r.Db.Get(
		&subject,
		`SELECT id,title FROM subjects WHERE id = $1;`,
		subjectId,
	)
	if dbErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка извлечения одного предмета: %s", dbErr.Error()), subject
	}

	return http.StatusOK, nil, subject
}
