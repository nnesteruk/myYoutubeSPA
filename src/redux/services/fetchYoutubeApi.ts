import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type VideosParams = {
  searchText: string;
  count?: number;
  order?: string;
};

const apiUrl: string = import.meta.env.VITE_YOUTUBE_API_URL;
const apiKey: string = import.meta.env.VITE_API_KEY;
export const fetchYoutubeApi = createApi({
  reducerPath: 'fetchYoutubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
  }),
  tagTypes: ['Videos'],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: ({ searchText = '', count = 12, order = 'date' }: VideosParams) => ({
        url: `/search?key=${apiKey}`,
        params: { part: 'snippet', q: searchText, order, maxResults: count },
      }),
      providesTags: (result) => (result ? ['Videos'] : []),
    }),
  }),
});
export const { useLazyGetVideosQuery } = fetchYoutubeApi;
