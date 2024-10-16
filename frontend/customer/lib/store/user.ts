"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

export interface UserState {
  id: string;
  username: string;
  email: string;
  fullname: string;
  address: string;
  phone: string;
  role: string;
  permissions: string[];
  img: string;
  active: boolean;
}

const initialState: UserState = {
  id: "",
  username: "",
  email: "",
  fullname: "",
  address: "",
  phone: "",
  role: "",
  permissions: [],
  img: "",
  active: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInformation(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.fullname = action.payload.fullname;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.permissions = [...action.payload.permissions];
      state.img = action.payload.img;
      state.active = action.payload.active;
    },
    clearUserInformation(state, action: PayloadAction) {
      state.id = "";
      state.username = "";
      state.email = "";
      state.fullname = "";
      state.address = "";
      state.phone = "";
      state.role = "";
      state.permissions = [];
      state.img = "";
      state.active = true;
    },
    setUserImg(state, action: PayloadAction<string>) {
      state.img = action.payload;
    },
    setUserRolePermissions(state, action: PayloadAction<{ role: string; permissions: string[] }>) {
      state.role = action.payload.role;
      state.permissions = [...action.payload.permissions];
    },
    setUserStatus(state, action: PayloadAction<boolean>) {
      state.active = action.payload
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
