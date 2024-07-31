import { Service } from "typedi";
import RedisClient from "../redis/redis.client";
import { QUEUES } from "../amqp/queues.amqp";
import serverAmqp from "../amqp/server.amqp";
import { RecipesRepository } from "../repositories/recipes.repository";

@Service()
export class ProcessOrderWorker {
  private redisClient: RedisClient;
  constructor(private readonly recipeRepository: RecipesRepository) {
    this.redisClient = RedisClient.getInstance();
  }
  async run(message: string, ack: () => void) {
    const msg = JSON.parse(message);
    try {
      console.log("Processing message:", msg);
      const keyRedis = `${QUEUES.REGISTER_ORDER.NAME}:${msg.data.uuid}`;
      const redisMessage = await this.redisClient.get(keyRedis);

      redisMessage.status = "processing";

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

      await serverAmqp.sendToQueue(QUEUES.REQUEST_FOOD.NAME, {
        ingredients: ingredientsToRequest,
        uuid: msg.data.uuid,
        keyRedis,
        recipe: randomRecipe,
      });

      ack();
    } catch (exception) {
      console.error("ERROR: RegisterOrderWorker.run", exception);
      throw exception;
    }
  }
}
