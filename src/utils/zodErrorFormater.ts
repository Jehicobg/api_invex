import { ZodError } from "zod";

export const formatZodError = (error: ZodError) => {
  return error.issues.reduce<Record<string, string[]>>((acc, err) => {
    const field = err.path.join(".") || "root";

    if (!acc[field]) {
      acc[field] = [];
    }

    acc[field].push(err.message);
    return acc;
  }, {});
};
