import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  isModalOpen: boolean;
};
const initialState: InitialState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
