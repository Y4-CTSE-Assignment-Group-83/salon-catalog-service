import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import serviceRoutes from "./routes/serviceRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { swaggerDocs } from "./docs/swagger.js";
import path from "path";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Service Catalog API is running",
  });
});

// Swagger docs
swaggerDocs(app);

// routes
app.use("/api/services", serviceRoutes);

// Global error handler
app.use(errorHandler);

export default app;
