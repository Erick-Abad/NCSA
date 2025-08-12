import mysql from "mysql2/promise";

const ssl =
  process.env.DATABASE_SSL === "true"
    ? { ca: process.env.DATABASE_CA?.replace(/\\n/g, "\n") }
    : undefined;

let pool;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT || 3306),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      ssl
    });
  }
  return pool;
}

export default async function handler(req, res) {
  try {
    const p = getPool();
    const [rows] = await p.execute(
      "SELECT id, title, short_desc, created_at FROM courses ORDER BY id DESC"
    );
    res.status(200).json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "DB_ERROR", message: e.message });
  }
}
