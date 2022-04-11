import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchRecipes, paginate } from "../../lib/api";
import { RecipeResultType } from "../../models/RecipeResult";
import { selectPage } from "../../store";
import { pageActions } from "../../store/page-slice";
import RecipeItem from "./RecipeItem";
import RecipeContentHeader from "./RecipeContentHeader";
import { filters } from "../../models/Filters";

// let isInitial = true;

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtersQuery, setFiltersQuery] = useState<filters>({
    cuisineType: [],
    diet: [],
    dishType: [],
    mealType: [],
  });
  const location = useLocation();
  const dispatch = useDispatch();
  const { currIdx, pageLinks } = useSelector(selectPage);
  const queryParams = React.useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  useEffect(() => {
    dispatch(pageActions.clearPageState());
    const fetchData = async () => {
      let result = await fetchRecipes(queryParams.get("q")!, filtersQuery);

      if (result.data.hits.length > 0) {
        if (!result.data._links.next) {
          dispatch(pageActions.initialStorePageLinks([result.config.url!]));
        } else {
          dispatch(
            pageActions.initialStorePageLinks([
              result.config.url!,
              result.data._links.next.href,
            ])
          );
        }
      }
      setRecipes(result.data.hits);
    };
    fetchData();
  }, [queryParams, dispatch, filtersQuery]);

  const setFiltersHandler = (filters: filters) => {
    setFiltersQuery(filters);
  };

  const nextPageHandler = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
    dispatch(pageActions.incCurrIdx());
    const fetchData = async () => {
      let result = await paginate(pageLinks[currIdx + 1]);
      if (currIdx + 2 === pageLinks.length) {
        dispatch(pageActions.storePageLink(result.data._links.next.href));
      }

      setRecipes(result.data.hits);
    };
    fetchData();
  };

  const prevPageHandler = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
    dispatch(pageActions.decCurrIdx());
    const fetchData = async () => {
      let result = await paginate(pageLinks[currIdx - 1]);

      setRecipes(result.data.hits);
    };
    fetchData();
  };

  return (
    <RecipeListWrapper>
      <RecipeContentHeader setFilters={setFiltersHandler} />
      <RecipesWrapper>
        {recipes.length === 0 && <p>No data found.</p>}
        {recipes.map((item: RecipeResultType, idx) => (
          <RecipeItem key={idx} recipe={item.recipe} />
        ))}
      </RecipesWrapper>
      <div>
        {currIdx !== 0 && (
          <PaginationButton type="button" onClick={prevPageHandler}>
            BACK
          </PaginationButton>
        )}
        {pageLinks.length > 1 && (
          <PaginationButton type="button" onClick={nextPageHandler}>
            NEXT
          </PaginationButton>
        )}
      </div>
    </RecipeListWrapper>
  );
};

const RecipeListWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PaginationButton = styled.button`
  cursor: pointer;
  border: 2px solid #28a835;
  text-decoration: none;
  color: #fff;
  border-radius: 5px;
  background-color: #28a835;
  margin: 1rem;
  padding: 1.5rem 2rem;
  &:hover {
    border: 2px solid #28a835;
    color: #28a835;
    background-color: transparent;
  }
`;

const RecipesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  max-width: 80vw;
`;

export default Home;
