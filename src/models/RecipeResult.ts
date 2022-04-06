// interface totalNutrientsType {
//   label: string;
//   quantity: number;
//   unit: string;
// }

export interface RecipeResultType {
  recipe: {
    uri: string;
    label: string;
    images: { REGULAR: { url: string }; SMALL: { url: string } };
    calories: number;
    ingredientLines: string[];
    healthLabels: string[];
    totalNutrients: any;
    yield: number;
    source: string;
    url: string;
  };
}