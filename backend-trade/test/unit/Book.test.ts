import Book from "../../src/domain/Book";
import Account from "../../src/domain/Account";
import Order from "../../src/domain/Order";
import { MediatorMemory } from "../../src/infra/mediator/Mediator";
import Registry from "../../src/infra/di/Registry";

test("Deve testar a execução de ordens de compra e venda", async () => {
    const mediator = new MediatorMemory();
    const fills: Order[] = [];
    mediator.register("orderFilled", async (order: Order) => {
        fills.push(order);
    });
    Registry.getInstance().provide("mediator", mediator);
    const marketId = "BTC-USD";
    const book = new Book(marketId);
    const account = Account.create("John Doe", "john.doe@gmail.com", "97456321558", "asdQWE123");
    await book.insert(Order.create(account.accountId, marketId, "buy", 1, 85000));
    const depth = book.getDepth();
    expect(depth.buys).toHaveLength(1);
    await book.insert(Order.create(account.accountId, marketId, "sell", 1, 85000));
    const depth2 = book.getDepth()
    expect(depth2.buys).toHaveLength(0);
    expect(depth2.sells).toHaveLength(0);
    expect(fills).toHaveLength(2);
});