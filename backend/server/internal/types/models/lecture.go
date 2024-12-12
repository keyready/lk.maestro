package models

type LectureModel struct {
	ID        int64  `json:"id" db:"id"`
	Title     string `json:"title" db:"title"`
	Filename  string `json:"filename" db:"filename"`
	SubjectId int64  `json:"subjectId" db:"subjectId"`
}
