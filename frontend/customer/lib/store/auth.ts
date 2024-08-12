"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum RegisterStatus {
  REGISTER,
  VERIFY
}

export interface AuthState {
  registerStatus: RegisterStatus;
  emailRegister: string;
}

const initialState: AuthState = {
  registerStatus: RegisterStatus.VERIFY,
  emailRegister: "testinitredux200202@gmail.com"
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeRegisterStatus(state, action: PayloadAction<RegisterStatus>) {
      state.registerStatus = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
