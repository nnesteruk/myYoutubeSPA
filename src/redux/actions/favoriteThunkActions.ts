import axios, { AxiosResponse } from 'axios';
import {
  FavoriteDeleteResponse,
  FavoriteProperty,
  FavoriteRequestParams,
  FavoriteResponse,
  FavoriteUpdateResponse,
} from '../../components/type';
import { createAppAsyncThunk } from '../../hooks/hooks';

export const apiUrl = import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL: `${apiUrl}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const favoriteApi = {
  getFavorites() {
    return instance.get<FavoriteProperty[]>('/api/query/getFavourites');
  },
  addFavorite({ id, title, text, sortBy, maxCount }: FavoriteRequestParams) {
    return instance.post<FavoriteRequestParams, AxiosResponse<FavoriteResponse>>(
      `/api/query/saveQuery/${id}`,
      {
        title,
        text,
        sortBy,
        maxCount,
      },
    );
  },
  deleteFavorite(id: number) {
    return instance.delete<number, AxiosResponse<{ message: string; countDeleted: number }>>(
      `/api/query/deleteSavedQuery/${id}`,
    );
  },
  updateFavorite({ title, maxCount, sortBy, id, text }: FavoriteRequestParams) {
    console.log({ title, maxCount, sortBy, id, text });
    return instance.patch<FavoriteRequestParams, AxiosResponse<FavoriteRequestParams>>(
      `/api/query/editSavedQuery/${id}`,
      {
        title,
        maxCount,
        sortBy,
        text,
      },
    );
  },
};

export const fetchGetFavorites = createAppAsyncThunk(
  'favorite/fetchGetFavorites',
  async (_, thunkApi) => {
    try {
      const { data } = await favoriteApi.getFavorites();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось загрузить список запросов :(');
    }
  },
);

export const fetchAddFavorite = createAppAsyncThunk<FavoriteResponse, FavoriteRequestParams>(
  'favorite/fetchAddFavorite',
  async (body, thunkApi) => {
    try {
      const { data } = await favoriteApi.addFavorite(body);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось добавить запрос :(');
    }
  },
);

export const fetchDeleteFavorite = createAppAsyncThunk<FavoriteDeleteResponse, number>(
  'favorite/fetchDeleteFavorite',
  async (id, thunkApi) => {
    try {
      const { data } = await favoriteApi.deleteFavorite(id);
      return { data, id };
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось удалить запрос :(');
    }
  },
);

export const fetchUpdateFavorite = createAppAsyncThunk<
  FavoriteUpdateResponse,
  FavoriteRequestParams
>('favorite/fetchUpdateFavorite', async (body, thunkApi) => {
  try {
    const { data } = await favoriteApi.updateFavorite(body);
    return { data, id: body.id };
  } catch (err) {
    return thunkApi.rejectWithValue('Не удалось изменить запрос :(');
  }
});
