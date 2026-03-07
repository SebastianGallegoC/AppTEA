import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
    .max(20, "El nombre de usuario no puede superar 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "El nombre de usuario solo puede contener letras, números y guiones bajos"
    ),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña no puede superar 100 caracteres"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
