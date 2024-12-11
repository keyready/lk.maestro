import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SubjectSchema } from '../types/SubjectSchema';
import { fetchSubject } from '../services/fetchSubject';

const initialState: SubjectSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const SubjectSlice = createSlice({
    name: 'SubjectSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubject.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchSubject.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchSubject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: SubjectActions } = SubjectSlice;
export const { reducer: SubjectReducer } = SubjectSlice;
