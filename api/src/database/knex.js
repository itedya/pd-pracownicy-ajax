import knex from "knex";
import configuration from "../configuration.js";

const db = knex({
    client: "mysql2",
    connection: {
        host: configuration.database.host,
        port: configuration.database.port,
        user: configuration.database.user,
        password: configuration.database.password,
        database: configuration.database.name,
    },
});

export default db;