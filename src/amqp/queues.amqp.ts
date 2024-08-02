import { ProcessOrderWorker } from "../workers/processOrderWorker";
import { IQueuesToSubscribe } from "../interfaces/queuesToSubscribe.interface";
import { ReceiveIngredients } from "../workers/receiveIngredients.worker";

export const QUEUES = {
  REGISTER_ORDER: {
    NAME: "REGISTER_ORDER",
    HANDLER: ProcessOrderWorker,
    PREFETCH: 2,
  },
  REQUEST_FOOD: {
    NAME: "REQUEST_FOOD",
  },
  SEND_INGREDIENTS: {
    NAME: "SEND_INGREDIENTS",
    HANDLER: ReceiveIngredients,
    PREFETCH: 2,
  },
  RECEIVE_ORDER_FINISHED: {
    NAME: "RECEIVE_ORDER_FINISHED",
  },
  UPDATE_STATUS_ORDER: {
    NAME: "UPDATE_STATUS_ORDER",
  },
};

export const QUEUES_TO_SUBSCRIBE: IQueuesToSubscribe[] = [
  QUEUES.REGISTER_ORDER,
  QUEUES.SEND_INGREDIENTS,
];
