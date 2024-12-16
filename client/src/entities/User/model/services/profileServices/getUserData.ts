import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { User } from '@/entities/User';
import { USER_ACCESS } from '@/shared/const';

export const getUserDataService = createAsyncThunk<User, string, ThunkConfig<string>>(
    'User/getUserData',
    async (username, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<User>(`/api/get_user_data?username=${username}`);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_ACCESS, JSON.stringify(response.data));

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
