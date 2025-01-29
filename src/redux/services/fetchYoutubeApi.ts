import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FavoriteProperty,
  FavoriteRequestParams,
  FavoriteResponse,
  GetVideosResponse,
  Query,
  VideoSearchParams,
} from '../../components/type';

export const apiUrl: string = import.meta.env.VITE_API_URL;
export const apiKey: string = import.meta.env.VITE_API_KEY;

export const fetchYoutubeApi = createApi({
  reducerPath: 'fetchYoutubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }),
  tagTypes: ['Videos', 'Favorites'],
  endpoints: (builder) => ({
    getVideos: builder.query<GetVideosResponse, VideoSearchParams>({
      query: ({ searchText = '', count = 12, sort = 'date' }) => ({
        url: `/api/query/search`,
        params: { query: searchText, sortBy: sort, countResult: count },
      }),
      providesTags: (result) => (result ? ['Videos'] : []),
    }),
    getFavorites: builder.query<FavoriteProperty[], void>({
      query: () => ({
        url: `/api/query/getFavourites`,
      }),
      providesTags: ['Favorites'],
    }),
    addFavoriteRequest: builder.mutation<FavoriteResponse, FavoriteRequestParams>({
      query: (body) => ({
        url: `/api/query/saveQuery/${body.id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Favorites'],
    }),
    deleteFavoriteRequest: builder.mutation<{ message: string; countDeleted?: number }, number>({
      query: (id) => ({
        url: `/api/query/deleteSavedQuery/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
    changeFavoriteRequest: builder.mutation<{ message: string }, Query>({
      query: ({ id, sortBy, maxCount, text, title }) => ({
        url: `/api/query/editSavedQuery/${id}`,
        method: 'PATCH',
        body: { title, text, maxCount, sortBy },
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});
export const {
  useLazyGetVideosQuery,
  useAddFavoriteRequestMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteRequestMutation,
  useChangeFavoriteRequestMutation,
} = fetchYoutubeApi;
