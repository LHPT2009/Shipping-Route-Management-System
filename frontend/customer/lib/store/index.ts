'use client';

import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './counter';

export const store = configureStore({
    reducer: {
        counter: CounterReducer
    }
})

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;