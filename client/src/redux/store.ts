import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../services/todos.ts";
import modalReducer from "./features/modalSlice.ts";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(todoApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
