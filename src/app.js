import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import serviceRoutes from "./routes/serviceRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { swaggerDocs } from "./docs/swagger.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(
  cors({
    origin: ["http://ctse-alb-320060941.eu-north-1.elb.amazonaws.com"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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
