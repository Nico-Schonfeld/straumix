"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExpenseData, MonthlyData } from "@/types/expense/expense";
import { UserIDType } from "@/types/user/user";
import {
  calculateTotals,
  calculateRemaining,
  formatCurrency,
  createMonthlyData,
  getCurrentMonthKey,
} from "@/utils/expense-utils";
import { CurrencyCode } from "@/utils/currencies";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from "lucide-react";

interface DashboardMobileProps {
  data: ExpenseData;
  onDataChange: (data: ExpenseData) => void;
  onReset: () => void;
  user: UserIDType;
}

export function DashboardMobile({
  data,
  onDataChange,
  onReset,
  user,
}: DashboardMobileProps) {
  // Obtener la moneda preferida del usuario
  const getUserCurrency = (): CurrencyCode => {
    if (user.success && !user.error && user.user.preferredCurrency) {
      return user.user.preferredCurrency as CurrencyCode;
    }
    return "ARS"; // Fallback a ARS
  };

  const userCurrency = getUserCurrency();
  const totals = calculateTotals(data.expenses);
  const remaining = calculateRemaining(
    data.budget,
    totals,
    data.accumulatedSavings
  );

  // Crear datos del mes actual para gráficos
  const currentMonthData = createMonthlyData(data, getCurrentMonthKey());

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "needs":
        return "bg-blue-500";
      case "wants":
        return "bg-purple-500";
      case "savings":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "needs":
        return "🧾";
      case "wants":
        return "💸";
      case "savings":
        return "📈";
      default:
        return "💰";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "needs":
        return "Necesidades";
      case "wants":
        return "Deseos";
      case "savings":
        return "Ahorro";
      default:
        return "Otros";
    }
  };

  const getCategoryPercentage = (category: string) => {
    switch (category) {
      case "needs":
        return data.config.needsPercentage;
      case "wants":
        return data.config.wantsPercentage;
      case "savings":
        return data.config.savingsPercentage;
      default:
        return 0;
    }
  };

  const getCategoryBudget = (category: string) => {
    switch (category) {
      case "needs":
        return data.budget.needs;
      case "wants":
        return data.budget.wants;
      case "savings":
        return data.budget.savings;
      default:
        return 0;
    }
  };

  const getCategorySpent = (category: string) => {
    switch (category) {
      case "needs":
        return totals.needs;
      case "wants":
        return totals.wants;
      case "savings":
        return totals.savings;
      default:
        return 0;
    }
  };

  const getCategoryRemaining = (category: string) => {
    switch (category) {
      case "needs":
        return remaining.needs;
      case "wants":
        return remaining.wants;
      case "savings":
        return remaining.savings;
      default:
        return 0;
    }
  };

  const getProgressPercentage = (category: string) => {
    const budget = getCategoryBudget(category);
    const spent = getCategorySpent(category);
    return budget > 0 ? (spent / budget) * 100 : 0;
  };

  const categories = ["needs", "wants", "savings"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 pb-20">
      {/* Header con saludo */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ¡Hola {user.success ? user.user.name : "Usuario"}!
            </h1>
            <p className="text-sm text-gray-600">
              Bienvenido a tu dashboard financiero
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-xs"
          >
            🔄 Reiniciar
          </Button>
        </div>
      </div>

      {/* Balance Total */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm">Balance Total</p>
              <p className="text-3xl font-bold">
                {formatCurrency(
                  remaining.needs + remaining.wants + remaining.savings,
                  userCurrency
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Ingreso Neto</p>
              <p className="text-lg font-semibold">
                {formatCurrency(data.income.net, userCurrency)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-1">
              <ArrowDownLeft className="h-4 w-4" />
              <span>
                Gastado:{" "}
                {formatCurrency(
                  totals.needs + totals.wants + totals.savings,
                  userCurrency
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categorías de Presupuesto */}
      <div className="space-y-4 mb-6">
        {categories.map((category) => (
          <Card key={category} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${getCategoryColor(category)} flex items-center justify-center text-white text-lg`}
                  >
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {getCategoryName(category)}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {getCategoryPercentage(category)}% del ingreso
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(
                      getCategoryRemaining(category),
                      userCurrency
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Disponible</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>
                    Presupuesto:{" "}
                    {formatCurrency(getCategoryBudget(category), userCurrency)}
                  </span>
                  <span>
                    Gastado:{" "}
                    {formatCurrency(getCategorySpent(category), userCurrency)}
                  </span>
                </div>
                <Progress
                  value={getProgressPercentage(category)}
                  className="h-2"
                />
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">0%</span>
                  <span className="text-gray-500">
                    {getProgressPercentage(category).toFixed(0)}%
                  </span>
                  <span className="text-gray-500">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lista de Gastos Recientes */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Gastos Recientes
          </CardTitle>
          <CardDescription>
            Últimos {Math.min(data.expenses.length, 5)} gastos registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.expenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p>No hay gastos registrados aún</p>
              <p className="text-sm">¡Agrega tu primer gasto!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.expenses.slice(0, 5).map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${getCategoryColor(expense.category)} flex items-center justify-center text-white text-sm`}
                    >
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {expense.description || "Sin descripción"}
                      </p>
                      <p className="text-xs text-gray-500">{expense.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(expense.amount, userCurrency)}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {expense.subcategory}
                    </Badge>
                  </div>
                </div>
              ))}

              {data.expenses.length > 5 && (
                <div className="text-center pt-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    Ver todos los gastos ({data.expenses.length})
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumen Rápido */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">📊 Resumen del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(data.income.net, userCurrency)}
              </div>
              <div className="text-xs text-gray-600">Ingreso Neto</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-lg font-bold text-red-600">
                {formatCurrency(
                  totals.needs + totals.wants + totals.savings,
                  userCurrency
                )}
              </div>
              <div className="text-xs text-gray-600">Total Gastado</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                {data.expenses.length}
              </div>
              <div className="text-xs text-gray-600">Gastos</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                {formatCurrency(
                  remaining.needs + remaining.wants + remaining.savings,
                  userCurrency
                )}
              </div>
              <div className="text-xs text-gray-600">Disponible</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
