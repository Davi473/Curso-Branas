import sinon from "sinon";
import { AccountDAODatabase, AccountDAOMemory } from "../src/AccountDAO";
import AccountService from "../src/AccountService";

let accountService: AccountService;

beforeEach(() => {
    const accountDAO = new AccountDAODatabase();
    // const accountDAO = new AccountDAOMemory();
    accountService = new AccountService(accountDAO);
})

test("Deve criar uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT987"
    }
    const outputSignup = await accountService.signup(input);
    const outputGetAccount = await accountService.getAccount(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
});

test("Não deve criar uma conta se o nome for inválido", async () => {
    const input = {
        name: "John",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT987"
    }
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid name"));
});

test("Não deve criar uma conta se o e-mail for inválido", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail",
        document: "87748248800",
        password: "aseQRT987"
    }
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid email"));
});

test("Não deve criar uma conta se o document for inválido", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "8774824880",
        password: "aseQRT987"
    }
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid document"));
});

test("Não deve criar uma conta se o password for inválido", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT"
    }
    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid password"));
});

test("Deve criar uma conta com stub", async () => {
    const saveStub = sinon.stub(AccountDAODatabase.prototype, "save").resolves();
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT987"
    }
    const getByIdStub = sinon.stub(AccountDAODatabase.prototype, "getById").resolves(input);
    const outputSignup = await accountService.signup(input);
    const outputGetAccount = await accountService.getAccount(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
    saveStub.restore();
    getByIdStub.restore();
});

test("Deve criar uma conta com spy", async () => {
    const saveSpy = sinon.spy(AccountDAODatabase.prototype, "save");
    const getByIdSpy = sinon.spy(AccountDAODatabase.prototype, "getById");
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT987"
    }
    
    const outputSignup = await accountService.signup(input);
    const outputGetAccount = await accountService.getAccount(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
    expect(saveSpy.calledOnce).toBe(true);
    expect(getByIdSpy.calledWith(outputSignup.accountId)).toBe(true);
    expect(getByIdSpy.calledOnce).toBe(true);
    saveSpy.restore();
    getByIdSpy.restore();
});

test.only("Deve criar uma conta com mock", async () => {
    const saveSpy = sinon.spy(AccountDAODatabase.prototype, "save");
    const getByIdSpy = sinon.spy(AccountDAODatabase.prototype, "getById");
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT987"
    }
    
    const outputSignup = await accountService.signup(input);
    const outputGetAccount = await accountService.getAccount(outputSignup.accountId);
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
    expect(saveSpy.calledOnce).toBe(true);
    expect(getByIdSpy.calledWith(outputSignup.accountId)).toBe(true);
    expect(getByIdSpy.calledOnce).toBe(true);
    saveSpy.restore();
    getByIdSpy.restore();
});