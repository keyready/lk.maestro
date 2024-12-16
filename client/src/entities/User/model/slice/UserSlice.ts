import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSchema } from '../types/UserSchema';
import { loginUser } from '../services/authServices/loginUser';
import { AuthErrorTypes, User } from '../types/User';
import { getUserDataService } from '../services/profileServices/getUserData';

import { USER_ACCESS } from '@/shared/const';

const initialState: UserSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.authError = undefined;
        },

        setUserData: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem(USER_ACCESS);
            state.data = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.authError = action.payload as AuthErrorTypes;
            })

            .addCase(getUserDataService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getUserDataService.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getUserDataService.rejected, (state, action) => {
                localStorage.removeItem(USER_ACCESS);
                state.isLoading = false;
                state.data = undefined;
                state.error = action.payload;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
