import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  if (
    req.path === "/users/login" ||
    (req.path === "/users/register" && req.method === "POST")
  ) {
    next();
  } else {
    const token = req.header("token");
    if (!token) return res.status(401).json({ error: "Missing token" });
    try {
      // eslint-disable-next-line no-undef
      const verified = jwt.verify(token, process.env.TOKEN_SECRET || "secret");
      req.user = verified;
      next(); // continue to next middleware
    } catch (error) {
      res.status(400).json({ error: "Invalid token" });
    }
  }
};
