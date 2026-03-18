import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import { sleep } from "../../src/infra/utils/sleep";

async function main() {
    const connection = new PgPromiseAdapter();
    while (true) {
        const query = `SELECT FLOOR(EXTRACT(EPOCH FROM "timestamp"))::BIGINT AS time, COUNT(*) AS count FROM ccca.order GROUP BY time ORDER BY time desc limit 10`;
        const output = await connection.query(query, []);
        console.log(output);
        sleep(100);
    }
}

main();
