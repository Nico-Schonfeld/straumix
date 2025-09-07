"use server";

import prisma from "@/lib/db/prisma";
import { UserDataRegisterType } from "@/types/auth/auht";
import bcrypt from "bcrypt";

export const registerAuth = async (user: UserDataRegisterType) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      return {
        success: false,
        error: true,
        message: "El usuario ya existe",
      };
    }

    const userPrisma = await prisma.user.create({
      data: {
        name: user.name,
        lastName: user.lastName,
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
