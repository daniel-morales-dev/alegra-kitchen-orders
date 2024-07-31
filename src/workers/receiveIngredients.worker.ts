import { Service } from "typedi";
import RedisClient from "../redis/redis.client";
import { QUEUES } from "../amqp/queues.amqp";
import serverAmqp from "../amqp/server.amqp";
import { IReceiveIngredientsMessage } from "../interfaces/receiveIngredients.interface";

@Service()
export class ReceiveIngredients {
  private redisClient: RedisClient;
  constructor() {
    this.redisClient = RedisClient.getInstance();
  }
  async run(message: string, ack: () => void) {
    const msg: IReceiveIngredientsMessage = JSON.parse(message);
    try {
      const { keyRedis, recipe, uuid, status } = msg;
      console.info("[INFO] Receiving ingredients from order id", uuid);

      const newMessage = {
        keyRedis,
        recipe,
        uuid,
        status: "in_kitchen",
      };

      await this.redisClient.set(keyRedis, newMessage);

      // Simulate any process
      await new Promise((res) => setTimeout(res, 3000));

      await serverAmqp.sendToQueue(
        QUEUES.RECEIVE_ORDER_FINISHED.NAME,
        newMessage,
      );
      console.info(`[INFO] Order ${uuid} cooked`);
      console.info(`[INFO] Send order ${uuid} to manager`);

      ack();
    } catch (exception) {
      console.error("ERROR: RegisterOrderWorker.run", exception);
      throw exception;
    }
  }
}
