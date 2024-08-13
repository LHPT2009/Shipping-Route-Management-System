"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum RegisterStatus {
  REGISTER,
  VERIFY
}

export enum ForgotPasswordStatus {
  ENTER_EMAIL,
  VERIFY,
  ENTER_NEW_PASSWORD
}

export interface AuthState {
  registerStatus: RegisterStatus;
  registerEmail: string;
  forgotPasswordStatus: ForgotPasswordStatus;
  forgotPasswordEmail: string;

}

const initialState: AuthState = {
  registerStatus: RegisterStatus.REGISTER,
  registerEmail: "",
  forgotPasswordStatus: ForgotPasswordStatus.ENTER_EMAIL,
  forgotPasswordEmail: ""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeRegisterStatus(state, action: PayloadAction<RegisterStatus>) {
      state.registerStatus = action.payload;
    },
    changeForgotPasswordStatus(state, action: PayloadAction<ForgotPasswordStatus>) {
      state.forgotPasswordStatus = action.payload;
    },
    setRegisterEmail(state, action: PayloadAction<string>) {
      state.registerEmail = action.payload;
    },
    setForgotpasswordEmail(state, action: PayloadAction<string>) {
      state.forgotPasswordEmail = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
