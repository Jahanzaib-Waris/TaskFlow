import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { projectValidator } from "../validators/projectValidators.js";
import { idParamValidator } from "../validators/commonValidators.js";
import validate from "../middleware/validate.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.get("/", getProjects);
router.post("/", projectValidator, validate, createProject);
router.put("/:id", idParamValidator, projectValidator, validate, updateProject);
router.delete("/:id", idParamValidator, validate, deleteProject);

export default router;
