import axios from "axios";

const url = "http://localhost:3000";

test("Deve criar uma conta", async () => {
    // Given
    const input = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "87748248800",
        password: "aseQRT987"
    }
    // When 
    const responseSignup = await axios.post(`${url}/signup`, input);
    const outputSignup = responseSignup.data;
    // Then
    expect(outputSignup.accountId).toBeDefined();
    const responseGetAccount = await axios.get(`${url}/accounts/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
})