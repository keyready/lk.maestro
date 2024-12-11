import { Subject } from '../model/types/Subject';

import { rtkApi } from '@/shared/api/rtkApi';

const SubjectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSubject: build.query<Subject[], void>({
            query: () => ({
                url: `/api/subjects`,
            }),
        }),
    }),
});

export const useSubjects = SubjectApi.useGetSubjectQuery;
