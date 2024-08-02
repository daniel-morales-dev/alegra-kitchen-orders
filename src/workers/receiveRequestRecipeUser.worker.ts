import { Service } from "typedi";
import { IWorker } from "../interfaces/queuesToSubscribe.interface";
import RedisClient from "../redis/redis.client";
import { IIngredientFromRecipe } from "../interfaces/requestIngredientFromRecipe.interface";
import serverAmqp from "../amqp/server.amqp";
import { QUEUES } from "../amqp/queues.amqp";

@Service()
export class ReceiveRequestRecipeUserWorker implements IWorker {
  private redisClient: RedisClient;

  constructor() {
    this.redisClient = RedisClient.getInstance();
  }

  async run(message: string, ack: () => void) {
    const msg: IIngredientFromRecipe = JSON.parse(message);
    try {
      await this.redisClient.set(
        `${QUEUES.REQUEST_INGREDIENTS_FROM_RECIPE.NAME}:${msg.uuid}`,
        msg,
        300,
      );
    } catch (err) {
      console.error("ERROR: ReceiveIngredients.run", err);
      await serverAmqp.sendToQueue("error_queue", {
        error: err,
        originalMessage: message,
      });
    } finally {
      ack();
    }
  }
}
