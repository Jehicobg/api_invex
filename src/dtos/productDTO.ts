import { z } from "zod";
import { variantSchema, VariantUpdateSchema } from "./variantDTO";

export const ProductBaseDTOSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  categoryId: z.number(),
  active: z.boolean(),
});

export const ProductWithVariantsDTOSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  categoryId: z.number(),
  active: z.boolean(),
  variants: z.array(variantSchema),
});

export const CreateProductDTOSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  description: z.string().nullable().optional(),
  categoryId: z.number().default(1),
  variants: z.array(variantSchema),
});

export const UpdateProductDTOSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  variants: z.array(VariantUpdateSchema),
});

export type ProductWithVariantsDTO = z.infer<
  typeof ProductWithVariantsDTOSchema
>;
export type CreateProductDTO = z.infer<typeof CreateProductDTOSchema>;
export type ProductBaseDTO = z.infer<typeof ProductBaseDTOSchema>;
export type UpdateProductDTO = z.infer<typeof UpdateProductDTOSchema>;
