import mysql from "mysql2/promise";

const ssl =
  process.env.DATABASE_SSL === "true"
    ? { ca: process.env.DATABASE_CA?.replace(/\\n/g, "\n") }
    : undefined;

export const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ssl,
});

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
