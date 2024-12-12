package dto

type AddSentenceRequest struct {
	Obj        string `json:"obj"`
	Definition string `json:"definition"`
	SubjectId  int64  `json:"subjectId"`
}
