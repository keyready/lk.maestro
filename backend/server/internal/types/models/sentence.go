package models

type SentenceModel struct {
	ID         int64  `json:"id" db:"id"`
	Obj        string `json:"obj" db:"obj"`
	Definition string `json:"definition" db:"definition"`
	SubjectId  int64  `json:"subjectId" db:"subjectId"`
}
