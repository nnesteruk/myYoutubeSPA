import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from './favoriteThunkActions';
import { GetVideosResponse, VideoSearchParams } from '../../components/type';
import { AxiosResponse } from 'axios';

export const videosApi = {
  getVideos({ query = '', sortBy = 'relevance', countResult = 12 }) {
    return instance.get<VideoSearchParams, AxiosResponse<GetVideosResponse>>(
      `/api/query/search?query=${query}&sortBy=${sortBy}&countResult=${countResult}`,
    );
  },
};

export const fetchGetVideos = createAsyncThunk<
  GetVideosResponse,
  VideoSearchParams
>('videos/fetchGetVideos', async ({ query, sortBy, countResult }, thunkApi) => {
  try {
    const { data } = await videosApi.getVideos({ query, sortBy, countResult });
    return data;
  } catch (err) {
    return thunkApi.rejectWithValue('Не удалось загрузить видео :(');
  }
});
