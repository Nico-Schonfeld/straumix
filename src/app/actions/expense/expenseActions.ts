"use server";

import prisma from "@/lib/db/prisma";
import { getSession } from "@/utils/auth/authJWTOptions";
import {
  ExpenseConfig,
  Income,
  Budget,
  Expense,
  MonthlyData,
  ExpenseData,
} from "@/types/expense/expense";
import {
  calculateBudget,
  calculateTotals,
  calculateRemaining,
  getCurrentMonthKey,
  createMonthlyData,
} from "@/utils/expense-utils";

// Crear configuración inicial de gastos
export const createExpenseConfig = async (config: ExpenseConfig) => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        error: true,
        message: "No hay sesión activa",
      };
    }

    const expenseConfig = await prisma.expenseConfig.create({
      data: {
        userId: session.user.id,
        needsPercentage: config.needsPercentage,
        wantsPercentage: config.wantsPercentage,
        savingsPercentage: config.savingsPercentage,
      },
    });

    return {
      success: true,
      error: false,
      message: "Configuración creada correctamente",
      data: expenseConfig,
    };
  } catch (error) {
    console.error(`Error al crear configuración: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al crear configuración: ${error}`,
    };
  }
};

// Crear presupuesto mensual
export const createMonthlyBudget = async (
  income: Income,
  config: ExpenseConfig,
  accumulatedSavings: number = 0
) => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        error: true,
        message: "No hay sesión activa",
      };
    }

    const currentMonthKey = getCurrentMonthKey();
    const [year, month] = currentMonthKey.split("-");
    const budget = calculateBudget(income.net, config);

    // Verificar si ya existe un presupuesto para este mes
    const existingBudget = await prisma.monthlyBudget.findFirst({
      where: {
        userId: session.user.id,
        month: currentMonthKey,
      },
    });

    if (existingBudget) {
      return {
        success: false,
        error: true,
        message: "Ya existe un presupuesto para este mes",
      };
    }

    const monthlyBudget = await prisma.monthlyBudget.create({
      data: {
        userId: session.user.id,
        month: currentMonthKey,
        year: parseInt(year),
        income: income.net,
        needsBudget: budget.needs,
        wantsBudget: budget.wants,
        savingsBudget: budget.savings,
        accumulatedSavings: accumulatedSavings,
      },
    });

    return {
      success: true,
      error: false,
      message: "Presupuesto mensual creado correctamente",
      data: monthlyBudget,
    };
  } catch (error) {
    console.error(`Error al crear presupuesto mensual: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al crear presupuesto mensual: ${error}`,
    };
  }
};

