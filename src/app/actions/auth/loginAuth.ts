"use server";

import prisma from "@/lib/db/prisma";
import { UserDataLoginType } from "@/types/auth/auht";
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

    // Verificar si la cuenta está verificada
    if (!userExists.isVerified) {
      return {
        success: false,
        error: true,
        message:
          "Debes verificar tu cuenta antes de iniciar sesión. Revisa tu email.",
        requiresVerification: true,
      };
    }

    // Verificar si la cuenta está activa (no bloqueada)
    if (!userExists.isActive) {
      return {
        success: false,
        error: true,
        message:
          "Tu cuenta ha sido bloqueada por no verificar en el tiempo límite. Solicita un nuevo código de verificación.",
        accountBlocked: true,
      };
    }

    // Crear objeto para JWT sin el campo password
    const userForJWT = {
      id: userExists.id,
      name: userExists.name,
      lastName: userExists.lastName,
      username: userExists.username,
      email: userExists.email,
      preferredCurrency: userExists.preferredCurrency,
      isActive: userExists.isActive,
      createdAt: userExists.createdAt,
      updatedAt: userExists.updatedAt,
      avatar: userExists.avatar,
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
