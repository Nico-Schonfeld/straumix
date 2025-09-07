"use server";

import prisma from "@/lib/db/prisma";
import { UserDataLoginType } from "@/types/auth/auht";
import bcrypt from "bcrypt";

export const loginAuth = async (user: UserDataLoginType) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userExists) {
      return {
        success: false,
        error: true,
        message: "El usuario no existe",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userExists.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: true,
        message: "La contraseña es incorrecta",
      };
    }

    return {
      success: true,
      error: false,
      message: "Inicio de sesión exitoso",
    };
  } catch (error) {
    console.error(`Error al iniciar sesión: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al iniciar sesión: ${error}`,
    };
  }
};
