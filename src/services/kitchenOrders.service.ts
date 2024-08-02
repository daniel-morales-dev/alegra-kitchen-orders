import { Service } from "typedi";
import { KitchenOrdersRepository } from "../repositories/kitchenOrders.repository";

@Service()
export class KitchenOrdersService {
  constructor(
    private readonly kitchenOrdersRepository: KitchenOrdersRepository,
  ) {}

  async getKitchenOrders() {
    return await this.kitchenOrdersRepository.getKitchenOrders();
  }
}
