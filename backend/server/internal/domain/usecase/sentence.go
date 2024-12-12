package usecase

import (
	"server/internal/domain/repostiory"
	"server/internal/types/dto"
	"server/internal/types/models"
)

type SentenceUsecaseI interface {
	FetchAllSentence() (httpCode int, err error, sentences []models.SentenceModel)
	AddSentence(addSentenceRequest dto.AddSentenceRequest) (httpCode int, err error, subject models.SentenceModel)
}

type SentenceUsecase struct {
	sentenceRepo *repostiory.SentenceRepository
}

func NewSentenceUsecase(sentenceRepo *repostiory.SentenceRepository) *SentenceUsecase {
	return &SentenceUsecase{sentenceRepo}
}

func (uc *SentenceUsecase) AddSentence(addSentenceRequest dto.AddSentenceRequest) (httpCode int, err error) {
	httpCode, err = uc.sentenceRepo.AddSentence(addSentenceRequest)
	if err != nil {
		return httpCode, err
	}
	return httpCode, nil
}

func (uc *SentenceUsecase) FetchAllSentences() (httpCode int, err error, subjects []models.SentenceModel) {
	httpCode, err, subjects = uc.sentenceRepo.FetchAllSentences()
	if err != nil {
		return httpCode, err, nil
	}
	return httpCode, nil, subjects
}
