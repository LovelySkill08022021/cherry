import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "enrollguide",
});

export const db = drizzle({ client: poolConnection });
