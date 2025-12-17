import { DAYS_COOKIE, JWT_SECRET } from "@/config/constants";
import { SignUpUserDTOSchema, UserCreatedDTO } from "@/dtos/userDTO";
import { createToken } from "@/lib/auth";
import { toUserCreatedDTO } from "@/mappers/user.mapper";
import {
  createUser,
  findUserByUsername,
  updateRefreshTokenUserByUsername,
} from "@/services/user.service";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { jwtVerify } from "jose";

export const singUp = async (req: Request, res: Response) => {
  const data = SignUpUserDTOSchema.parse(req.body);
  const newUser = await createUser(data);
  res.success<UserCreatedDTO>({ data: toUserCreatedDTO(newUser), status: 201 });
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username)
    return res.error({ status: 400, message: "Username is required" });

  const user = await findUserByUsername(req.body.username);
  if (!user) return res.error({ status: 401, message: "Invalid username" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.error({ status: 401, message: "Invalid credentials" });

  const accessToken = await createToken({ username, type: "access" });
  const refreshToken = await createToken({ username, type: "refresh" });

  await updateRefreshTokenUserByUsername({
    username,
    data: refreshToken,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: DAYS_COOKIE,
  });

  res.success({ data: `Bearer ${accessToken}` });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshTokenFromReq = req.cookies.refreshToken;

    if (!refreshTokenFromReq)
      return res.error({ status: 401, message: "Unauthorized" });

    const { payload } = await jwtVerify(refreshTokenFromReq, JWT_SECRET);
    const user = await findUserByUsername(payload.username as string);

    if (!user || !bcrypt.compare(user.refreshToken!, refreshTokenFromReq))
      return res.error({ status: 401, message: "Invalid refresh token" });

    const newAccessToken = await createToken({
      username: payload.username as string,
      type: "access",
    });

    res.success({ data: newAccessToken });
  } catch {
    return res.error({
      status: 401,
      message: "Expired or invalid refresh token",
    });
  }
};
