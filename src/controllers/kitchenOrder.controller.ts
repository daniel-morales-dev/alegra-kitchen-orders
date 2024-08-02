import { Service } from "typedi";
import { Get, JsonController } from "routing-controllers";
import { KitchenOrdersService } from "../services/kitchenOrders.service";

@Service()
@JsonController("/v1/kitchen-orders")
export class KitchenOrderController {
  constructor(private readonly kitchenOrderService: KitchenOrdersService) {}

  @Get("/")
  getTodayKitchenOrders() {
    return this.kitchenOrderService.getKitchenOrders();
  }
}
