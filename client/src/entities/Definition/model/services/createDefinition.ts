import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Definition } from '../types/Definition';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const createDefinition = createAsyncThunk<string, Partial<Definition>, ThunkConfig<string>>(
    'Definition/createDefinition',
    async (newSentence, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/sentence/add', newSentence);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
