import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Subject } from '../types/Subject';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const fetchSubject = createAsyncThunk<Subject, number, ThunkConfig<string>>(
    'Subject/fetchSubject',
    async (subjectId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Subject>(`/api/subjects/${subjectId}`);

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
