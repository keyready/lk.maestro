package repostiory

import (
	"fmt"
	"net/http"
	"server/internal/types/dto"
	"server/internal/types/models"
	"server/pkg/db"
)

type SentenceRepositoryI interface {
	AddSentence(addSentence dto.AddSentenceRequest) (httpCode int, err error)
	FetchAllSentences() (httpCode int, err error, sentences []models.SentenceModel)
}

type SentenceRepository struct {
	*db.Database
}

func NewSentenceRepository(db *db.Database) *SentenceRepository {
	return &SentenceRepository{db}
}

func (r *SentenceRepository) FetchAllSentences() (httpCode int, err error, sentences []models.SentenceModel) {
	rows, dbErr := r.Db.Query(`SELECT id,obj,definition,subjectId FROM sentences;`)
	defer rows.Close()

	if dbErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка извлечения всех определений: %s", dbErr.Error()), sentences
	}

	for rows.Next() {
		var s models.SentenceModel
		err = rows.Scan(&s.ID, &s.Obj, &s.Definition, &s.SubjectId)
		if err != nil {
			return http.StatusInternalServerError, fmt.Errorf("Ошибка конвертации записи в структуру: %s", err.Error()), nil
		}
		sentences = append(sentences, s)
	}

	return http.StatusOK, nil, sentences
}

func (r *SentenceRepository) AddSentence(addSentence dto.AddSentenceRequest) (httpCode int, err error) {
	var insertedId int64
	dbErr := r.Db.Get(
		&insertedId,
		`INSERT INTO sentences (obj,definition,subjectId) VALUES ($1,$2,$3) RETURNING id;`,
		addSentence.Obj,
		addSentence.Definition,
		addSentence.SubjectId,
	)
	if dbErr != nil {
		return http.StatusInternalServerError, fmt.Errorf("Ошибка при добавление %s", dbErr.Error())
	}

	return http.StatusOK, nil
}
