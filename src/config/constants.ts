import "@/config/env";

export const DAYS_COOKIE = 7 * 24 * 60 * 60 * 1000;
export const REFRESH_TOKEN_ROUNDS = 10;
export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
