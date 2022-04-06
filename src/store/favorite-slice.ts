import { createSlice } from "@reduxjs/toolkit";
import { faveSliceState } from "../models/FaveSliceState";

const initialState: faveSliceState = {
  faveRecipes: [],
  changed: false,
};

const favoriteSlice = createSlice({
  initialState,
  name: "favorite",
  reducers: {
    clearFavorites(state) {
    state.faveRecipes = [];
    state.changed = false;
  },
    replaceFavorites: (state, action) => {
        state.faveRecipes = action.payload;
    },
    addToFavorites: (state, action) => {
      state.changed = true;
      state.faveRecipes.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.changed = true;
      const id = action.payload;
      state.faveRecipes = state.faveRecipes.filter(
        (item) => item.recipeId !== id
      );
    },
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice;
