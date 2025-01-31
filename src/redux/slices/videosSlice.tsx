import { createSlice } from '@reduxjs/toolkit';
import { fetchGetVideos } from '../actions/videosThunkAction';
import { VideosSliceInitialState } from '../../components/type';

const initialState: VideosSliceInitialState = {
  videos: null,
  isLoading: false,
  isSuccess: false,
  error: '',
};
const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetVideos.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchGetVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.videos = action.payload;
        state.error = '';
      })
      .addCase(fetchGetVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = `${action.payload}`;
      });
  },
});
export default videosSlice.reducer;
