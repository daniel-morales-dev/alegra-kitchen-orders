import { Recipes } from "../models/recipes.model";

export interface IReceiveIngredientsMessage {
  status: string;
  uuid: string;
  recipe: Recipes;
  keyRedis: string;
}
