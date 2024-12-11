import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LectureSchema } from '../types/LectureSchema';

import { createLecture } from '@/entities/Lecture';

const initialState: LectureSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const LectureSlice = createSlice({
    name: 'LectureSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createLecture.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLecture.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createLecture.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: LectureActions } = LectureSlice;
export const { reducer: LectureReducer } = LectureSlice;
