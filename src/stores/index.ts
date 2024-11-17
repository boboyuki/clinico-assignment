import { configureStore } from '@reduxjs/toolkit';
import { policyholderApi } from '../services/policyholder.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { policyholderSlice } from './policyholder.slice';

export const store = configureStore({
  reducer: {
    [policyholderApi.reducerPath]: policyholderApi.reducer,
    policyholder: policyholderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(policyholderApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
