import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import favoriteSlice from "./favorite-slice";
import pageSlice from "./page-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    favorites: favoriteSlice.reducer,
    page: pageSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectAuth = (state: RootState) => state.auth;
export const selectUi = (state: RootState) => state.ui;
export const selectFavorites = (state: RootState) => state.favorites;
export const selectPage = (state: RootState) => state.page;

export default store;
