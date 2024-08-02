import { ProcessOrderWorker } from "../workers/processOrderWorker";
import { IQueuesToSubscribe } from "../interfaces/queuesToSubscribe.interface";
import { ReceiveIngredients } from "../workers/receiveIngredients.worker";
import { ReceiveRequestRecipeUserWorker } from "../workers/receiveRequestRecipeUser.worker";

export const QUEUES = {
  REGISTER_ORDER: {
    NAME: "REGISTER_ORDER",
    HANDLER: ProcessOrderWorker,
    PREFETCH: 1,
  },
  REQUEST_FOOD: {
    NAME: "REQUEST_FOOD",
  },
  SEND_INGREDIENTS: {
    NAME: "SEND_INGREDIENTS",
    HANDLER: ReceiveIngredients,
    PREFETCH: 1,
  },
  RECEIVE_ORDER_FINISHED: {
    NAME: "RECEIVE_ORDER_FINISHED",
  },
  UPDATE_STATUS_ORDER: {
    NAME: "UPDATE_STATUS_ORDER",
  },
  REQUEST_INGREDIENTS_FROM_RECIPE: {
    NAME: "REQUEST_INGREDIENTS_FROM_RECIPE",
  },
  RECEIVE_INGREDIENTS_FROM_RECIPE: {
    NAME: "SEND_REQUEST_RECIPE_USER",
    HANDLER: ReceiveRequestRecipeUserWorker,
    PREFETCH: 1,
  },
};

export const QUEUES_TO_SUBSCRIBE: IQueuesToSubscribe[] = [
  QUEUES.REGISTER_ORDER,
  QUEUES.SEND_INGREDIENTS,
  QUEUES.RECEIVE_INGREDIENTS_FROM_RECIPE,
];
