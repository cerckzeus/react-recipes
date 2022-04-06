import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { fetchFavoriteAction, sendFavoriteAction } from "./lib/api";
import FavoritesPage from "./pages/FavoritesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import RecipeListPage from "./pages/RecipeListPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { selectAuth, selectFavorites } from "./store";

let isInitial = true;

function App() {
  const { isLoggedIn, token } = useSelector(selectAuth);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (favorites.changed) {
      dispatch(sendFavoriteAction(favorites));
    }
  }, [favorites, dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn && !!token && <RecipeListPage />}
          {!isLoggedIn && !token && <SignUpPage />}
        </Route>
        {isLoggedIn && (
          <Route path="/recipe/:recipeId">
            <RecipeDetailsPage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/favorites">
            <FavoritesPage />
          </Route>
        )}
        {!isLoggedIn && !token && (
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
        )}
        {!isLoggedIn && !token && (
          <Route path="/sign-in">
            <SignInPage />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
