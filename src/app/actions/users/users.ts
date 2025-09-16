"use server";

import prisma from "@/lib/db/prisma";

export const getUserID = async ({ userId }: { userId: number }) => {
  try {
    const userMatch = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userMatch)
      return {
        error: true as const,
        success: false as const,
        message: "Usuario no encontrado",
      };

    return {
      error: false as const,
      success: true as const,
      message: "ID del usuario obtenido correctamente",
      user: { ...userMatch },
    };
  } catch (error) {
    console.error(`Error al obtener ID del usuario: ${error}`);
    return {
      error: true as const,
      success: false as const,
      message: `Error al obtener ID del usuario: ${error}`,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
        email: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!users)
      return {
        error: false,
        success: true,
        message: "No hay usuarios",
      };

    return {
      error: false,
      success: true,
      message: "Todos los usuarios obtenidos correctamente",
      users: users,
    };
  } catch (error) {
    console.error(`Error al obtener todos los usuarios: ${error}`);
    return {
      error: true,
      success: false,
      message: `Error al obtener todos los usuarios: ${error}`,
    };
  }
};
