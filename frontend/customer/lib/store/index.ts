
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth';
import UserReducer from './user';
import ResponsiveReducer from './responsive';
import MenuReducer from './menu';
import LoadingReducer from './loading';
import ChatReducer from './chat';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    responsive: ResponsiveReducer,
    menu: MenuReducer,
    loading: LoadingReducer,
    chat: ChatReducer,
  }
})

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;