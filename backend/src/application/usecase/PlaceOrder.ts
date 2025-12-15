import AccountRepository from "../../infra/repository/AccountRepository";
import { inject } from "../../infra/di/Registry";
import OrderRepository from "../../infra/repository/OrderRepository";
import Order from "../../domain/Order";

export default class PlaceOrder {
    @inject("accountRepository")
    accountRepository!: AccountRepository;
    @inject("orderRepository")
    orderRepository!: OrderRepository;

    async execute (input: Input): Promise<Output> {
        const account = await this.accountRepository.getById(input.accountId);
        const order = Order.create(input.accountId, input.marketId, input.side, input.quantity, input.price);
        this.orderRepository.save(order);
        return {
            orderId: order.orderId
        }
    }
}

type Input = {
    accountId: string,
    marketId: string,
    side: string,
    quantity: number,
    price: number
}

type Output = {
    orderId: string
}