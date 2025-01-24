import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetVideosResponse, VideoSearchParams } from '../../components/type';

export const apiYoutubeUrl: string = import.meta.env.VITE_YOUTUBE_API_URL;
export const apiKey: string = import.meta.env.VITE_API_KEY;

export const fetchYoutubeApi = createApi({
  reducerPath: 'fetchYoutubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiYoutubeUrl}`,
  }),
  tagTypes: ['Videos'],
  endpoints: (builder) => ({
    getVideos: builder.query<GetVideosResponse, VideoSearchParams>({
      query: ({ searchText = '', count = 12, sort = 'date' }) => ({
        url: `/search?key=${apiKey}`,
        params: { part: 'snippet', q: searchText, order: sort, maxResults: count },
      }),
      providesTags: (result) => (result ? ['Videos'] : []),
    }),
  }),
});
export const { useLazyGetVideosQuery } = fetchYoutubeApi;
