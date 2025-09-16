import {
  ExpenseData,
  ExpenseConfig,
  // Income,
  Budget,
  Expense,
  MonthlyData,
} from "@/types/expense/expense";

const STORAGE_KEY = "expense-tracker-data";

export const getRecommendedConfig = (netIncome: number): ExpenseConfig => {
  if (netIncome < 500000) {
    // Ingresos bajos - priorizar necesidades básicas
    return {
      needsPercentage: 70,
      wantsPercentage: 20,
      savingsPercentage: 10,
    };
  } else if (netIncome < 800000) {
    // Ingresos medios-bajos
    return {
      needsPercentage: 60,
      wantsPercentage: 30,
      savingsPercentage: 10,
    };
  } else if (netIncome < 1200000) {
    // Ingresos medios
    return {
      needsPercentage: 60,
      wantsPercentage: 20,
      savingsPercentage: 20,
    };
  } else {
    // Ingresos altos - método 50/30/20 clásico
    return defaultConfig;
  }
};

export const defaultConfig: ExpenseConfig = {
  needsPercentage: 50,
  wantsPercentage: 30,
  savingsPercentage: 20,
};

export const saveToLocalStorage = (data: ExpenseData): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const loadFromLocalStorage = (): ExpenseData | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return null;
};

export const calculateBudget = (
  netIncome: number,
  config: ExpenseConfig
): Budget => {
  return {
    needs: Math.round(netIncome * (config.needsPercentage / 100)),
    wants: Math.round(netIncome * (config.wantsPercentage / 100)),
    savings: Math.round(netIncome * (config.savingsPercentage / 100)),
  };
};

export const calculateTotals = (expenses: Expense[]) => {
  const totals = {
    needs: 0,
    wants: 0,
    savings: 0,
  };

  expenses.forEach((expense) => {
    totals[expense.category] += expense.amount;
  });

  return totals;
};

export const calculateRemaining = (
  budget: Budget,
  totals: ReturnType<typeof calculateTotals>,
  accumulatedSavings: number = 0
) => {
  return {
    needs: budget.needs - totals.needs,
    wants: budget.wants - totals.wants,
    savings: budget.savings - totals.savings + accumulatedSavings, // Sumar ahorro acumulado
  };
};

export const createMonthlyData = (
  data: ExpenseData,
  monthKey: string
): MonthlyData => {
  const totals = calculateTotals(data.expenses);
  const remaining = calculateRemaining(
    data.budget,
    totals,
    data.accumulatedSavings
  );

  const [year, month] = monthKey.split("-");
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

  return {
    month: monthKey,
    year: parseInt(year),
    monthName: `${monthNames[parseInt(month) - 1]} ${year}`,
    income: data.income.net,
    expenses: data.expenses,
    budget: data.budget,
    config: data.config,
    accumulatedSavings: data.accumulatedSavings,
    totals,
    remaining,
    totalSpent: totals.needs + totals.wants + totals.savings,
    totalRemaining: remaining.needs + remaining.wants + remaining.savings,
  };
};

export const getCurrentMonthKey = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const saveMonthlyData = (data: ExpenseData): ExpenseData => {
  const currentMonthKey = getCurrentMonthKey();

  // Crear datos del mes actual
  const monthlyData = createMonthlyData(data, currentMonthKey);

  // Actualizar el historial
  const updatedHistory = [...(data.monthlyHistory || [])];
  const existingIndex = updatedHistory.findIndex(
    (month) => month.month === currentMonthKey
  );

  if (existingIndex >= 0) {
    updatedHistory[existingIndex] = monthlyData;
  } else {
    updatedHistory.push(monthlyData);
  }

  // Ordenar por fecha (más reciente primero)
  updatedHistory.sort((a, b) => b.month.localeCompare(a.month));

  const updatedData = {
    ...data,
    monthlyHistory: updatedHistory,
  };

  saveToLocalStorage(updatedData);
  return updatedData;
};
