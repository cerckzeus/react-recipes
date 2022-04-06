import Axios from "axios";
import { faveSliceState } from "../models/FaveSliceState";
import { authActions } from "../store/auth-slice";
import { favoriteActions } from "../store/favorite-slice";
import { uiActions } from "../store/ui-slice";

interface actionCreatorProps {
  email: string;
  password: string;
}

interface registerDataType {
  email: string;
  localId: string;
  favorites: {};
}

export const registerAction = (requestData: actionCreatorProps) => {
  return async (dispatch: any) => {
    dispatch(uiActions.setLoadingStatus("pending"));
    const sendSignUpRequest = async () => {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBq6vLAfvUi8y_FCanYee1fG8GYvRocRQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: requestData.email,
            password: requestData.password,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        //throw error
      }
      return data;
    };
    const sendPostRequest = async (regData: registerDataType) => {
      const res = await fetch(
        "https://react-recipes-609a5-default-rtdb.firebaseio.com/users/" +
          regData.localId +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify({
            email: regData.email,
            id: regData.localId,
            // cart: { totalPieces: 0, totalAmount: 0 },
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        //throw error
      }
      return data;
    };
    try {
      const registerData = await sendSignUpRequest();
      await sendPostRequest(registerData);
      dispatch(uiActions.setLoadingStatus("success"));
    } catch (error) {}
  };
};

export const logInAction = (requestData: actionCreatorProps) => {
  return async (dispatch: any) => {
    dispatch(uiActions.setLoadingStatus("pending"));
    const fetchLoginData = async () => {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBq6vLAfvUi8y_FCanYee1fG8GYvRocRQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: requestData.email,
            password: requestData.password,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        let errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
      return data;
    };
    try {
      const loginData = await fetchLoginData();
      dispatch(authActions.login(loginData));
      dispatch(uiActions.setLoadingStatus("success"));
      dispatch(fetchFavoriteAction());
    } catch (error) {
      console.log("At catch part:");
      console.log(error);
      alert(error);
    }
  };
};

export const fetchRecipes = async (q?: string) => {
  let query = "";
  if (!q) {
    query = "";
  } else {
    query = q;
  }
  const res = await Axios.get(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=092de4ac&app_key=2686ceaeae3b106d11493ce109540622`
  );

  console.log(res);
  return res;
};

export const fetchSpecificRecipe = async (recipeId: string) => {
  const res = await Axios.get(
    `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=092de4ac&app_key=2686ceaeae3b106d11493ce109540622`
  );

  return res.data;
};

export const fetchFavoriteAction = () => {
  return async (dispatch: any) => {
    const id = localStorage.getItem("localId");
    const fetchDataRequest = async () => {
      const res = await Axios.get(
        `https://react-recipes-609a5-default-rtdb.firebaseio.com/users/${id}/favorites.json`
      );

      if (res.status !== 200) {
        //throw error
      }

      const data = await res.data;

      console.log("RESPONSE DATA OF FAVORITES:");
      console.log(data);

      return data;
    };

    try {
      const favorites = await fetchDataRequest();
      dispatch(favoriteActions.replaceFavorites(favorites));
    } catch (error) {}
  };
};

export const sendFavoriteAction = (favorites: faveSliceState) => {
  return async (dispatch: any) => {
    const id = localStorage.getItem("localId");
    const sendDataRequest = async () => {
      const res = await Axios.put(
        `https://react-recipes-609a5-default-rtdb.firebaseio.com/users/${id}/favorites.json`,
        favorites.faveRecipes
      );

      if (res.status !== 200) {
        //throw error
      }

    };
    try {
      await sendDataRequest();
    } catch (error) {}
  };
};

export const paginate = async (url: string) => {
  const res = await Axios.get(url);

  console.log(res);
  return res;
};

export const prevPage = () => {};
