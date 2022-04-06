import { SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Paper } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchRecipes, paginate } from "../../lib/api";
import { RecipeResultType } from "../../models/RecipeResult";
import { selectPage } from "../../store";
import { pageActions } from "../../store/page-slice";
import RecipeItem from "./RecipeItem";

let isInitial = true;

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();
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
      let result;
      if (isInitial === false && !!queryParams.get("q")) {
        result = await fetchRecipes(queryParams.get("q")!);
      } else {
        result = await fetchRecipes("chicken");
      }

      if (result.data.hits.length > 0) {
        dispatch(
          pageActions.initialStorePageLinks([
            result.config.url!,
            result.data._links.next.href,
          ])
        );
        setRecipes(result.data.hits);
      }
    };
    isInitial = false;
    fetchData();
  }, [queryParams, dispatch]);

  const initialValues: { search: string } = {
    search: "",
  };

  const nextPageHandler = () => {
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
    dispatch(pageActions.decCurrIdx());
    const fetchData = async () => {
      let result = await paginate(pageLinks[currIdx - 1]);

      setRecipes(result.data.hits);
    };
    fetchData();
  };

  return (
    <RecipeListWrapper>
      <Paper className="search-filled">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            history.push(`/?q=${values.search}`);
          }}
        >
          {({ submitForm }) => (
            <Form>
              <Box margin={1}>
                <Field
                  component={TextField}
                  name="search"
                  type="search"
                  label="Search"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="search"
                          onClick={submitForm}
                          edge="end"
                        >
                          <SearchOutlined />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
      <RecipesWrapper>
        {recipes.length === 0 && <p>No data found.</p>}
        {recipes.map((item: RecipeResultType, idx) => (
          <RecipeItem key={idx} recipe={item.recipe} />
        ))}
      </RecipesWrapper>
      <div>
        {currIdx !== 0 && (
          <PaginationButton onClick={prevPageHandler}>BACK</PaginationButton>
        )}
        <PaginationButton onClick={nextPageHandler}>NEXT</PaginationButton>
      </div>
    </RecipeListWrapper>
  );
};

const RecipeListWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  & .search-filled {
    margin-top: 1rem;
    padding: 0.5rem;
    width: 700px;
  }

  @media screen and (max-width: 720px) {
    & .search-filled {
    width: 90vw;
  }
  }
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
