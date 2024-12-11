export type { Lecture } from './model/types/Lecture';
export type { LectureSchema } from './model/types/LectureSchema';
export { LectureActions, LectureReducer } from './model/slice/LectureSlice';
export { useLectures } from './api/LectureApi';
export {
    getLectureData,
    getLectureIsLoading,
    getLectureError,
} from './model/selectors/LectureSelectors';
export { createLecture } from './model/services/createLecture';

export { LecturesList } from './ui/LecturesList/LecturesList';
export { CreateLectureModal } from './ui/CreateLectureModal/CreateLectureModal';
