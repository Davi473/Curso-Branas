import { AccountDAODatabase, AccountDAOMemory } from "../../src/infra/dao/AccountDAO";
import Registry from "../../src/infra/di/Registry";
import { AccountAssetDAODatabase } from "../../src/infra/dao/AccountAssetDAO";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import Signup from "../../src/application/usecase/Signup";
import GetAccount from "../../src/application/usecase/GetAccount";
import Deposit from "../../src/application/usecase/Deposit";
import Withdraw from "../../src/application/usecase/Withdraw";
import { AccountRepositoryDatabase } from "../../src/infra/repository/AccountRepository";

let connection: DatabaseConnection;
let signup: Signup;
let getAccount: GetAccount;
let deposit: Deposit;
let withdraw: Withdraw;

beforeEach(() => {
    connection = new PgPromiseAdapter()
    Registry.getInstance().provide("databaseConnection", connection);
    Registry.getInstance().provide("accountDAO",  new AccountDAODatabase());
    Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
    signup = new Signup();
    getAccount = new GetAccount();
    deposit = new Deposit();
    withdraw = new Withdraw();
});

test("Deve sacar de uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT987"
    }
    const outputSignup = await signup.execute(input);
    const inputDeposit = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 1000,
    };
    
    await deposit.execute(inputDeposit);
    const inputWithdraw = {
        accountId: outputSignup.accountId,
        assetId: "USD",
        quantity: 500
    }
    await withdraw.execute(inputWithdraw);
    const outputGetAccount = await getAccount.execute(outputSignup.accountId);
    expect(outputGetAccount.balances[0].assetId).toBe("USD");
    expect(outputGetAccount.balances[0].quantity).toBe(500);
});

afterEach(async () => {
    await connection.close();
})