import client, { Connection, Channel } from "amqplib";
import { AMQP_URL } from "../config/app.config";
import { Service, Container } from "typedi";
import { QUEUES_TO_SUBSCRIBE } from "./queues.amqp";

type HandlerCB = (msg: string, ack: () => void) => any;

@Service()
class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected: boolean = false;

  async connect() {
    if (this.connected && this.channel) return;
    try {
      console.log("⌛️ Connecting to RabbitMQ Server");
      this.connection = await client.connect(AMQP_URL);
      console.log("✅ RabbitMQ Connection is ready");
      this.channel = await this.connection.createChannel();
      console.log("🛸 Created RabbitMQ Channel successfully");
      this.connected = true;
    } catch (error) {
      console.error(error);
      console.error("Not connected to MQ Server");
    }
  }

  async consume(
    handleIncomingNotification: HandlerCB,
    queueName: string,
  ): Promise<void> {
    await this.channel.assertQueue(queueName, { durable: true });
    this.channel.consume(
      queueName,
      (msg) => {
        if (!msg) return console.error("Invalid incoming message");
        handleIncomingNotification(msg.content.toString(), () =>
          this.channel.ack(msg),
        );
      },
      { noAck: false },
    );
  }

  async sendToQueue(queue: string, message: any) {
    try {
      if (!this.channel) await this.connect();
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async initializeSubscription() {
    for (const queue of QUEUES_TO_SUBSCRIBE) {
      const handlerInstance = Container.get(queue.HANDLER);
      await this.consume(
        (msg: string, ack: () => void) => handlerInstance.run(msg, ack),
        queue.NAME,
      );
      console.info(`[INFO]Subscribed to queue: ${queue.NAME}`);
    }
  }
}

const mqConnection = new RabbitMQConnection();

export default mqConnection;
