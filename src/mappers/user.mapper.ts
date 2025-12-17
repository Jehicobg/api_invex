import { UserCreatedDTO, UserCreatedDTOSchema } from "@/dtos/userDTO";
import type { User } from "@/generated/prisma/client";

export const toUserCreatedDTO = (user: User): UserCreatedDTO =>
  UserCreatedDTOSchema.parse({
    username: user.username,
  });
