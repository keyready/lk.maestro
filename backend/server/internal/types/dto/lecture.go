package dto

import "mime/multipart"

type AddLectureRequest struct {
	Title     string
	File      *multipart.File
	Filename  string
	SubjectId int64
}
