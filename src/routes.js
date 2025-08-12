import { Router } from "express";
import { query } from "./db.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

router.get("/courses", async (_req, res) => {
  try {
    const rows = await query("SELECT id, title, short_desc, created_at FROM courses ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB_ERROR" });
  }
});

router.post("/courses", async (req, res) => {
  try {
    const { title, short_desc } = req.body || {};
    if (!title) return res.status(400).json({ error: "TITLE_REQUIRED" });
    await query("INSERT INTO courses (title, short_desc) VALUES (?, ?)", [title, short_desc || null]);
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB_ERROR" });
  }
});

export default router;
