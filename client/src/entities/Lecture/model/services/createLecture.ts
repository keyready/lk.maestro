import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

interface CreateLectureProps {
    title: string;
    files: File[];
    subjectId: number;
}

export const createLecture = createAsyncThunk<string, CreateLectureProps, ThunkConfig<string>>(
    'Lecture/createLecture',
    async (lecture, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        const formData = new FormData();
        formData.append('title', lecture.title);
        formData.append('subjectId', lecture.subjectId.toString());
        lecture.files.forEach((file) => {
            formData.append('file', file);
        });

        try {
            const response = await extra.api.post<string>('/api/lecture/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

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
