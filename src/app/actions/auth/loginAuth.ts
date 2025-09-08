"use server";

import prisma from "@/lib/db/prisma";
import { UserDataLoginType } from "@/types/auth/auht";
import { UserJWTType } from "@/types/user/user";
import { loginJWT, logout } from "@/utils/auth/authJWTOptions";
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

    // Crear objeto para JWT sin el campo id
    const userForJWT = {
      name: userExists.name,
      lastName: userExists.lastName,
      username: userExists.username,
      email: userExists.email,
      isActive: userExists.isActive,
      createdAt: userExists.createdAt,
      updatedAt: userExists.updatedAt,
    };
    await loginJWT(userForJWT);

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

export const logoutAuth = async () => {
  await logout();
};
