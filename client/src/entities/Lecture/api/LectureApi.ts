import { Lecture } from '../model/types/Lecture';

import { rtkApi } from '@/shared/api/rtkApi';

const LectureApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getLecture: build.query<Lecture[], number | void>({
            query: (subjectId) => ({
                url: subjectId ? `/api/lectures/${subjectId}` : '/api/lectures',
            }),
        }),
    }),
});

export const useLectures = LectureApi.useGetLectureQuery;
