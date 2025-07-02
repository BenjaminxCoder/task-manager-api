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
        const { title, completed } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *;',
            [title, completed ?? false]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateTask(req, res) {
    const { title, completed } = req.body;
    const { id } = req.params;
    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *;',
            [title, completed, id]
        );
        if(result.rowCount > 0){
             res.status(200).json(result.rows[0]);
        } else {
            const insertResult = await pool.query(
                'INSERT INTO tasks (id, title, completed) VALUES ($1, $2, $3) RETURNING *',
                [id, title, completed]
            )
            res.status(201).json(insertResult.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err});
    }
}
export { getAllTasks, createTask, updateTask };