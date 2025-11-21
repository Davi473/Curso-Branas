import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { AccountDAODatabase } from "./infra/dao/AccountDAO";
import Registry from "./infra/di/Registry";
import { AccountAssetDAODatabase } from "./infra/dao/AccountAssetDAO";
import { ExpressAdapter } from "./infra/http/HttpServer";
import AccountController from "./infra/controller/AccountController";
import Signup from "./application/usecase/Signup";
import GetAccount from "./application/usecase/GetAccount";
import { AccountRepositoryDatabase } from "./infra/repository/AccountRepository";

// Entrypoint
async function main() {
    const httpServer = new ExpressAdapter();
    Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
    Registry.getInstance().provide("accountDAO", new AccountDAODatabase());
    Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
    Registry.getInstance().provide("getAccount", new GetAccount());
    Registry.getInstance().provide("signup", new Signup());
    Registry.getInstance().provide("httpServer", httpServer);
    new AccountController();
    httpServer.listen(3000);
}

main();
