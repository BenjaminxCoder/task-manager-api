import express from "express";
import * as TaskController from "../controllers/taskController.js";

const router = express.Router();

router.get('/', TaskController.getAllTasks);

router.post('/', TaskController.createTask);

export default router;