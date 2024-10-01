"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "react-hook-form";


export interface AuthState {
  cookiesIsChecked: boolean;
  isLogin: boolean;
}

const initialState: AuthState = {
  cookiesIsChecked: false,
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCookiesIsChecked(state, action: PayloadAction<boolean>) {
      state.cookiesIsChecked = action.payload;
    },
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
