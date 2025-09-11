export interface ExpenseConfig {
    needsPercentage: number;
    wantsPercentage: number;
    savingsPercentage: number;
}

export interface Income {
    net: number,
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
  