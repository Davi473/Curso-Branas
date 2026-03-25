import DatabaseConnection from "../database/DatabaseConnection";
import { inject } from "../di/Registry";
import HttpServer from "../http/HttpServer";

export default class TradeController {
    @inject("httpServer")
    httpServer!: HttpServer;
    @inject("databaseConnection")
    connection!: DatabaseConnection;

    constructor () {
        this.httpServer.route("get", "/market/:marketId/depth", async (params: any, body: any) => {
            const marketId = params.marketId;
            const data = await this.connection.query("select * from ccca.depth where market_id = $1", marketId);
            return data;
        })
    }
}