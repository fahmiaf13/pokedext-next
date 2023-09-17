import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
