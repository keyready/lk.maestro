package usecase

import (
	"server/internal/domain/repostiory"
	"server/internal/types/dto"
	"server/internal/types/models"
	"strconv"
)

type LectureUsecaseI interface {
	AddLecture(addLectureRequest []dto.AddLectureRequest) (httpCode int, err error)
	FetchAllLectures() (httpCode int, err error, lectures []models.LectureModel)
	FetchOneLecture(subjectId string) (httpCode int, err error, lecture models.LectureModel)
}

type LectureUsecase struct {
	lectureRepo *repostiory.LectureRepository
}

func NewLectureUsecase(lectureRepo *repostiory.LectureRepository) *LectureUsecase {
	return &LectureUsecase{lectureRepo: lectureRepo}
}

func (uc *LectureUsecase) FetchOneLecture(subjectId string) (httpCode int, err error, lecture models.LectureModel) {
	subjectIdInt64, _ := strconv.ParseInt(subjectId, 10, 64)
	httpCode, err, lecture = uc.lectureRepo.FetchOneLecture(subjectIdInt64)
	if err != nil {
		return httpCode, err, lecture
	}
	return httpCode, nil, lecture
}

func (uc *LectureUsecase) FetchAllLectures() (httpCode int, err error, lectures []models.LectureModel) {
	httpCode, err, lectures = uc.lectureRepo.FetchAllLectures()
	if err != nil {
		return httpCode, err, nil
	}
	return httpCode, nil, lectures
}

func (uc *LectureUsecase) AddLecture(addLectureRequest []dto.AddLectureRequest) (httpCode int, err error) {
	httpCode, err = uc.lectureRepo.AddLecture(addLectureRequest)
	if err != nil {
		return httpCode, err
	}
	return httpCode, nil
}
