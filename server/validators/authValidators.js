import { body } from "express-validator";

const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name must be under 100 characters"),
  body("email").trim().isEmail().withMessage("Valid email is required").isLength({ max: 255 }).withMessage("Email must be under 255 characters").normalizeEmail(),
  body("password")
    .isLength({ min: 6, max: 72 })
    .withMessage("Password must be between 6 and 72 characters"),
];

const loginValidator = [
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export { registerValidator, loginValidator };
