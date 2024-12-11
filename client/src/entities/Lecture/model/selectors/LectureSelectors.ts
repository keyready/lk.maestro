import { StateSchema } from '@/app/providers/StoreProvider';

export const getLectureData = (state: StateSchema) => state.lecture?.data;
export const getLectureIsLoading = (state: StateSchema) => state.lecture?.isLoading;
export const getLectureError = (state: StateSchema) => state.lecture?.error;
