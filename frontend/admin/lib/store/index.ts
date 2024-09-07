'use client';

import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth';
import ResponsiveReducer from './responsive';
import MenuReducer from './menu';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    responsive: ResponsiveReducer,
    menu: MenuReducer
  }
})

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;