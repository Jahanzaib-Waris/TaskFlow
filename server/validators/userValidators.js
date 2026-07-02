import { body } from "express-validator";

const updateProfileValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be under 100 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .isLength({ max: 255 })
    .withMessage("Email must be under 255 characters")
    .normalizeEmail(),
];

const updatePasswordValidator = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6, max: 72 })
    .withMessage("New password must be between 6 and 72 characters"),
];

export { updateProfileValidator, updatePasswordValidator };
