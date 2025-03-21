export interface IWorker {
  run(message: string, ack: () => void): void;
}

export interface IQueuesToSubscribe {
  NAME: string;
  HANDLER: new (...args: any[]) => IWorker;
  PREFETCH?: number;
}
