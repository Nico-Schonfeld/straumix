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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ExpenseData, MonthlyData } from "@/types/expense/expense";
import { UserIDType } from "@/types/user/user";
import { formatCurrency } from "@/utils/expense-utils";
import { CurrencyCode } from "@/utils/currencies";
import {
  ArrowLeft,
  Filter,
  Calendar,
  Eye,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface HistoryMobileProps {
  data: ExpenseData;
  onDataChange: (data: ExpenseData) => void;
  onReset: () => void;
  user: UserIDType;
}

export function HistoryMobile({
  data,
  onDataChange,
  onReset,
  user,
}: HistoryMobileProps) {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string>("all");
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

  // Obtener años únicos
  const years = [
    ...new Set(
      data.monthlyHistory?.map((month) => month.year.toString()) || []
    ),
  ].sort((a, b) => parseInt(b) - parseInt(a));

  // Filtrar por año seleccionado
  const filteredHistory =
    selectedYear === "all"
      ? data.monthlyHistory || []
      : data.monthlyHistory?.filter(
          (month) => month.year.toString() === selectedYear
        ) || [];

  const getMonthStatus = (monthData: MonthlyData) => {
    const totalBudget =
      monthData.budget.needs +
      monthData.budget.wants +
      monthData.budget.savings;
    const totalSpent = monthData.totalSpent;
    const percentage = (totalSpent / totalBudget) * 100;

    if (percentage <= 80)
      return {
        status: "Excelente",
        color: "bg-green-100 text-green-800",
        icon: "✅",
      };
    if (percentage <= 95)
      return {
        status: "Bueno",
        color: "bg-yellow-100 text-yellow-800",
        icon: "⚠️",
      };
    return { status: "Excedido", color: "bg-red-100 text-red-800", icon: "❌" };
  };

  const handleViewMonth = (monthData: MonthlyData) => {
    setSelectedMonthData(monthData);
  };

  const handleBackToList = () => {
    setSelectedMonthData(null);
  };

  if (selectedMonthData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToList}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-lg font-bold text-gray-900">
            {selectedMonthData.monthName}
          </h1>
          <div className="w-16"></div> {/* Spacer */}
        </div>

        {/* Resumen del Mes */}
        <Card className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-blue-100 text-sm mb-2">Resumen del Mes</p>
              <p className="text-3xl font-bold mb-4">
                {selectedMonthData.monthName}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-100">Ingreso</p>
                  <p className="font-semibold text-lg">
                    {formatCurrency(selectedMonthData.income, userCurrency)}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100">Gastado</p>
                  <p className="font-semibold text-lg">
                    {formatCurrency(selectedMonthData.totalSpent, userCurrency)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribución por Categorías */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Distribución por Categorías
          </h3>

          {/* Necesidades */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg">
                    🧾
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Necesidades</h4>
                    <p className="text-xs text-gray-500">
                      {selectedMonthData.config.needsPercentage}% del ingreso
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(
                      selectedMonthData.remaining.needs,
                      userCurrency
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Restante</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Presupuesto:</span>
                  <span>
                    {formatCurrency(
                      selectedMonthData.budget.needs,
                      userCurrency
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Gastado:</span>
                  <span className="text-red-600">
                    {formatCurrency(
                      selectedMonthData.totals.needs,
                      userCurrency
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deseos */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-lg">
                    💸
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Deseos</h4>
                    <p className="text-xs text-gray-500">
                      {selectedMonthData.config.wantsPercentage}% del ingreso
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(
                      selectedMonthData.remaining.wants,
                      userCurrency
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Restante</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Presupuesto:</span>
                  <span>
                    {formatCurrency(
                      selectedMonthData.budget.wants,
                      userCurrency
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Gastado:</span>
                  <span className="text-red-600">
                    {formatCurrency(
                      selectedMonthData.totals.wants,
                      userCurrency
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ahorro */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-lg">
                    📈
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Ahorro/Inversión
                    </h4>
                    <p className="text-xs text-gray-500">
                      {selectedMonthData.config.savingsPercentage}% del ingreso
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(
                      selectedMonthData.remaining.savings,
                      userCurrency
                    )}
                  </p>
                  <p className="text-xs text-gray-500">Restante</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Presupuesto:</span>
                  <span>
                    {formatCurrency(
                      selectedMonthData.budget.savings,
                      userCurrency
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Gastado:</span>
                  <span className="text-red-600">
                    {formatCurrency(
                      selectedMonthData.totals.savings,
                      userCurrency
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Gastos del Mes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📋 Gastos del Mes</CardTitle>
            <CardDescription>
              {selectedMonthData.expenses.length} gastos registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMonthData.expenses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📝</div>
                <p>No hay gastos registrados en este mes</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedMonthData.expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${
                          expense.category === "needs"
                            ? "bg-blue-500"
                            : expense.category === "wants"
                              ? "bg-purple-500"
                              : "bg-green-500"
                        } flex items-center justify-center text-white text-sm`}
                      >
                        {expense.category === "needs"
                          ? "🧾"
                          : expense.category === "wants"
                            ? "💸"
                            : "📈"}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">
                          {expense.description || "Sin descripción"}
                        </p>
                        <p className="text-xs text-gray-500">{expense.date}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {expense.subcategory}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(expense.amount, userCurrency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-xl font-bold text-gray-900">Historial</h1>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Filtrar por año
              </span>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los años</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resumen del Período */}
      {filteredHistory.length > 0 && (
        <Card className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-green-100 text-sm mb-2">
                Resumen{" "}
                {selectedYear !== "all" ? `de ${selectedYear}` : "Total"}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-100">Meses</p>
                  <p className="font-semibold text-lg">
                    {filteredHistory.length}
                  </p>
                </div>
                <div>
                  <p className="text-green-100">Total Ingresos</p>
                  <p className="font-semibold text-lg">
                    {formatCurrency(
                      filteredHistory.reduce(
                        (sum, month) => sum + month.income,
                        0
                      ),
                      userCurrency
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-green-100">Total Gastado</p>
                  <p className="font-semibold text-lg">
                    {formatCurrency(
                      filteredHistory.reduce(
                        (sum, month) => sum + month.totalSpent,
                        0
                      ),
                      userCurrency
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-green-100">Total Ahorrado</p>
                  <p className="font-semibold text-lg">
                    {formatCurrency(
                      filteredHistory.reduce(
                        (sum, month) => sum + month.totalRemaining,
                        0
                      ),
                      userCurrency
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Meses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Historial de Meses
          </CardTitle>
          <CardDescription>
            {filteredHistory.length} meses registrados
            {selectedYear !== "all" && ` en ${selectedYear}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📅</div>
              <p>No hay historial disponible</p>
              <p className="text-sm">
                Los datos aparecerán aquí cuando tengas meses registrados
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((monthData) => {
                const status = getMonthStatus(monthData);
                return (
                  <div
                    key={monthData.month}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {monthData.monthName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={status.color}>
                            {status.icon} {status.status}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMonth(monthData)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        Ver
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-gray-600">Ingreso</p>
                          <p className="font-semibold">
                            {formatCurrency(monthData.income, userCurrency)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <div>
                          <p className="text-gray-600">Gastado</p>
                          <p className="font-semibold">
                            {formatCurrency(monthData.totalSpent, userCurrency)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Disponible:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(
                            monthData.totalRemaining,
                            userCurrency
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
