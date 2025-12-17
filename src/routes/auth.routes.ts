import { Router } from "express";
import { singUp, signIn, refreshToken } from "@/controllers/auth.controller";

const router = Router();

router.post("/signup", singUp);
router.post("/signin", signIn);
router.post("/refresh", refreshToken);

export default router;
