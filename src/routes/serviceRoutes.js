import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

router.route("/").post(createService).get(getAllServices);
router
  .route("/:id")
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);

export default router;
