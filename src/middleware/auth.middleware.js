// middleware/auth.middleware.js:
// JWT_SECRET = mysecretkey

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/* ===========================
   VERIFY TOKEN
=========================== */
export const verifyToken = (req, res, next) => {
  try {
    let token = null;

    // Cookie (main)
    if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    // Authorization header fallback
    if (!token) {
      const authHeader = req.headers.authorization || "";
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    //  NO DB CALL HERE
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

export const requireCustomer = (req, res, next) => {
  if (req.user.role !== "CUSTOMER") {
    return res.status(403).json({ message: "Customer only" });
  }
  next();
};

export const requireStaff = (req, res, next) => {
  if (req.user.role !== "STAFF") {
    return res.status(403).json({ message: "Staff only" });
  }
  next();
};
