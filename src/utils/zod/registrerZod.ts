import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    lastName: z.string().min(2, {
      message: "El apellido debe tener al menos 2 caracteres.",
    }),
    username: z
      .string()
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres.",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      }),
    email: z.string().email({
      message: "Dirección de correo electrónico inválida.",
    }),
    phone: z.string().min(10, {
      message: "El número de teléfono debe tener al menos 10 caracteres.",
    }),
    country: z.string().min(1, {
      message: "Debes seleccionar un país.",
    }),
    preferredCurrency: z.string().min(1, {
      message: "Debes seleccionar una moneda.",
    }),
    password: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
      message:
        "La confirmación de contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export type FormSchemaType = z.infer<typeof formSchema>;
