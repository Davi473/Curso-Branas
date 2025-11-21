import axios from "axios";

const url = "http://localhost:3000";

axios.defaults.validateStatus = () => true;

test.only("Deve criar uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT987"
    }
    const responseSignup = await axios.post(`${url}/signup`, input);
    const outputSignup = responseSignup.data;
    const responseGetAccount = await axios.get(`${url}/accounts/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;
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
    const responseSignup = await axios.post(`${url}/signup`, input);
    expect(responseSignup.status).toBe(422);
    const outputSignup = responseSignup.data;
    expect(outputSignup.message).toBe("Invalid name");
});