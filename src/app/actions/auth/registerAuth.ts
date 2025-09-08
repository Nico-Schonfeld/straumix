"use server";

import prisma from "@/lib/db/prisma";
import { UserDataRegisterType } from "@/types/auth/auht";
import { loginJWT } from "@/utils/auth/authJWTOptions";
import bcrypt from "bcrypt";

export const registerAuth = async (user: UserDataRegisterType) => {
  try {
    // Verificar si el email ya existe
    const userExistsByEmail = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExistsByEmail) {
      return {
        success: false,
        error: true,
        message: "El correo electrónico ya está en uso",
      };
    }

    // Verificar si el username ya existe
    const userExistsByUsername = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    if (userExistsByUsername) {
      return {
        success: false,
        error: true,
        message: "El nombre de usuario ya está en uso",
      };
    }

    const userPrisma = await prisma.user.create({
      data: {
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        isActive: true,
      },
    });

    if (!userPrisma) {
      return {
        success: false,
        error: true,
        message: "Error al registrar un ususario",
      };
    }

    // Crear sesión JWT después del registro exitoso
    const userForJWT = {
      name: userPrisma.name,
      lastName: userPrisma.lastName,
      username: userPrisma.username,
      email: userPrisma.email,
      isActive: userPrisma.isActive,
      createdAt: userPrisma.createdAt,
      updatedAt: userPrisma.updatedAt,
    };
    await loginJWT(userForJWT);

    return {
      success: true,
      error: false,
      message: "Usuario registrado correctamente",
      user: userPrisma,
    };
  } catch (error) {
    console.error(`Error al registrar un ususario: ${error}`);

    return {
      success: false,
      error: true,
      message: `Error al registrar un ususario: ${error}`,
    };
  }
};
