import { Definition } from '../model/types/Definition';

import { rtkApi } from '@/shared/api/rtkApi';

const DefinitionApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getDefinition: build.query<Definition[], number | void>({
            query: (subjectId) => ({
                url: subjectId ? `/api/sentence/${subjectId}` : '/api/sentence',
            }),
        }),
    }),
});

export const useDefinitions = DefinitionApi.useGetDefinitionQuery;
