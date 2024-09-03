'use client';

import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth';
import UserReducer from './user';
import ResponsiveReducer from './responsive';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    responsive: ResponsiveReducer
  }
})

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;