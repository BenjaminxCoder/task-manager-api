import express from "express";
import pool from "./models/db.js";

const app = express();
const port = 3000;


pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("DB error:", err);
  } else {
    console.log("Connected to DB. Time:", result.rows[0].now);
  }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.listen(port, () => {
    console.log(`Health check endpoint available at http://localhost:${port}/health`);
});