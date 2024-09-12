import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    loadingStatus: true
};

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        changeLoadingStatus(state, action) {
            state.loadingStatus = action.payload.loadingStatus;
        },
    },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
