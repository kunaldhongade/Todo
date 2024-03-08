import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ModelState {
  todoIdToFetchForModal: string; // todoId just need by model to fetch todo if we want to edit it so input field will be filled with todo text
  modalStatus: boolean;
}

interface ModalStatus {
  modalStatus: boolean;
}

const initialState: ModelState = {
  todoIdToFetchForModal: "",
  modalStatus: false,
};
// it just describe what data in our global state we want to change
// our component can access this global state and change it
// and we can access this global state from any component
// we can't mutate state directly

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // reducers is just a function that take state and action and return new state

    toggleModal: (state, action: PayloadAction<ModalStatus>) => {
      state.modalStatus = action.payload.modalStatus;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
