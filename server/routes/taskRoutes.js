import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { getTasksValidator, createTaskValidator, updateTaskValidator } from "../validators/taskValidators.js";
import { idParamValidator } from "../validators/commonValidators.js";
import validate from "../middleware/validate.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getTasksValidator, validate, getTasks);
router.post("/", createTaskValidator, validate, createTask);
router.put("/:id", idParamValidator, updateTaskValidator, validate, updateTask);
router.delete("/:id", idParamValidator, validate, deleteTask);

export default router;
