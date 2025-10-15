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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DollarSign,
  BarChart3,
  PieChart,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface HistoryDesktopProps {
  data: ExpenseData;
  onDataChange: (data: ExpenseData) => void;
  onReset: () => void;
  user: UserIDType;
}

export function HistoryDesktop({
  data,
  onDataChange,
  onReset,
  user,
}: HistoryDesktopProps) {
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBackToList}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al Historial
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  📅 {selectedMonthData.monthName}
                </h1>
                <p className="text-gray-600 mt-1">
                  Detalles completos del mes seleccionado
                </p>
              </div>
            </div>
          </div>

          {/* Resumen del Mes */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ingreso</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(selectedMonthData.income, userCurrency)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Gastado</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(
                        selectedMonthData.totalSpent,
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

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Disponible
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(
                        selectedMonthData.totalRemaining,
                        userCurrency
                      )}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Estado</p>
                    <Badge className={getMonthStatus(selectedMonthData).color}>
                      {getMonthStatus(selectedMonthData).icon}{" "}
                      {getMonthStatus(selectedMonthData).status}
                    </Badge>
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
            {/* Necesidades */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-blue-600">
                  <span className="text-xl">🧾</span>
                  Necesidades
                </CardTitle>
                <CardDescription>
                  {selectedMonthData.config.needsPercentage}% del ingreso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Presupuesto</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        selectedMonthData.budget.needs,
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gastado</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(
                        selectedMonthData.totals.needs,
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-600">Disponible</span>
                    <span
                      className={`font-semibold ${
                        selectedMonthData.remaining.needs >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(
                        selectedMonthData.remaining.needs,
                        userCurrency
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deseos */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-purple-600">
                  <span className="text-xl">💸</span>
                  Deseos
                </CardTitle>
                <CardDescription>
                  {selectedMonthData.config.wantsPercentage}% del ingreso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Presupuesto</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        selectedMonthData.budget.wants,
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gastado</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(
                        selectedMonthData.totals.wants,
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-600">Disponible</span>
                    <span
                      className={`font-semibold ${
                        selectedMonthData.remaining.wants >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(
                        selectedMonthData.remaining.wants,
                        userCurrency
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ahorro */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-green-600">
                  <span className="text-xl">📈</span>
                  Ahorro/Inversión
                </CardTitle>
                <CardDescription>
                  {selectedMonthData.config.savingsPercentage}% del ingreso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Presupuesto</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        selectedMonthData.budget.savings,
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gastado</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(
                        selectedMonthData.totals.savings,
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-600">Disponible</span>
                    <span
                      className={`font-semibold ${
                        selectedMonthData.remaining.savings >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(
                        selectedMonthData.remaining.savings,
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
              <CardTitle>📋 Gastos del Mes</CardTitle>
              <CardDescription>
                {selectedMonthData.expenses.length} gastos registrados en{" "}
                {selectedMonthData.monthName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedMonthData.expenses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold mb-2">
                    No hay gastos registrados
                  </h3>
                  <p>Este mes no tiene gastos registrados</p>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedMonthData.expenses.map((expense) => (
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
                          <Badge
                            className={
                              expense.category === "needs"
                                ? "text-blue-600 bg-blue-50"
                                : expense.category === "wants"
                                  ? "text-purple-600 bg-purple-50"
                                  : "text-green-600 bg-green-50"
                            }
                          >
                            {expense.category === "needs"
                              ? "🧾 Necesidades"
                              : expense.category === "wants"
                                ? "💸 Deseos"
                                : "📈 Ahorro"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{expense.subcategory}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(expense.amount, userCurrency)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push("/webapp/dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                📅 Historial Financiero
              </h1>
              <p className="text-gray-600 mt-1">
                Revisa el historial completo de tus finanzas mes a mes
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Historial
            </CardTitle>
            <CardDescription>
              Filtra los datos históricos por año para análisis específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Año
                </label>
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
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedYear("all")}
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen del Período */}
        {filteredHistory.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Meses Registrados
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {filteredHistory.length}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Ingresos
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(
                        filteredHistory.reduce(
                          (sum, month) => sum + month.income,
                          0
                        ),
                        userCurrency
                      )}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Gastado
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(
                        filteredHistory.reduce(
                          (sum, month) => sum + month.totalSpent,
                          0
                        ),
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

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Promedio Ahorro
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {filteredHistory.length > 0
                        ? `${(
                            (filteredHistory.reduce(
                              (sum, month) => sum + month.totalRemaining,
                              0
                            ) /
                              filteredHistory.reduce(
                                (sum, month) => sum + month.income,
                                0
                              )) *
                            100
                          ).toFixed(1)}%`
                        : "0%"}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabla de Historial */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Resumen por Mes</CardTitle>
            <CardDescription>
              {filteredHistory.length} meses registrados
              {selectedYear !== "all" && ` en ${selectedYear}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-lg font-semibold mb-2">
                  No hay historial disponible
                </h3>
                <p className="mb-4">
                  Los datos aparecerán aquí cuando tengas meses registrados
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mes</TableHead>
                    <TableHead>Ingreso</TableHead>
                    <TableHead>Gastado</TableHead>
                    <TableHead>Disponible</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((monthData) => {
                    const status = getMonthStatus(monthData);
                    return (
                      <TableRow key={monthData.month}>
                        <TableCell className="font-medium">
                          {monthData.monthName}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(monthData.income, userCurrency)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(monthData.totalSpent, userCurrency)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-blue-600">
                            {formatCurrency(
                              monthData.totalRemaining,
                              userCurrency
                            )}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={status.color}>
                            {status.icon} {status.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewMonth(monthData)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            Ver Detalles
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
