"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
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
import {
  ArrowLeft,
  Filter,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ChartsDesktopProps {
  data: ExpenseData;
  onDataChange: (data: ExpenseData) => void;
  onReset: () => void;
  user: UserIDType;
}

const COLORS = {
  needs: "#3B82F6",
  wants: "#8B5CF6",
  savings: "#10B981",
  income: "#059669",
  spent: "#EF4444",
  remaining: "#F59E0B",
};

export function ChartsDesktop({
  data,
  onDataChange,
  onReset,
  user,
}: ChartsDesktopProps) {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

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

  // Obtener años únicos
  const years = [
    ...new Set(
      data.monthlyHistory?.map((month) => month.year.toString()) || []
    ),
  ].sort((a, b) => parseInt(b) - parseInt(a));

  // Obtener meses únicos del año seleccionado
  const months =
    selectedYear === "all"
      ? []
      : [
          ...new Set(
            data.monthlyHistory
              ?.filter((month) => month.year.toString() === selectedYear)
              .map((month) => month.month) || []
          ),
        ].sort();

  // Filtrar por año y mes seleccionados
  let filteredHistory = data.monthlyHistory || [];
  if (selectedYear !== "all") {
    filteredHistory = filteredHistory.filter(
      (month) => month.year.toString() === selectedYear
    );
  }
  if (selectedMonth !== "all") {
    filteredHistory = filteredHistory.filter(
      (month) => month.month === selectedMonth
    );
  }

  // Preparar datos para el gráfico de líneas (evolución mensual)
  const lineChartData = filteredHistory.map((month) => ({
    month: month.monthName,
    income: month.income,
    gastado: month.totalSpent,
    disponible: month.totalRemaining,
  }));

  // Preparar datos para el gráfico de barras (distribución por categoría)
  const barChartData = filteredHistory.map((month) => ({
    month: month.monthName,
    necesidades: month.totals.needs,
    deseos: month.totals.wants,
    ahorro: month.totals.savings,
  }));

  // Datos para el gráfico de pastel del mes actual
  const pieChartData = [
    {
      name: "Necesidades",
      value: currentMonthData.totals.needs,
      color: COLORS.needs,
    },
    {
      name: "Deseos",
      value: currentMonthData.totals.wants,
      color: COLORS.wants,
    },
    {
      name: "Ahorro",
      value: currentMonthData.totals.savings,
      color: COLORS.savings,
    },
  ].filter((item) => item.value > 0);

  // Datos para el gráfico de área
  const areaChartData = filteredHistory.map((month) => ({
    month: month.monthName,
    necesidades: month.totals.needs,
    deseos: month.totals.wants,
    ahorro: month.totals.savings,
  }));

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value, userCurrency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
                📊 Análisis y Gráficos
              </h1>
              <p className="text-gray-600 mt-1">
                Visualiza tus datos financieros con gráficos interactivos
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Datos
            </CardTitle>
            <CardDescription>
              Filtra los datos por año y mes para análisis específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Año
                </label>
                <Select
                  value={selectedYear}
                  onValueChange={(value) => {
                    setSelectedYear(value);
                    setSelectedMonth("all"); // Reset month when year changes
                  }}
                >
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
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mes
                </label>
                <Select
                  value={selectedMonth}
                  onValueChange={setSelectedMonth}
                  disabled={selectedYear === "all"}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los meses</SelectItem>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {data.monthlyHistory?.find((m) => m.month === month)
                          ?.monthName || month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedYear("all");
                    setSelectedMonth("all");
                  }}
                  className="w-full"
                >
                  Limpiar Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Meses Analizados
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
                  <DollarSign className="h-6 w-6 text-red-600" />
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
                  <PieChartIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos Principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de líneas - Evolución mensual */}
          <Card>
            <CardHeader>
              <CardTitle>📈 Evolución Mensual</CardTitle>
              <CardDescription>
                Comparación de ingresos, gastos y dinero disponible por mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {lineChartData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-2">📈</div>
                  <p>No hay datos para mostrar</p>
                  <p className="text-sm">
                    Ajusta los filtros o agrega más datos
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={(value) =>
                        formatCurrency(value, userCurrency)
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke={COLORS.income}
                      strokeWidth={3}
                      name="Ingresos"
                    />
                    <Line
                      type="monotone"
                      dataKey="gastado"
                      stroke={COLORS.spent}
                      strokeWidth={2}
                      name="Gastado"
                    />
                    <Line
                      type="monotone"
                      dataKey="disponible"
                      stroke={COLORS.remaining}
                      strokeWidth={2}
                      name="Disponible"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Gráfico de pastel - Distribución actual */}
          <Card>
            <CardHeader>
              <CardTitle>🥧 Distribución Actual</CardTitle>
              <CardDescription>
                Proporción de gastos por categoría este mes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pieChartData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-2">🥧</div>
                  <p>No hay gastos este mes</p>
                  <p className="text-sm">
                    Agrega algunos gastos para ver el gráfico
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gráficos Secundarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de barras - Distribución por categoría */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Distribución por Categoría</CardTitle>
              <CardDescription>
                Gastos por categoría a lo largo de los meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {barChartData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-2">📊</div>
                  <p>No hay datos para mostrar</p>
                  <p className="text-sm">
                    Ajusta los filtros o agrega más datos
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={(value) =>
                        formatCurrency(value, userCurrency)
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="necesidades"
                      fill={COLORS.needs}
                      name="Necesidades"
                    />
                    <Bar dataKey="deseos" fill={COLORS.wants} name="Deseos" />
                    <Bar dataKey="ahorro" fill={COLORS.savings} name="Ahorro" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Gráfico de área - Tendencias acumuladas */}
          <Card>
            <CardHeader>
              <CardTitle>📈 Tendencias por Categoría</CardTitle>
              <CardDescription>
                Visualización de tendencias acumuladas por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              {areaChartData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-2">📈</div>
                  <p>No hay datos para mostrar</p>
                  <p className="text-sm">
                    Ajusta los filtros o agrega más datos
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={areaChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={(value) =>
                        formatCurrency(value, userCurrency)
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="necesidades"
                      stackId="1"
                      stroke={COLORS.needs}
                      fill={COLORS.needs}
                      name="Necesidades"
                    />
                    <Area
                      type="monotone"
                      dataKey="deseos"
                      stackId="1"
                      stroke={COLORS.wants}
                      fill={COLORS.wants}
                      name="Deseos"
                    />
                    <Area
                      type="monotone"
                      dataKey="ahorro"
                      stackId="1"
                      stroke={COLORS.savings}
                      fill={COLORS.savings}
                      name="Ahorro"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
