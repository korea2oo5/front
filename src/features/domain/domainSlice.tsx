import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { domainCreateModel, domainCreateResult } from 'api/machineLearning';
import { RootState } from 'store';

interface Table {
    cols: any[];
    firstRows: any[];
    secondRows: any[];
}

const initialState: Table = {
    cols: ['항목', '기본', '기본', '기본'],
    firstRows: [[], [], [], []],
    secondRows: [[], [], [], []],
};

export const createModel = createAsyncThunk('machineLearning/domainCreateModel', async (data: any) => {
    const { data_input, data_output } = data;
    return await domainCreateModel(data_input, data_output);
});

export const createResult = createAsyncThunk('machineLearning/domainCreateResult', async (data: any) => {
    const { model, data_label, newRunResult } = data;
    return await domainCreateResult(model, data_label, newRunResult);
});

export const domainSlice = createSlice({
    name: 'domain',
    initialState,
    reducers: {
        setCols: (state, action) => {
            state.cols = action.payload;
        },
        setFirstRows: (state, action) => {
            state.firstRows = action.payload;
        },
        setSecondRows: (state, action) => {
            // console.log(state);
            // console.log(action);
            state.secondRows = action.payload;
            // return { ...state, secondRows: action.payload };
        },
    },
    extraReducers: {
        [createModel.pending.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [createModel.fulfilled.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [createModel.rejected.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [createResult.pending.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [createResult.fulfilled.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
        [createResult.rejected.toString()]: (state, action) => {
            // console.log(state);
            console.log(action);
        },
    },
});

export const { setCols, setFirstRows, setSecondRows } = domainSlice.actions;

// export const domainCols = (state: RootState) => state.domain.cols;
// export const domainFirstRows = (state: RootState) => state.domain.firstRows;
// export const domainSecondRows = (state: RootState) => state.domain.secondRows;

export default domainSlice.reducer;
