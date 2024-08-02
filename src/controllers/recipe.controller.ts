import { Get, JsonController, Param, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { RecipesService } from "../services/recipe.service";
import RedisClient from "../redis/redis.client";
import { v4 } from "uuid";
import serverAmqp from "../amqp/server.amqp";
import { QUEUES } from "../amqp/queues.amqp";
import { IIngredientFromRecipe } from "../interfaces/requestIngredientFromRecipe.interface";

@JsonController("/v1/recipes")
@Service()
export class RecipesController {
  private redisClient: RedisClient;
  constructor(private readonly recipeService: RecipesService) {
    this.redisClient = RedisClient.getInstance();
  }

  @Get("/")
  async getRecipes() {
    const recipes = await this.recipeService.getAllRecipes();
    const messageId = v4();

    const msg = {
      action: QUEUES.REQUEST_INGREDIENTS_FROM_RECIPE.NAME,
      uuid: messageId,
      status: "pending",
      recipes,
    };

    await this.redisClient.set(`${msg.action}:${messageId}`, msg, 300);

    await serverAmqp.sendToQueue(
      QUEUES.REQUEST_INGREDIENTS_FROM_RECIPE.NAME,
      msg,
    );

    return msg;
  }

  @Get("/:uuid")
  async getStatusMessageRecipe(@Param("uuid") uuid: string) {
    return await this.redisClient.get<IIngredientFromRecipe>(
      `${QUEUES.REQUEST_INGREDIENTS_FROM_RECIPE.NAME}:${uuid}`,
    );
  }
}
