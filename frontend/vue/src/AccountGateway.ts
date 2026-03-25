import type HttpClient from "./HttpClient";

export default interface AccountGateway {
    save (input: any): Promise<any>;
}

export class AccountGatewayHttp implements AccountGateway {

    constructor (readonly httpClient: HttpClient) {
    }

    async save(input: any): Promise<any> {
        const url = "http://localhost:3000/signup";
        const output = await this.httpClient.post(url, input);
        return output;
    }

}

export class AccountGatewayMemory implements AccountGateway {

    async save(input: any): Promise<any> {
        if (input.name === "John") return { message: "Invalid name"};
        return { accountId: "123" };
    }

}