"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Calendar,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardDesktopProps {
  data: ExpenseData;
  onDataChange: (data: ExpenseData) => void;
  onReset: () => void;
  user: UserIDType;
}

export function DashboardDesktop({
  data,
  onDataChange,
  onReset,
  user,
}: DashboardDesktopProps) {
  const router = useRouter();
  const [selectedMonthData, setSelectedMonthData] =
    useState<MonthlyData | null>(null);

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
        return "text-blue-600 bg-blue-50";
      case "wants":
        return "text-purple-600 bg-purple-50";
      case "savings":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
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
        return "Ahorro/Inversión";
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              💰 Dashboard Financiero
            </h1>
            <p className="text-gray-600 mt-1">
              Bienvenido, {user.success ? user.user.name : "Usuario"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/webapp/expenses")}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Agregar Gasto
            </Button>
            <Button
              variant="outline"
              onClick={onReset}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reiniciar
            </Button>
          </div>
        </div>

        {/* Resumen Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Ingreso Neto */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Ingreso Neto
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(data.income.net, userCurrency)}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Gastado */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Gastado
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(
                      totals.needs + totals.wants + totals.savings,
                      userCurrency
                    )}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disponible */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Disponible
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      remaining.needs + remaining.wants + remaining.savings,
                      userCurrency
                    )}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Gastos */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Gastos
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {data.expenses.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribución por Categorías */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle
                  className={`text-lg flex items-center gap-2 ${getCategoryColor(category).split(" ")[0]}`}
                >
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  {getCategoryName(category)}
                </CardTitle>
                <CardDescription>
                  {getCategoryPercentage(category)}% del ingreso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Presupuesto</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        getCategoryBudget(category),
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gastado</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(getCategorySpent(category), userCurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Disponible</span>
                    <span
                      className={`font-semibold ${
                        getCategoryRemaining(category) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(
                        getCategoryRemaining(category),
                        userCurrency
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={getProgressPercentage(category)}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>{getProgressPercentage(category).toFixed(0)}%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lista de Gastos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Lista de Gastos
                </CardTitle>
                <CardDescription>
                  Total de gastos: {data.expenses.length} | Total gastado:{" "}
                  {formatCurrency(
                    totals.needs + totals.wants + totals.savings,
                    userCurrency
                  )}
                </CardDescription>
              </div>
              <Button
                onClick={() => router.push("/webapp/expenses")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Agregar Gasto
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.expenses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold mb-2">
                  No hay gastos registrados
                </h3>
                <p className="mb-4">¡Agrega tu primer gasto para comenzar!</p>
                <Button
                  onClick={() => router.push("/webapp/expenses")}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Agregar Primer Gasto
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Subcategoría</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">
                        {expense.date}
                      </TableCell>
                      <TableCell>
                        {expense.description || (
                          <span className="text-gray-400 italic">
                            Sin descripción
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(expense.category)}>
                          {getCategoryIcon(expense.category)}{" "}
                          {getCategoryName(expense.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.subcategory}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(expense.amount, userCurrency)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Navegación Rápida */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Acceso Rápido</CardTitle>
            <CardDescription>
              Navega rápidamente a las diferentes secciones de tu aplicación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/webapp/expenses")}
                className="h-20 flex flex-col items-center justify-center gap-2"
              >
                <Plus className="h-6 w-6" />
                <span>Agregar Gastos</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/webapp/charts")}
                className="h-20 flex flex-col items-center justify-center gap-2"
              >
                <PieChart className="h-6 w-6" />
                <span>Gráficos</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/webapp/history")}
                className="h-20 flex flex-col items-center justify-center gap-2"
              >
                <Calendar className="h-6 w-6" />
                <span>Historial</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/webapp/profile")}
                className="h-20 flex flex-col items-center justify-center gap-2"
              >
                <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                <span>Perfil</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
