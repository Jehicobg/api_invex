import {
  ProductBaseDTO,
  ProductBaseDTOSchema,
  ProductWithVariantsDTO,
  ProductWithVariantsDTOSchema,
} from "@/dtos/productDTO";
import type { Product } from "@/generated/prisma/client";
import { Prisma } from "@/generated/prisma/client";

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: {
    variants: {
      include: {
        attributes: true;
      };
    };
  };
}>;

export const toProductWithVariantsDTO = (
  product: ProductWithVariants
): ProductWithVariantsDTO =>
  ProductWithVariantsDTOSchema.parse({
    id: product.id,
    name: product.name,
    description: product.description,
    categoryId: product.categoryId,
    active: product.active,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      price: variant.price,
      attributes: variant.attributes.reduce(
        (acc: Record<string, string>, attr) => {
          acc[attr.attributeName] = attr.attributeValue;
          return acc;
        },
        {}
      ),
    })),
  });

export const toProductBaseDTO = (product: Product): ProductBaseDTO =>
  ProductBaseDTOSchema.parse({
    id: product.id,
    name: product.name,
    description: product.description,
    categoryId: product.categoryId,
    active: product.active,
  });

export const toProductDTOList = (products: Product[]): ProductBaseDTO[] =>
  products.map(toProductBaseDTO);
