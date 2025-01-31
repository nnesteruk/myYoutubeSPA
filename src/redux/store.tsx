import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import favoriteReducer from './slices/favoriteSlice';
import videosReducer from './slices/videosSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    favorite: favoriteReducer,
    videos: videosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
