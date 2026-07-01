import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { createTaskValidator, updateTaskValidator } from "../validators/taskValidators.js";
import validate from "../middleware/validate.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.post("/", createTaskValidator, validate, createTask);
router.put("/:id", updateTaskValidator, validate, updateTask);
router.delete("/:id", deleteTask);

export default router;
