import { body } from "express-validator";

const createTaskValidator = [
  body("project").isMongoId().withMessage("Valid project is required"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().trim(),
  body("status").optional().isIn(["Todo", "In Progress", "Completed"]).withMessage("Invalid status"),
  body("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority"),
  body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
];

const updateTaskValidator = [
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("description").optional().trim(),
  body("status").optional().isIn(["Todo", "In Progress", "Completed"]).withMessage("Invalid status"),
  body("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority"),
  body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
];

export { createTaskValidator, updateTaskValidator };
