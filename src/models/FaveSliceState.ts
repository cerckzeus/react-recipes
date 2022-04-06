export interface recipeFaveItem {
  recipeId: string;
  label: string;
  imageUrl: string;
  calories: number;
  ingredients: number;
}

export interface faveSliceState {
  faveRecipes: recipeFaveItem[];
  changed: boolean;
}
