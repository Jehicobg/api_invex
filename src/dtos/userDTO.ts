import { z } from "zod";

export const UserDTOSchema = z.object({
  id: z.number(),
  username: z.string(),
  fullName: z.string(),
  active: z.boolean(),
});

export const SignUpUserDTOSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  name: z.string(),
  lastname: z.string(),
});

export const SignInUserDTOSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export const UserCreatedDTOSchema = z.object({
  username: z.string(),
});


export type UserDTO = z.infer<typeof UserDTOSchema>;
export type SignUpUserDTO = z.infer<typeof SignUpUserDTOSchema>;
export type SignInUserDTO = z.infer<typeof SignInUserDTOSchema>;
export type UserCreatedDTO = z.infer<typeof UserCreatedDTOSchema>;
