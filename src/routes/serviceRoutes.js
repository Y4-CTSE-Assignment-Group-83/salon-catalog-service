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
 *     summary: Get all salon services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of services
 */
router.get("/", getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get service by ID
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
router.get("/:id", getServiceById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create new salon service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *     responses:
 *       201:
 *         description: Service created
 */
router.post("/", createServiceValidation, validateRequest, createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update service
 *     tags: [Services]
 */
router.put("/:id", updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete service
 *     tags: [Services]
 */
router.delete("/:id", deleteService);

export default router;
