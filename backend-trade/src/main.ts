import Book from "./domain/Book";
import Order from "./domain/Order";
import BookCache from "./infra/cache/BookCache";
import Registry from "./infra/di/Registry";
import { AxiosAdapter } from "./infra/http/HttpClient";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { MediatorMemory } from "./infra/mediator/Mediator";
import { RabbitMQAdapter } from "./infra/queue/Queue";

async function main() {
    const httpServer = new ExpressAdapter();
    const mediator = new MediatorMemory();
    const httpClient = new AxiosAdapter();
    const queue = new RabbitMQAdapter();
    await queue.connect();
    await queue.setup("orderPlaced", "orderPlaced.executeOrder");
    await queue.setup("orderFilled", "orderFilled.updateOrder");
    await queue.setup("orderRejected", "orderRejected.cancelOrder");
    await queue.setup("orderExecuted", "orderExecuted.updateDepth");
    Registry.getInstance().provide("mediator", mediator);
    // const book = new Book("BTC-USD");
    const bookCache = new BookCache();
    httpServer.route("post", "execute_order", async (params: any, body: any) => {
        const input = body;
        const order = new Order(input.orderId, input.accountId, input.marketId, input.side, input.quantity, input.price, input.fillQuantity, input.fillPrice, input.status, new Date(input.timestamp));
        const book = bookCache.getOrCreate(order.marketId);
        await book.insert(order);
    });
    queue.consume("orderPlaced.executeOrder", async (input: any) => {
        const order = new Order(input.orderId, input.accountId, input.marketId, input.side, input.quantity, input.price, input.fillQuantity, input.fillPrice, input.status, new Date(input.timestamp));
        if (input.quantity > 10000) {
            await queue.publish("orderRejected", order);
            return;
        }
        const book = bookCache.getOrCreate(order.marketId);
        await book.insert(order);
    });
    mediator.register("orderExecuted", async (order: { marketId: string}) => {
        const book = bookCache.getOrCreate(order.marketId);
        const depth = book.getDepth();
        await queue.publish("orderExecuted", depth);
    });
    mediator.register("orderFilled", async (order: Order) => {
        // await httpClient.post("http://localhost:3000/update_order", order);
        await queue.publish("orderFilled", order);
    })
    httpServer.listen(3001);
}

main();
