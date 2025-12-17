import { z } from "zod";

export const variantSchema = z.object({
  sku: z.string().min(1, "SKU required"),
  price: z.number().positive("Price should be more than 0"),
  attributes: z.record(z.string(), z.string()),
});

export const VariantUpdateSchema = z.object({
  id: z.number().optional(),
  sku: z.string().min(1),
  price: z.number().positive(),
  attributes: z.record(z.string(), z.string()),
});

export type variantDTO = z.infer<typeof variantSchema>;
export type variantUpdateDTO = z.infer<typeof VariantUpdateSchema>;
