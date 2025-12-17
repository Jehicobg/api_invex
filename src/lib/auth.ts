import { JWT_SECRET } from "@/config/constants";
import "@/config/env";
import { SignJWT } from "jose";

export const createToken = ({
  username,
  type,
}: {
  username: string;
  type: "access" | "refresh";
}) => {
  const expiration =
    type === "access"
      ? process.env.ACCESS_EXPIRES || "15m"
      : process.env.REFRESH_EXPIRES || "7d";
  return new SignJWT({ username: username })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(expiration)
    .sign(JWT_SECRET);
};
