import { FilterAlt, SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Paper } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import CSSTransition from "react-transition-group/CSSTransition";
import { filters } from "../../models/Filters";
import {
    FilterContainer,
    FilterContent,
    FiltersButton,
    RecipeHeader
} from "../styles/RecipeContentHeader.styled";
import Button from "../UI/Button";
import Checkmarks from "../UI/Checkmarks";

interface Props {
  setFilters: (filters: filters) => void;
}

const RecipeContentHeader: React.FC<Props> = (props) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const [isReset, setIsReset] = useState(false);
  const [diets, setDiets] = React.useState<string[]>([]);
  const [mealTypes, setMealTypes] = React.useState<string[]>([]);
  const [dishTypes, setDishTypes] = React.useState<string[]>([]);
  const [cuisineType, setCuisineType] = React.useState<string[]>([]);
  const history = useHistory();

  const initialValues: { search: string } = {
    search: "",
  };

  const dietChangedHandler = (diets: string[]) => {
    setDiets(diets);
    setIsReset(false);
  };
  const mealTypesChangedHandler = (mealTypes: string[]) => {
    setMealTypes(mealTypes);
    setIsReset(false);
  };
  const dishTypesChangedHandler = (dishTypes: string[]) => {
    setDishTypes(dishTypes);
    setIsReset(false);
  };
  const cuisineTypeChangedHandler = (cuisineType: string[]) => {
    setCuisineType(cuisineType);
    setIsReset(false);
  };

  const resetFiltersHandler = () => {
    setIsReset(true);
    setDiets([]);
    setMealTypes([]);
    setDishTypes([]);
    setCuisineType([]);
  };

  return (
    <RecipeHeader
      filterContainerHeight={filterContainerRef.current?.scrollHeight + "px"}
    >
      <Paper className="search-filled">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            props.setFilters({
              diet: diets,
              cuisineType: cuisineType,
              dishType: dishTypes,
              mealType: mealTypes,
            });
            if (values.search) history.push(`/?q=${values.search}`);
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
      <FiltersButton
        type="button"
        onClick={() => setFilterIsOpen((prevState) => !prevState)}
      >
        <FilterAlt /> Filter
      </FiltersButton>
      <CSSTransition in={filterIsOpen} timeout={1000} classNames="filters">
        <FilterContainer
          className={filterIsOpen ? "" : "filters-container"}
          ref={filterContainerRef}
        >
          <FilterContent>
            <Checkmarks
              reset={isReset}
              label="Diet"
              items={[
                "balanced",
                "high-fiber",
                "high-protein",
                "low-carb",
                "low-fat",
                "low-sodium",
              ]}
              changeHandler={dietChangedHandler}
            />
            <Checkmarks
              reset={isReset}
              changeHandler={mealTypesChangedHandler}
              label="Meal Types"
              items={["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"]}
            />
            <Checkmarks
              reset={isReset}
              changeHandler={dishTypesChangedHandler}
              label="Dish Types"
              items={[
                "Alcohol-cocktail",
                "Biscuits and cookies",
                "Bread",
                "Cereals",
                "Condiments and sauces",
                "Drinks",
                "Desserts",
                "Egg",
                "Main course",
                "Omelet",
                "Pancake",
                "Preps",
                "Preserve",
                "Salad",
                "Sandwiches",
                "Soup",
                "Starter",
              ]}
            />
            <Checkmarks
              changeHandler={cuisineTypeChangedHandler}
              reset={isReset}
              label="Cuisine Type"
              items={[
                "American",
                "Asian",
                "British",
                "Caribbean",
                "Central Europe",
                "Chinese",
                "Eastern Europe",
                "French",
                "Indian",
                "Italian",
                "Japanese",
                "Kosher",
                "Mediterranean",
                "Mexican",
                "Middle Eastern",
                "Nordic",
                "South American",
                "South East Asian",
              ]}
            />
            <div>
              <Button onClick={resetFiltersHandler}>Reset</Button>
            </div>
          </FilterContent>
        </FilterContainer>
      </CSSTransition>
    </RecipeHeader>
  );
};

export default RecipeContentHeader;
