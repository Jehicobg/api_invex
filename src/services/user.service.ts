import { REFRESH_TOKEN_ROUNDS } from "@/config/constants";
import { SignUpUserDTO } from "@/dtos/userDTO";
import { AppError } from "@/errors/AppError";
import { resourceAlreadyExistsError } from "@/utils/validateErrorsPrisma";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

export const createUser = async (data: SignUpUserDTO) => {
  try {
    const passwordHashed = await bcrypt.hash(data.password, REFRESH_TOKEN_ROUNDS);
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        password: passwordHashed,
        name: data.name,
        lastname: data.lastname,
        active: true,
      },
    });

    return newUser;
  } catch (error) {
    if (resourceAlreadyExistsError(error)) {
      throw new AppError("User already exists", 409);
    }

    throw error;
  }
};

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};

export const updateRefreshTokenUserByUsername = async ({
  username,
  data,
}: {
  username: string;
  data: string;
}) => {
  const hashedToken = await bcrypt.hash(data, REFRESH_TOKEN_ROUNDS);
  await prisma.user.update({
    where: { username },
    data: { refreshToken: hashedToken },
  });
};
