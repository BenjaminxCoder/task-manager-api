import pool from "../models/db.js";

async function getAllTasks(req, res) {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export { getAllTasks };