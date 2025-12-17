import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const resourceAlreadyExistsError = (error: unknown) =>
  error instanceof PrismaClientKnownRequestError && error.code === "P2002";

export const resourceNotExistsError = (error: unknown) =>
  error instanceof PrismaClientKnownRequestError && error.code === "P2025";
