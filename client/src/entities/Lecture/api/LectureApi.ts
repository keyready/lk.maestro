import { Lecture } from '../model/types/Lecture';

import { rtkApi } from '@/shared/api/rtkApi';

const LectureApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getLecture: build.query<Lecture[], void>({
            query: () => ({
                url: `/api/lectures`,
            }),
        }),
    }),
});

export const useLectures = LectureApi.useGetLectureQuery;
