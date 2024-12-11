import { createSlice } from '@reduxjs/toolkit';

import { LectureSchema } from '../types/LectureSchema';

const initialState: LectureSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const LectureSlice = createSlice({
    name: 'LectureSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export const { actions: LectureActions } = LectureSlice;
export const { reducer: LectureReducer } = LectureSlice;
