import { Definition } from '../model/types/Definition';

import { rtkApi } from '@/shared/api/rtkApi';

const DefinitionApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getDefinition: build.query<Definition[], void>({
            query: () => ({
                url: `/api/sentence`,
            }),
        }),
    }),
});

export const useDefinitions = DefinitionApi.useGetDefinitionQuery;
