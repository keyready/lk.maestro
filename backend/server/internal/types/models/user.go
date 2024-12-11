package models

type UserModel struct {
	ID       int64  `json:"id" db:"id"`
	Login    string `json:"login" db:"login"`
	Password string `json:"password" db:"password"`
}
