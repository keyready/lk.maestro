package models

type UserModel struct {
	ID         int64  `json:"id" db:"id"`
	Firstname  string `json:"firstname" db:"firstname"`
	Middlename string `json:"middlename" db:"middlename"`
	Lastname   string `json:"lastname" db:"lastname"`
	Username   string `json:"username" db:"username"`
	Password   string `json:"password" db:"password"`

	Rank    string `json:"rank" db:"rank"`
	EduRank string `json:"eduRank" db:"eduRank"`
}
