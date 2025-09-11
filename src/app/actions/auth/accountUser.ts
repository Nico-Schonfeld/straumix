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
      include: {
        expenses: true,
        monthlyBudgets: true,
        monthlyData: true,
        expenseConfigs: true,
      },
    });

    if (!userExists) {
      return {
        success: false,
        error: true,
        message: "El usuario no existe",
      };
    }

    // Usar una transacción para eliminar todos los datos de manera atómica
    await prisma.$transaction(async (tx) => {
      // 1. Eliminar gastos individuales
      await tx.expense.deleteMany({
        where: { userId: id },
      });

      // 2. Eliminar datos mensuales calculados
      await tx.monthlyData.deleteMany({
        where: { userId: id },
      });

      // 3. Eliminar presupuestos mensuales
      await tx.monthlyBudget.deleteMany({
        where: { userId: id },
      });

      // 4. Eliminar configuraciones de gastos
      await tx.expenseConfig.deleteMany({
        where: { userId: id },
      });

      // 5. Finalmente eliminar el usuario (esto activará el cascade delete automático)
      await tx.user.delete({
        where: { id: id },
      });
    });

    return {
      success: true,
      error: false,
      message:
        "Cuenta y todos los datos asociados han sido eliminados permanentemente",
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
