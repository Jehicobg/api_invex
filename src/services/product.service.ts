import { CreateProductDTO, UpdateProductDTO } from "@/dtos/productDTO";
import { AppError } from "@/errors/AppError";
import { Product } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { resourceNotExistsError } from "@/utils/validateErrorsPrisma";

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany();

  return products;
};

export const createNewProduct = async (data: CreateProductDTO) => {
  const { variants, ...productData } = data;

  return prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description ?? null,
      categoryId: productData.categoryId,
      variants: {
        create: variants.map((variant) => ({
          sku: variant.sku,
          price: variant.price,
          attributes: {
            create: Object.entries(variant.attributes).map(
              ([attributeName, attributeValue]) => ({
                attributeName,
                attributeValue,
              })
            ),
          },
        })),
      },
    },
    include: {
      variants: {
        include: {
          attributes: true,
        },
      },
    },
  });
};

export const updateProductDB = async ({
  productId,
  data,
}: {
  productId: number;
  data: UpdateProductDTO;
}) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const productExists = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!productExists) {
        throw new AppError("Product not found", 404);
      }

      await tx.product.update({
        where: { id: productId },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.description !== undefined && {
            description: data.description,
          }),
        },
      });

      const incomingVariantIds = data.variants
        .filter((v) => v.id)
        .map((v) => v.id!);

      await tx.variant.deleteMany({
        where: {
          productId,
          ...(incomingVariantIds.length > 0 && {
            id: { notIn: incomingVariantIds },
          }),
        },
      });

      for (const variant of data.variants) {
        if (!variant.id) {
          await tx.variant.create({
            data: {
              productId,
              sku: variant.sku,
              price: variant.price,
              attributes: {
                create: Object.entries(variant.attributes).map(
                  ([attributeName, attributeValue]) => ({
                    attributeName,
                    attributeValue,
                  })
                ),
              },
            },
          });
        } else {
          await tx.variant.update({
            where: { id: variant.id },
            data: {
              sku: variant.sku,
              price: variant.price,
              attributes: {
                deleteMany: {},
                create: Object.entries(variant.attributes).map(
                  ([attributeName, attributeValue]) => ({
                    attributeName,
                    attributeValue,
                  })
                ),
              },
            },
          });
        }
      }

      return tx.product.findUniqueOrThrow({
        where: { id: productId },
        include: {
          variants: {
            include: { attributes: true },
          },
        },
      });
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw error;
  }
};

export const deactivateProduct = async ({
  productId,
}: {
  productId: number;
}) => {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: { active: false },
    });
  } catch (error) {
    if (resourceNotExistsError(error)) {
      throw new AppError("Product not found", 404);
    }

    throw error;
  }
};
