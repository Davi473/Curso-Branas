import axios from "axios";

export default interface HttpClient {
    post (url: string, body: any): Promise< any>;
}

export class AxiosAdapter implements HttpClient {
    async post(url: string, body: any): Promise< any> {
        const response = await axios.post(url, body);
        return response.data;
    }
}

export class FetchAdapter implements HttpClient {
    async post(url: string, body: any): Promise< any> {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const output = await response.json();
        return output;
    }
}