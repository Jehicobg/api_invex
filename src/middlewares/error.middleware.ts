import { AppError } from "@/errors/AppError";
import { formatZodError } from "@/utils/zodErrorFormater";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.error({
      status: 400,
      message: formatZodError(err),
    });
  }

  if (err instanceof AppError) {
    return res.error({
      status: err.statusCode,
      message: err.message,
    });
  }

  console.error(err);

  return res.error({
    status: 500,
    message: "Internal server error",
  });
};
