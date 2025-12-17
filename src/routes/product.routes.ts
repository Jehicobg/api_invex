import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/controllers/product.controller";
import { Router } from "express";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
