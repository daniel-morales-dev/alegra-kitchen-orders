import { Service } from "typedi";
import RedisClient from "../redis/redis.client";
import Redis from "ioredis";

@Service()
export class ReceiveIngredientsFromRecipe {
  private redisClient: RedisClient;
  constructor(private client: RedisClient) {
    this.redisClient = RedisClient.getInstance();
  }
}
