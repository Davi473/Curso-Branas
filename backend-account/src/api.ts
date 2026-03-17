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
import Book from "./domain/Book";
import { OrderHandlerBook, OrderHandlerExecuteHttp, OrderHandlerExecuteOrder, OrderHandlerExecuteQueue } from "./infra/handler/OrderHandler";
import { AxiosAdapter } from "./infra/http/HttpClient";
import { RabbitMQAdapter } from "./infra/queue/Queue";

// Entrypoint
async function main() {
    const httpServer = new ExpressAdapter();
    const queue = new RabbitMQAdapter();
    await queue.connect();
    Registry.getInstance().provide("queue", queue);
    Registry.getInstance().provide("mediator", new MediatorMemory());
    Registry.getInstance().provide("httpClient", new AxiosAdapter());
    Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
    Registry.getInstance().provide("accountDAO", new AccountDAODatabase());
    Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
    Registry.getInstance().provide("orderRepository", new OrderRepositoryDatabase());
    Registry.getInstance().provide("getAccount", new GetAccount());
    Registry.getInstance().provide("placeOrder", new PlaceOrder());
    Registry.getInstance().provide("getOrder", new GetOrder());
    Registry.getInstance().provide("getDepth", new GetDepth());
    Registry.getInstance().provide("signup", new Signup());
    Registry.getInstance().provide("httpServer", httpServer);
    Registry.getInstance().provide("executeOrder", new ExecuteOrder());
    Registry.getInstance().provide("book", new Book("BTC-USD"));
    // const handle = new OrderHandlerBook();
    // const handle = new OrderHandlerExecuteOrder();
    // const handle = new OrderHandlerExecuteHttp();
    const handle = new OrderHandlerExecuteQueue();
    handle.handle();
    new AccountController();
    new OrderController();
    httpServer.listen(3000);
}

main();
