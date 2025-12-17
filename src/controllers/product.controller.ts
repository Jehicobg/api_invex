import {
  CreateProductDTO,
  CreateProductDTOSchema,
  ProductBaseDTO,
  ProductWithVariantsDTO,
  UpdateProductDTO,
  UpdateProductDTOSchema,
} from "@/dtos/productDTO";
import {
  toProductDTOList,
  toProductWithVariantsDTO,
} from "@/mappers/product.mapper";
import {
  createNewProduct,
  deactivateProduct,
  getAllProducts,
  updateProductDB,
} from "@/services/product.service";
import { Request, Response } from "express";

export const getProducts = async (_: Request, res: Response) => {
  const products = await getAllProducts();
  res.success<ProductBaseDTO[]>({ data: toProductDTOList(products) });
};

export const createProduct = async (req: Request, res: Response) => {
  const productData: CreateProductDTO = CreateProductDTOSchema.parse(req.body);

  const newProduct = await createNewProduct(productData);

  res.success<ProductWithVariantsDTO>({
    data: toProductWithVariantsDTO(newProduct),
    status: 201,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const idParam = req.params.id;

  if (!idParam) return res.error({ status: 400, message: "Bad request" });

  const productData: UpdateProductDTO = UpdateProductDTOSchema.parse(req.body);
  const productId = Number(idParam);

  if (Number.isNaN(productId)) {
    return res.error({ status: 400, message: "Bad request" });
  }

  const productUpdated = await updateProductDB({
    productId,
    data: productData,
  });

  res.success<ProductWithVariantsDTO>({
    data: toProductWithVariantsDTO(productUpdated),
    status: 201,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = Number(req.params.id);

  if (Number.isNaN(productId)) {
    return res.error({ status: 400, message: "Invalid product id" });
  }

  await deactivateProduct({ productId });

  return res.status(204).send();
};
