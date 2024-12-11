import { createSlice } from '@reduxjs/toolkit';

import { DefinitionSchema } from '../types/DefinitionSchema';

const initialState: DefinitionSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const DefinitionSlice = createSlice({
    name: 'DefinitionSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export const { actions: DefinitionActions } = DefinitionSlice;
export const { reducer: DefinitionReducer } = DefinitionSlice;
