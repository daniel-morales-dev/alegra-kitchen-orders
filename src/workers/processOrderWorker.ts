import { Service } from "typedi";
import RedisClient from "../redis/redis.client";
import { QUEUES } from "../amqp/queues.amqp";
import serverAmqp from "../amqp/server.amqp";
import { RecipesRepository } from "../repositories/recipes.repository";
import { IProcessOrderMsg } from "../interfaces/processOrder.interface";

@Service()
export class ProcessOrderWorker {
  private redisClient: RedisClient;
  constructor(private readonly recipeRepository: RecipesRepository) {
    this.redisClient = RedisClient.getInstance();
  }
  async run(message: string, ack: () => void) {
    const msg: IProcessOrderMsg = JSON.parse(message);
    try {
      const { uuid } = msg;
      console.info(`[INFO] Order incoming ${uuid}`);
      const keyRedis = `${QUEUES.REGISTER_ORDER.NAME}:${msg.uuid}`;
      const redisMessage = await this.redisClient.get(keyRedis);

      redisMessage.status = "in_kitchen";

      const randomRecipe = await this.recipeRepository.getRandomRecipe();

      await this.redisClient.set(keyRedis, {
        ...redisMessage,
        keyRedis,
        recipe: randomRecipe,
      });

      const ingredientsToRequest = randomRecipe?.recipeIngredients.map(
        (recipeIngredient) => ({
          ingredientId: recipeIngredient.ingredientId,
          quantity: recipeIngredient.quantity,
        }),
      );

      await serverAmqp.sendToQueue(QUEUES.UPDATE_STATUS_ORDER.NAME, {
        uuid: msg.uuid,
        keyRedis,
        status: "in_kitchen",
        recipe: randomRecipe,
      });

      await serverAmqp.sendToQueue(QUEUES.REQUEST_FOOD.NAME, {
        ingredients: ingredientsToRequest,
        uuid: msg.uuid,
        keyRedis,
        recipe: randomRecipe,
      });

      ack();
    } catch (exception) {
      console.error("ERROR: ProcessOrderWorker.run", exception);
      await serverAmqp.sendToQueue("error_queue", {
        error: exception,
        originalMessage: message,
      });
    }
  }
}
