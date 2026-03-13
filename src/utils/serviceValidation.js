import { body } from "express-validator";

export const createServiceValidation = [
  body("name")
    .notEmpty()
    .withMessage("Service name is required")
    .isLength({ min: 3 })
    .withMessage("Service name must be at least 3 characters"),

  body("category").notEmpty().withMessage("Category is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .isNumeric()
    .withMessage("Duration must be a number"),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description too long"),
];
