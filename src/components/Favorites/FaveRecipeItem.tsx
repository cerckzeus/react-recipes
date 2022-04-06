import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { recipeFaveItem } from "../../models/FaveSliceState";
import { selectFavorites } from "../../store";
import { favoriteActions } from "../../store/favorite-slice";

const FaveRecipeItem: React.FC<{ recipe: recipeFaveItem }> = ({ recipe }) => {
  const dispatch = useDispatch();
  const { faveRecipes } = useSelector(selectFavorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(
      faveRecipes.map((item) => item.recipeId).includes(recipe.recipeId!)
    );
  }, [faveRecipes, recipe.recipeId]);

  const faveChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      dispatch(favoriteActions.removeFromFavorites(recipe.recipeId));
    }
  };

  return (
    <RecipeContainer>
      <Link className="image-container" to={`/recipe/${recipe.recipeId}`}>
        <img alt="" src={recipe.imageUrl} />
        <p>
          <strong>{recipe.label}</strong>
        </p>
      </Link>
      <div className="details">
        <Checkbox
          checked={isFavorite}
          onChange={faveChangeHandler}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "#ee0028" }} />}
        />
        <span>CALORIES: {Math.round(recipe.calories)}</span>
        <span>INGREDIENTS: {recipe.ingredients}</span>
      </div>
    </RecipeContainer>
  );
};
const RecipeContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
  padding: 0.5rem;
  width: 220px;
  text-align: center;
  & a {
    text-decoration: none;
    color: #000;
  }
  & .image-container {
    cursor: pointer;
    :hover {
      color: #28a835;
    }
  }
  & .details {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    span {
      margin: 0 2px;
    }
  }

  &:hover {
    box-shadow: 5px 5px 20px black;
    background-color: rgba(242, 242, 242, 0.8) !important;
    transition: all 0.4s ease-in-out;
  }
`;
export default FaveRecipeItem;
