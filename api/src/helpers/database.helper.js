import db from "../database/knex.js";
import path from "path";
import fs from "fs/promises";
import __srcpath from "./srcpath.helper.js";

const isDatabaseInitialized = async () => {
    const requiredTables = ["etaty", "zespoly", "pracownicy"];

    const existingTables = await db
        .raw(
            "SELECT table_name FROM information_schema.tables WHERE table_schema = ?",
            ["pracownicy"]
        )
        .then((results) => {
            return results[0].map((row) => row.TABLE_NAME);
        });

    for (const requiredTable of requiredTables) {
        if (!existingTables.includes(requiredTable)) return false;
    }

    return true;
};

const migrateDatabase = async () => {
    const sqlPath = path.join(__srcpath, "database", "pracownicy.sql");
    const sql = await fs.readFile(sqlPath, { encoding: "utf-8" });

    const splittedQueries = sql
        .replace("\t", "")
        .replace("\r", "")
        .replace("\n", "")
        .split(";")
        .map(splittedQuery => {
            return splittedQuery
                .replace(/$\s+/, "")
                .replace(/\s+^/, "")
        });

    for (const splittedQuery of splittedQueries) {
        await db.raw(splittedQuery);
    }

    return sql;
};

export { isDatabaseInitialized, migrateDatabase };
