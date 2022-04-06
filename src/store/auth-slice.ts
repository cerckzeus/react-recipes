import { createSlice } from "@reduxjs/toolkit";
import { favoriteActions } from "./favorite-slice";


interface authSliceState {
  token: string | null;
  email: string | null;
  localId: string | null;
  isLoggedIn: boolean;
}

const initialState: authSliceState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  localId: localStorage.getItem("localId"),
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const loginData = action.payload;
      state.token = loginData.idToken;
      state.email = loginData.email;
      state.localId = loginData.localId;
      localStorage.setItem("token", loginData.idToken);
      localStorage.setItem("localId", loginData.localId);
      localStorage.setItem("email", loginData.email);
      state.isLoggedIn = !!localStorage.getItem("token");
    },
    logout(state) {
      state.token = null;
      state.localId = null;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("localId");
      localStorage.removeItem("email");
      state.isLoggedIn = false;
    },
  },
});

export const logOutAction = () => {
    return (dispatch: any) => {
      dispatch(favoriteActions.clearFavorites());
    };
};


export const authActions = authSlice.actions;

export default authSlice;