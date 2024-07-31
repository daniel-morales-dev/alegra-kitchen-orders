import { ProcessOrderWorker } from "../workers/processOrderWorker";
import { IQueuesToSubscribe } from "../interfaces/queuesToSubscribe.interface";

export const QUEUES = {
  REGISTER_ORDER: {
    NAME: "REGISTER_ORDER",
    HANDLER: ProcessOrderWorker,
  },
};

export const QUEUES_TO_SUBSCRIBE: IQueuesToSubscribe[] = [
  QUEUES.REGISTER_ORDER,
];

export const QUEUE_LIST = Object.values(QUEUES);
