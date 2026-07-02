import { param } from "express-validator";

const idParamValidator = [param("id").isMongoId().withMessage("Invalid id")];

export { idParamValidator };
