import pool from "../models/db.js";

async function getAllTasks(req, res) {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC;');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function createTask(req, res) {
    try {
        const { title, description } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *;',
            [title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export { getAllTasks, createTask };