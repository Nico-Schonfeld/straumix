export interface ExpenseConfig {
  needsPercentage: number;
  wantsPercentage: number;
  savingsPercentage: number;
}

export interface Income {
  net: number;
}

export interface Budget {
  needs: number;
  wants: number;
  savings: number;
}

export interface Expense {
  id: string;
  category: "needs" | "wants" | "savings";
  subcategory: string;
  description: string;
  amount: number;
  date: string;
}

// Tipos para la base de datos
export interface DatabaseExpense {
  id: number;
  userId: number;
  monthlyBudgetId?: number;
  category: string;
  subcategory: string;
  description?: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseExpenseConfig {
  id: number;
  userId: number;
  needsPercentage: number;
  wantsPercentage: number;
  savingsPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseMonthlyBudget {
  id: number;
  userId: number;
  month: string;
  year: number;
  income: number;
  needsBudget: number;
  wantsBudget: number;
  savingsBudget: number;
  accumulatedSavings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseMonthlyData {
  id: number;
  userId: number;
  monthlyBudgetId: number;
  month: string;
  year: number;
  monthName: string;
  income: number;
  needsTotal: number;
  wantsTotal: number;
  savingsTotal: number;
  needsRemaining: number;
  wantsRemaining: number;
  savingsRemaining: number;
  totalSpent: number;
  totalRemaining: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MonthlyData {
  month: string; // Formato: "YYYY-MM"
  year: number;
  monthName: string; // Ej: "Enero 2024"
  income: number;
  expenses: Expense[];
  budget: Budget;
  config: ExpenseConfig;
  accumulatedSavings: number;
  totals: {
    needs: number;
    wants: number;
    savings: number;
  };
  remaining: {
    needs: number;
    wants: number;
    savings: number;
  };
  totalSpent: number;
  totalRemaining: number;
}

export interface ExpenseData {
  config: ExpenseConfig;
  income: Income;
  budget: Budget;
  expenses: Expense[];
  accumulatedSavings: number; // Ahorro acumulado del mes anterior
  lastUpdated: string;
  monthlyHistory: MonthlyData[]; // Historial de meses anteriores
}
