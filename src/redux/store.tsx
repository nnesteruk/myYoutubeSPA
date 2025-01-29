import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import { fetchYoutubeApi } from './services/fetchYoutubeApi';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [fetchYoutubeApi.reducerPath]: fetchYoutubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchYoutubeApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
