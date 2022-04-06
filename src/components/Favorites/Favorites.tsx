import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { recipeFaveItem } from "../../models/FaveSliceState";
import { selectFavorites } from "../../store";
import FaveRecipeItem from "./FaveRecipeItem";

const Favorites: React.FC = () => {
  const favorites = useSelector(selectFavorites);
  return (
    <FavoritesWrapper>
      <RecipesWrapper>
        {favorites.faveRecipes.length === 0 && <p>No data found.</p>}
        {favorites.faveRecipes.map((faveItem: recipeFaveItem, idx) => (
          <FaveRecipeItem key={idx} recipe={faveItem} />
        ))}
      </RecipesWrapper>
    </FavoritesWrapper>
  );
};

const FavoritesWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const RecipesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  max-width: 80vw;
`;

export default Favorites;
