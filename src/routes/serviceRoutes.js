import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import { createServiceValidation } from "../utils/serviceValidation.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/", createServiceValidation, validateRequest, createService);

router.get("/", getAllServices);

router.get("/:id", getServiceById);

router.put("/:id", updateService);

router.delete("/:id", deleteService);

export default router;