// Obtener datos completos del usuario
export const getUserExpenseData = async () => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        error: true,
        message: "No hay sesión activa",
      };
    }

    const currentMonthKey = getCurrentMonthKey();

    // Obtener configuración más reciente
    const expenseConfig = await prisma.expenseConfig.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    // Obtener presupuesto del mes actual
    const monthlyBudget = await prisma.monthlyBudget.findFirst({
      where: {
        userId: session.user.id,
        month: currentMonthKey,
      },
    });

    // Obtener gastos del mes actual
    const expenses = await prisma.expense.findMany({
      where: {
        userId: session.user.id,
        monthlyBudgetId: monthlyBudget?.id,
      },
      orderBy: { date: "desc" },
    });

    // Obtener historial mensual
    const monthlyBudgets = await prisma.monthlyBudget.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        expenses: true,
        monthlyData: true,
      },
    });

    if (!expenseConfig || !monthlyBudget) {
      return {
        success: false,
        error: true,
        message: "No hay configuración de gastos",
        data: null,
      };
    }

    // Convertir datos a formato esperado
    const config: ExpenseConfig = {
      needsPercentage: expenseConfig.needsPercentage,
      wantsPercentage: expenseConfig.wantsPercentage,
      savingsPercentage: expenseConfig.savingsPercentage,
    };

    const income: Income = {
      net: monthlyBudget.income,
    };

    const budget: Budget = {
      needs: monthlyBudget.needsBudget,
      wants: monthlyBudget.wantsBudget,
      savings: monthlyBudget.savingsBudget,
    };

    const expensesFormatted: Expense[] = expenses.map((expense) => ({
      id: expense.id.toString(),
      category: expense.category as "needs" | "wants" | "savings",
      subcategory: expense.subcategory,
      description: expense.description || "",
      amount: expense.amount,
      date: expense.date.toISOString().split("T")[0],
    }));

    const monthlyHistory: MonthlyData[] = monthlyBudgets.map((budget) => {
      const totals = calculateTotals(
        budget.expenses.map((exp) => ({
          id: exp.id.toString(),
          category: exp.category as "needs" | "wants" | "savings",
          subcategory: exp.subcategory,
          description: exp.description || "",
          amount: exp.amount,
          date: exp.date.toISOString().split("T")[0],
        }))
      );

      const remaining = calculateRemaining(
        {
          needs: budget.needsBudget,
          wants: budget.wantsBudget,
          savings: budget.savingsBudget,
        },
        totals,
        budget.accumulatedSavings
      );

      return {
        month: budget.month,
        year: budget.year,
        monthName: budget.monthlyData[0]?.monthName || `${budget.month}`,
        income: budget.income,
        expenses: budget.expenses.map((exp) => ({
          id: exp.id.toString(),
          category: exp.category as "needs" | "wants" | "savings",
          subcategory: exp.subcategory,
          description: exp.description || "",
          amount: exp.amount,
          date: exp.date.toISOString().split("T")[0],
        })),
        budget: {
          needs: budget.needsBudget,
          wants: budget.wantsBudget,
          savings: budget.savingsBudget,
        },
        config: {
          needsPercentage: expenseConfig.needsPercentage,
          wantsPercentage: expenseConfig.wantsPercentage,
          savingsPercentage: expenseConfig.savingsPercentage,
        },
        accumulatedSavings: budget.accumulatedSavings,
        totals,
        remaining,
        totalSpent: totals.needs + totals.wants + totals.savings,
        totalRemaining: remaining.needs + remaining.wants + remaining.savings,
      };
    });

    const expenseData: ExpenseData = {
      config,
      income,
      budget,
      expenses: expensesFormatted,
      accumulatedSavings: monthlyBudget.accumulatedSavings,
      lastUpdated: new Date().toISOString(),
      monthlyHistory,
    };

    return {
      success: true,
      error: false,
      message: "Datos obtenidos correctamente",
      data: expenseData,
    };
  } catch (error) {
    console.error(`Error al obtener datos de gastos: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al obtener datos de gastos: ${error}`,
    };
  }
};

// Agregar nuevo gasto
export const addExpense = async (expense: Omit<Expense, "id">) => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        error: true,
        message: "No hay sesión activa",
      };
    }

    const currentMonthKey = getCurrentMonthKey();
    const monthlyBudget = await prisma.monthlyBudget.findFirst({
      where: {
        userId: session.user.id,
        month: currentMonthKey,
      },
    });

    if (!monthlyBudget) {
      return {
        success: false,
        error: true,
        message: "No hay presupuesto para este mes",
      };
    }

    const newExpense = await prisma.expense.create({
      data: {
        userId: session.user.id,
        monthlyBudgetId: monthlyBudget.id,
        category: expense.category,
        subcategory: expense.subcategory,
        description: expense.description,
        amount: expense.amount,
        date: new Date(expense.date),
      },
    });

    // Actualizar datos mensuales
    await updateMonthlyData(monthlyBudget.id);

    return {
      success: true,
      error: false,
      message: "Gasto agregado correctamente",
      data: {
        id: newExpense.id.toString(),
        category: newExpense.category as "needs" | "wants" | "savings",
        subcategory: newExpense.subcategory,
        description: newExpense.description || "",
        amount: newExpense.amount,
        date: newExpense.date.toISOString().split("T")[0],
      },
    };
  } catch (error) {
    console.error(`Error al agregar gasto: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al agregar gasto: ${error}`,
    };
  }
};

