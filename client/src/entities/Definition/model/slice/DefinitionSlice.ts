import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DefinitionSchema } from '../types/DefinitionSchema';
import { createDefinition } from '../services/createDefinition';

const initialState: DefinitionSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const DefinitionSlice = createSlice({
    name: 'DefinitionSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDefinition.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDefinition.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createDefinition.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: DefinitionActions } = DefinitionSlice;
export const { reducer: DefinitionReducer } = DefinitionSlice;
