import { z } from "zod";

export const CategoryDTOSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

export type CategoryDTO = z.infer<typeof CategoryDTOSchema>;
