"use server";

import prisma from "@/lib/db/prisma";
import { getSession } from "@/utils/auth/authJWTOptions";

export const deleteAccountUser = async (id: number) => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        error: true,
        message: "No hay sesión activa",
      };
    }

    // Verificar que el usuario solo puede eliminar su propia cuenta
    if (session.user.id !== id) {
      return {
        success: false,
        error: true,
        message: "No tienes permisos para eliminar esta cuenta",
      };
    }

    // Verificar que el usuario existe antes de eliminarlo
    const userExists = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!userExists) {
      return {
        success: false,
        error: true,
        message: "El usuario no existe",
      };
    }

    const res = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    if (!res) {
      return {
        success: false,
        error: true,
        message: "Error al eliminar la cuenta del usuario",
      };
    }

    return {
      success: true,
      error: false,
      message: "Cuenta del usuario eliminada correctamente",
    };
  } catch (error) {
    console.error(`Error al eliminar la cuenta del usuario: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al eliminar la cuenta del usuario: ${error}`,
    };
  }
};
