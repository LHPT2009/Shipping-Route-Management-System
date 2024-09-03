import { createSlice } from "@reduxjs/toolkit";

export interface ResponseState {
    checkStatusResponse: boolean;
    checkStatusBackground: boolean;
}

const initialState: ResponseState = {
    checkStatusResponse: false,
    checkStatusBackground: true
};

export const responsiveSlice = createSlice({
    name: "responsive",
    initialState,
    reducers: {
        changeStatusResponse(state, action) {
            state.checkStatusResponse = action.payload;
        },
        changeStatusBackground(state, action) {
            state.checkStatusBackground = action.payload;
        }
    },
});

export const responsiveActions = responsiveSlice.actions;

export default responsiveSlice.reducer;
