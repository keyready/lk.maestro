package models

type SubjectModel struct {
	ID    int64  `json:"id" db:"db"`
	Title string `json:"title" db:"title"`
}
