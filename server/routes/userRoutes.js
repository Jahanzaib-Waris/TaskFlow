import express from "express";
import { updateProfile, updatePassword } from "../controllers/userController.js";
import { updateProfileValidator, updatePasswordValidator } from "../validators/userValidators.js";
import validate from "../middleware/validate.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.put("/profile", updateProfileValidator, validate, updateProfile);
router.put("/password", updatePasswordValidator, validate, updatePassword);

export default router;
