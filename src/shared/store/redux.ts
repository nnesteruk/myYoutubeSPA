import { useDispatch, useSelector } from 'react-redux';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../redux/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string | null;
}>();
