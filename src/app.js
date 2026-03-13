import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import serviceRoutes from "./routes/serviceRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Global error handler
app.use(errorHandler);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Service Catalog API is running",
  });
});

app.use("/api/services", serviceRoutes);

export default app;
