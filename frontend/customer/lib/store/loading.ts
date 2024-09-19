import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loadingStatus: true,
  loadingAccessToken: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changeLoadingStatus(state, action) {
      state.loadingStatus = action.payload.loadingStatus;
    },
    changeLoadingAccessToken(state, action: PayloadAction<boolean>) {
      state.loadingAccessToken = action.payload;
    }
  },
});

export const loadingActions = loadingSlice.actions;

export default loadingSlice.reducer;
