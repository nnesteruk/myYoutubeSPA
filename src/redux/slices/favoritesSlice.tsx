import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  id: number;
  name: string;
  searchText: string;
  sort: string | null;
  count: number;
};
const favorites: InitialState[] = JSON.parse(localStorage.getItem('favorite') || '[]');
const initialState: { favorite: InitialState[] } = {
  favorite: favorites,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<InitialState>) => {
      state.favorite.push(action.payload);
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },
    deleteFavorite: (state, action: PayloadAction<number>) => {
      state.favorite = state.favorite.filter((item) => item.id !== action.payload);
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },
    changeFavorite: (state, action: PayloadAction<InitialState>) => {
      state.favorite = state.favorite.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
      localStorage.setItem('favorite', JSON.stringify(state.favorite));
    },
  },
});

export const { addFavorite, deleteFavorite, changeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
