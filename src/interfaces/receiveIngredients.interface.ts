import { Recipes } from "../models/recipes.model";
import { RecipeIngredients } from "../models/recipeIngredients.model";

export interface IReceiveIngredientsMessage {
  status: "pending" | "in_kitchen" | "finished";
  uuid: string;
  recipe?: IRecipesWithIngredientsNameOptional;
  keyRedis: string;
}

export interface IRecipeIngredientsWithOptionalName extends RecipeIngredients {
  name?: string;
}

export interface IRecipesWithIngredientsNameOptional extends Recipes {
  recipeIngredients: IRecipeIngredientsWithOptionalName[];
}
