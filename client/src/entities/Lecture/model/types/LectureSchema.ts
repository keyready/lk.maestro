import { Lecture } from './Lecture';

export interface LectureSchema {
    data?: Lecture;
    isLoading: boolean;
    error?: string;
}
