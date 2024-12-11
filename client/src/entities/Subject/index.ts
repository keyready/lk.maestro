export type { Subject } from './model/types/Subject';
export type { SubjectSchema } from './model/types/SubjectSchema';
export { SubjectActions, SubjectReducer } from './model/slice/SubjectSlice';
export { useSubjects } from './api/SubjectApi';
export {
    getSubjectData,
    getSubjectIsLoading,
    getSubjectError,
} from './model/selectors/SubjectSelectors';

export { SubjectSelector } from './ui/SubjectSelector/SubjectSelector';
