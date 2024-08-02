import { IReceiveIngredientsMessage } from "./receiveIngredients.interface";

export interface IIngredientFromRecipe {
  action: string;
  uuid: string;
  status: "pending" | "finished";
  recipe?: IReceiveIngredientsMessage[];
}
