import { StateSchema } from '@/app/providers/StoreProvider';

export const getDefinitionData = (state: StateSchema) => state.definition?.data;
export const getDefinitionIsLoading = (state: StateSchema) => state.definition?.isLoading;
export const getDefinitionError = (state: StateSchema) => state.definition?.error;
