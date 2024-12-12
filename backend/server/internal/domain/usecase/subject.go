package usecase

import (
	"server/internal/domain/repostiory"
	"server/internal/types/models"
	"strconv"
)

type SubjectUsecaseI interface {
	FetchAllSubjects() (httpCode int, err error, subjects []models.SubjectModel)
	FetchOneSubject(subjectId string) (httpCode int, err error, subject models.SubjectModel)
}

type SubjectUsecase struct {
	subjectRepo *repostiory.SubjectRepository
}

func NewSubjectUsecase(subjectRepo *repostiory.SubjectRepository) *SubjectUsecase {
	return &SubjectUsecase{subjectRepo: subjectRepo}
}

func (u *SubjectUsecase) FetchOneSubject(subjectId string) (httpCode int, err error, subject models.SubjectModel) {
	subjectIdInt64, _ := strconv.ParseInt(subjectId, 10, 64)

	httpCode, err, subject = u.subjectRepo.FetchOneSubject(subjectIdInt64)
	if err != nil {
		return httpCode, err, subject
	}

	return httpCode, nil, subject
}

func (u *SubjectUsecase) FetchAllSubjects() (httpCode int, err error, subjects []models.SubjectModel) {
	httpCode, err, subjects = u.subjectRepo.FetchAllSubjects()
	if err != nil {
		return httpCode, err, nil
	}
	return httpCode, nil, subjects
}
