import { Service } from "typedi";
import RedisClient from "../redis/redis.client";
import { QUEUES } from "../amqp/queues.amqp";

@Service()
export class ProcessOrderWorker {
  private redisClient: RedisClient;
  constructor() {
    this.redisClient = RedisClient.getInstance();
  }
  async run(message: string, ack: () => void) {
    const msg = JSON.parse(message);
    try {
      console.log("Processing message:", msg);
      const keyRedis = `${QUEUES.REGISTER_ORDER.NAME}:${msg.data.uuid}`;
      const redisTest = await this.redisClient.get(keyRedis);
      const newData = JSON.parse(redisTest);
      newData.status = "processing";
      console.log("Redis Test:", JSON.parse(redisTest));
      await new Promise((resolve) => setTimeout(resolve, 20000));
      await this.redisClient.set(keyRedis, JSON.stringify(newData));
      console.log("Message processed successfully");
      ack();
    } catch (exception) {
      console.error("ERROR: RegisterOrderWorker.run", exception);
      throw exception;
    }
  }
}
