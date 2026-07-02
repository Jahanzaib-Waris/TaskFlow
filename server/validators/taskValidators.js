import { body, query } from "express-validator";

const getTasksValidator = [
  query("project").optional().isMongoId().withMessage("Invalid project id"),
  query("status").optional().isIn(["Todo", "In Progress", "Completed"]).withMessage("Invalid status"),
  query("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority"),
];

const createTaskValidator = [
  body("project").isMongoId().withMessage("Valid project is required"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be under 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must be under 1000 characters"),
  body("status").optional().isIn(["Todo", "In Progress", "Completed"]).withMessage("Invalid status"),
  body("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority"),
  body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
];

const updateTaskValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title must be under 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must be under 1000 characters"),
  body("status").optional().isIn(["Todo", "In Progress", "Completed"]).withMessage("Invalid status"),
  body("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority"),
  body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Invalid due date"),
];

export { getTasksValidator, createTaskValidator, updateTaskValidator };
