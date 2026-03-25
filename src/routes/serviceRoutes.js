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
import upload from "../middleware/uploadMiddleware.js";
import { requireAdmin, verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Salon service management
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of all services
 */
router.get("/", verifyToken, getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Service ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service found
 *       404:
 *         description: Service not found
 */
router.get("/:id", verifyToken, getServiceById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               duration:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Service created
 */
router.post(
  "/",
  verifyToken,
  requireAdmin,
  upload.single("image"),
  createServiceValidation,
  validateRequest,
  createService,
);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service updated
 */
router.put(
  "/:id",
  verifyToken,
  requireAdmin,
  upload.single("image"),
  updateService,
);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted
 */
router.delete("/:id", verifyToken, requireAdmin, deleteService);

export default router;
