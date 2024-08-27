"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
  email: string;
  fullname: string;
  address: string;
  phone: string;
  role: string;
}

const initialState: UserState = {
  username: "",
  email: "",
  fullname: "",
  address: "",
  phone: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInformation(state, action: PayloadAction<UserState>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
    },
    clearUserInformation(state, action: PayloadAction) {
      state.username = "";
      state.email = "";
      state.fullname = "";
      state.address = "";
      state.phone = "";
      state.role = "";
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
