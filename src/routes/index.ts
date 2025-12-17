import { authenticateJWT } from "@/middlewares/auth.middleware";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", authenticateJWT, productRoutes);

export default router;
