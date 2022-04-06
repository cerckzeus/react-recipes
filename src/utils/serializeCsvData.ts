export const serializeCsvData = (recipeDetails: any) => {
  let csvData = [];
  let totalNutrients = [];
  let unit = [];
  csvData.push({ label: recipeDetails?.recipe.label });
  for (let i = 0; i < recipeDetails?.recipe.ingredientLines.length!; i++) {
    csvData[i] = {
      ...csvData[i],
      ingredients: recipeDetails?.recipe.ingredientLines[i],
    };
  }
  for (let i = 0; i < recipeDetails?.recipe.healthLabels.length!; i++) {
    csvData[i] = {
      ...csvData[i],
      healthLabels: recipeDetails?.recipe.healthLabels[i],
    };
  }
  for (const property in recipeDetails?.recipe.totalNutrients) {
    totalNutrients.push(recipeDetails?.recipe.totalNutrients[property].label);
    unit.push(
      `${Math.round(
        recipeDetails?.recipe.totalNutrients[property].quantity!
      )} ${recipeDetails?.recipe.totalNutrients[property].unit}`
    );
  }
  for (let i = 0; i < totalNutrients.length!; i++) {
    csvData[i] = {
      ...csvData[i],
      nutrients: totalNutrients[i],
    };
  }
  for (let i = 0; i < unit.length!; i++) {
    csvData[i] = {
      ...csvData[i],
      unit: unit[i],
    };
  }
  return csvData;
};
