import { ArrowBack, Favorite, FavoriteBorder } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { fetchSpecificRecipe } from "../../lib/api";
import { RecipeResultType } from "../../models/RecipeResult";
import { selectFavorites } from "../../store";
import { favoriteActions } from "../../store/favorite-slice";
import { serializeCsvData } from "../../utils/serializeCsvData";
import { RecipeDetailsContent, RecipeDetailsWrapper } from "../styles/RecipeDetails.styled";
import Button from "../UI/Button";

const RecipeDetails: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ recipeId: string }>();
  const componentRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { faveRecipes } = useSelector(selectFavorites);
  const [recipeDetails, setRecipeDetails] = useState<RecipeResultType>();
  const { recipeId } = params;

  useEffect(() => {
    setIsFavorite(faveRecipes.map((item) => item.recipeId).includes(recipeId!));
  }, [faveRecipes, recipeId]);

  useEffect(() => {
    const fetchData = async () => {
      let result = await fetchSpecificRecipe(recipeId);
      setRecipeDetails(result);
    };
    fetchData();
  }, [recipeId]);
  console.log(recipeDetails);

  const nutrients = [];
  for (const property in recipeDetails?.recipe.totalNutrients) {
    nutrients.push(
      <div key={property} className="nutrients">
        <span>{recipeDetails?.recipe.totalNutrients[property].label}</span>
        <span>
          {Math.round(recipeDetails?.recipe.totalNutrients[property].quantity!)}{" "}
          {recipeDetails?.recipe.totalNutrients[property].unit}
        </span>
      </div>
    );
  }

  const faveChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(
        favoriteActions.addToFavorites({
          recipeId: recipeId,
          label: recipeDetails?.recipe.label,
          imageUrl: recipeDetails?.recipe.images.SMALL.url,
          calories: Math.round(recipeDetails?.recipe.calories!),
          ingredients: recipeDetails?.recipe.ingredientLines.length,
        })
      );
    }
    if (!event.target.checked) {
      dispatch(favoriteActions.removeFromFavorites(recipeId));
    }
  };

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <button>
        <FaFilePdf size={50} />
      </button>
    );
  }, []);

  const headers = [
    { label: "Recipe Name", key: "label" },
    { label: "Ingredients", key: "ingredients" },
    { label: "Nutrients", key: "nutrients" },
    { label: "Unit", key: "unit" },
    { label: "Health Labels", key: "healthLabels" },
  ];

  const csvRecipe = {
    filename: recipeDetails?.recipe.label,
    headers: headers,
    data: serializeCsvData(recipeDetails),
  };
  return (
    <RecipeDetailsWrapper>
      <div className="export-actions">
        <ReactToPrint
          content={reactToPrintContent}
          documentTitle={recipeDetails?.recipe.label}
          removeAfterPrint
          trigger={reactToPrintTrigger}
        />
        <CSVLink {...csvRecipe}>
          <FaFileCsv size={50} />
        </CSVLink>
      </div>

      <RecipeDetailsContent ref={componentRef}>
        <div className="nav">
          <Link to="/">
            <ArrowBack sx={{ fontSize: 40 }} />
          </Link>
          <h1>{recipeDetails?.recipe.label}</h1>
          <Checkbox
          checked={isFavorite}
            onChange={faveChangeHandler}
            icon={<FavoriteBorder sx={{ fontSize: 40 }} />}
            checkedIcon={<Favorite sx={{ color: "#ee0028", fontSize: 40 }} />}
          />
        </div>
        <div className="head-content">
          <img alt="" src={recipeDetails?.recipe.images.REGULAR.url} />
          <div>
            {recipeDetails?.recipe.healthLabels.map((item, idx, arr) => {
              if (arr.length - 1 === idx) {
                return <span key={idx}>{item}.</span>;
              } else {
                return <span key={idx}>{item}, </span>;
              }
            })}
          </div>
        </div>
        <div className="recipe-details">
          <div className="col">
            <span>{recipeDetails?.recipe.yield} servings</span>
            <span>
              <strong>
                {Math.round(
                  recipeDetails?.recipe.calories! / recipeDetails?.recipe.yield!
                ).toString()}
              </strong>{" "}
              kcal
            </span>
            <h2>Ingredients</h2>
            {recipeDetails?.recipe.ingredientLines.map((item, idx) => (
              <div key={idx} className="ingredient">• {item}</div>
            ))}
            <div className="instructions">
              <span>Click here for detailed instructions</span>
              <div>Source: {recipeDetails?.recipe.source}</div>
              <a
                href={recipeDetails?.recipe.url!}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button>Instructions</Button>
              </a>
            </div>
          </div>
          <div className="col">
            <p>Total Nutrients</p>
            {nutrients.map((item) => item)}
          </div>
        </div>
      </RecipeDetailsContent>
    </RecipeDetailsWrapper>
  );
};

export default RecipeDetails;
