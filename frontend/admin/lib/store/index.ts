'use client';

import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth';
import ResponsiveReducer from './responsive';
import MenuReducer from './menu';
import LoadingReducer from './loading';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    responsive: ResponsiveReducer,
    menu: MenuReducer,
    loading: LoadingReducer
  }
})

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;