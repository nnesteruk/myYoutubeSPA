import { configureStore } from '@reduxjs/toolkit';
import { reducer as modalReducer } from 'shared/model';
import { reducer as videosReducer } from 'entities/videos/model';
import { reducer as favoriteReducer } from 'entities/favoriteRequest/model';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    favorite: favoriteReducer,
    videos: videosReducer,
  },
});
