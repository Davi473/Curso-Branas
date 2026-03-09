import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { AccountDAODatabase } from "./infra/dao/AccountDAO";
import Registry from "./infra/di/Registry";
import { AccountAssetDAODatabase } from "./infra/dao/AccountAssetDAO";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";
import Signup from "./application/usecase/Signup";
import GetAccount from "./application/usecase/GetAccount";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";
import { MediatorMemory } from "./infra/mediator/Mediator";
import ExecuteOrder from "./application/usecase/ExecuteOrder";
import { OrderRepositoryDatabase } from "./infra/repository/OrderRepository";
import PlaceOrder from "./application/usecase/PlaceOrder";
import GetOrder from "./application/usecase/GetOrder";
import GetDepth from "./application/usecase/GetDepth";
import OrderController from "./infra/controller/OrderController";
import Order from "./domain/Order";
import Book from "./domain/Book";

// Entrypoint
async function main() {
    const httpServer = new ExpressAdapter();
    Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
    Registry.getInstance().provide("accountDAO", new AccountDAODatabase());
    Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
    const orderRepository = new OrderRepositoryDatabase()
    Registry.getInstance().provide("orderRepository", orderRepository);
    Registry.getInstance().provide("getAccount", new GetAccount());
    Registry.getInstance().provide("placeOrder", new PlaceOrder());
    Registry.getInstance().provide("getOrder", new GetOrder());
    Registry.getInstance().provide("getDepth", new GetDepth());
    Registry.getInstance().provide("signup", new Signup());
    Registry.getInstance().provide("httpServer", httpServer);
    const executeOrder = new ExecuteOrder();
    const mediator = new MediatorMemory();
    const book = new Book("BTC-USD");
    Registry.getInstance().provide("mediator", mediator);
    mediator.register("orderPlaced", async (order: Order) => {
        await book.insert(order);
        console.log(book.buys.length, book.sells.length);
    });
    mediator.register("orderFilled", async (order: Order) => {
        await orderRepository.update(order);
    });
    new AccountController();
    new OrderController();
    httpServer.listen(3000);
}

main();
