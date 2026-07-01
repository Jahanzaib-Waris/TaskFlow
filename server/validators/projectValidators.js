import { body } from "express-validator";

const projectValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().trim(),
];

export { projectValidator };
