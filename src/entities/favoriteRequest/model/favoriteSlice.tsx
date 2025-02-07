import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAddFavorite,
  fetchDeleteFavorite,
  fetchGetFavorites,
  fetchUpdateFavorite,
} from '../api';
import { FavoriteSliceInitialState } from 'components/type';

const initialState: FavoriteSliceInitialState = {
  favorites: [],
  isLoading: false,
  error: '',
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
        state.error = '';
      })
      .addCase(fetchGetFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.payload}`;
      })
      .addCase(fetchAddFavorite.fulfilled, (state) => {
        state.isLoading = false;
        state.error = '';
      })
      .addCase(fetchDeleteFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = state.favorites.filter(
          (item) => item?.id !== action.payload?.id,
        );
        state.error = '';
      })
      .addCase(fetchUpdateFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = state.favorites.map((item) =>
          item.id === action.payload.id
            ? { ...item, query: action.payload.data }
            : item,
        );
        state.error = '';
      });
  },
});
export const { reducer } = favoriteSlice; // без default
