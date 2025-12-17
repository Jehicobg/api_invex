import { JWT_SECRET } from "@/config/constants";
import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.error({ status: 401, message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    if (!token) return res.error({ status: 401, message: "No token provided" });

    await jwtVerify(token, JWT_SECRET);

    next();
  } catch {
    return res.error({ status: 401, message: "Invalid token or expired" });
  }
};
