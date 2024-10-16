"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
  email: string;
  fullname: string;
  address: string;
  phone: string;
  role: string;
  permissions: string[];
  img: string;
}

const initialState: UserState = {
  username: "",
  email: "",
  fullname: "",
  address: "",
  phone: "",
  role: "",
  permissions: [],
  img: "",
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
      state.permissions = [...action.payload.permissions];
      state.img = action.payload.img;
    },
    clearUserInformation(state, action: PayloadAction) {
      state.username = "";
      state.email = "";
      state.fullname = "";
      state.address = "";
      state.phone = "";
      state.role = "";
      state.permissions = [];
    },
    setUserImg(state, action: PayloadAction<string>) {
      state.img = action.payload;
    },
    setUserRolePermissions(state, action: PayloadAction<{ role: string; permissions: string[] }>) {
      state.role = action.payload.role;
      state.permissions = [...action.payload.permissions];
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