// Eliminar gasto
export const deleteExpense = async (expenseId: string) => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        error: true,
        message: "No hay sesión activa",
      };
    }

    const expense = await prisma.expense.findFirst({
      where: {
        id: parseInt(expenseId),
        userId: session.user.id,
      },
    });

    if (!expense) {
      return {
        success: false,
        error: true,
        message: "Gasto no encontrado",
      };
    }

    await prisma.expense.delete({
      where: { id: parseInt(expenseId) },
    });

    // Actualizar datos mensuales si hay monthlyBudgetId
    if (expense.monthlyBudgetId) {
      await updateMonthlyData(expense.monthlyBudgetId);
    }

    return {
      success: true,
      error: false,
      message: "Gasto eliminado correctamente",
    };
  } catch (error) {
    console.error(`Error al eliminar gasto: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al eliminar gasto: ${error}`,
    };
  }
};

// Actualizar datos mensuales
export const updateMonthlyData = async (monthlyBudgetId: number) => {
  try {
    const monthlyBudget = await prisma.monthlyBudget.findUnique({
      where: { id: monthlyBudgetId },
      include: { expenses: true },
    });

    if (!monthlyBudget) {
      return {
        success: false,
        error: true,
        message: "Presupuesto mensual no encontrado",
      };
    }

    const expenses = monthlyBudget.expenses.map((exp) => ({
      id: exp.id.toString(),
      category: exp.category as "needs" | "wants" | "savings",
      subcategory: exp.subcategory,
      description: exp.description || "",
      amount: exp.amount,
      date: exp.date.toISOString().split("T")[0],
    }));

    const totals = calculateTotals(expenses);
    const remaining = calculateRemaining(
      {
        needs: monthlyBudget.needsBudget,
        wants: monthlyBudget.wantsBudget,
        savings: monthlyBudget.savingsBudget,
      },
      totals,
      monthlyBudget.accumulatedSavings
    );

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const [year, month] = monthlyBudget.month.split("-");
    const monthName = `${monthNames[parseInt(month) - 1]} ${year}`;

    // Crear o actualizar datos mensuales
    await prisma.monthlyData.upsert({
      where: {
        userId_monthlyBudgetId: {
          userId: monthlyBudget.userId,
          monthlyBudgetId: monthlyBudget.id,
        },
      },
      update: {
        needsTotal: totals.needs,
        wantsTotal: totals.wants,
        savingsTotal: totals.savings,
        needsRemaining: remaining.needs,
        wantsRemaining: remaining.wants,
        savingsRemaining: remaining.savings,
        totalSpent: totals.needs + totals.wants + totals.savings,
        totalRemaining: remaining.needs + remaining.wants + remaining.savings,
      },
      create: {
        userId: monthlyBudget.userId,
        monthlyBudgetId: monthlyBudget.id,
        month: monthlyBudget.month,
        year: monthlyBudget.year,
        monthName,
        income: monthlyBudget.income,
        needsTotal: totals.needs,
        wantsTotal: totals.wants,
        savingsTotal: totals.savings,
        needsRemaining: remaining.needs,
        wantsRemaining: remaining.wants,
        savingsRemaining: remaining.savings,
        totalSpent: totals.needs + totals.wants + totals.savings,
        totalRemaining: remaining.needs + remaining.wants + remaining.savings,
      },
    });

    return {
      success: true,
      error: false,
      message: "Datos mensuales actualizados correctamente",
    };
  } catch (error) {
    console.error(`Error al actualizar datos mensuales: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al actualizar datos mensuales: ${error}`,
    };
  }
};

// Reiniciar configuración
export const resetExpenseData = async () => {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        error: true,
        message: "No hay sesión activa",
      };
    }

    // Eliminar todos los datos relacionados con gastos del usuario
    await prisma.expense.deleteMany({
      where: { userId: session.user.id },
    });

    await prisma.monthlyData.deleteMany({
      where: { userId: session.user.id },
    });

    await prisma.monthlyBudget.deleteMany({
      where: { userId: session.user.id },
    });

    await prisma.expenseConfig.deleteMany({
      where: { userId: session.user.id },
    });

    return {
      success: true,
      error: false,
      message: "Datos reiniciados correctamente",
    };
  } catch (error) {
    console.error(`Error al reiniciar datos: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al reiniciar datos: ${error}`,
    };
  }
};
