import { Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { KitchenOrders } from "../models/kitchenOrder.model";

@Service()
export class KitchenOrdersRepository extends Repository<KitchenOrders> {
  constructor(dataSource: DataSource) {
    super(KitchenOrders, dataSource.createEntityManager());
  }

  getKitchenOrders() {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    return this.createQueryBuilder("ko")
      .select(["ko.id", "ko.orderUuid", "r.id", "r.name", "ko.createdAt"])
      .innerJoin("ko.recipe", "r")
      .where("ko.createdAt >= :startOfDay", { startOfDay })
      .andWhere("ko.createdAt < :endOfDay", { endOfDay })
      .getMany();
  }
}
