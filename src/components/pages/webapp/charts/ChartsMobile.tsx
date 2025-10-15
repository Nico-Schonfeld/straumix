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
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ChartsMobileProps {
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

export function ChartsMobile({
  data,
  onDataChange,
  onReset,
  user,
}: ChartsMobileProps) {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [activeChart, setActiveChart] = useState<"line" | "bar" | "pie">("pie");

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

  // Filtrar por año seleccionado
  const filteredHistory =
    selectedYear === "all"
      ? data.monthlyHistory || []
      : data.monthlyHistory?.filter(
          (month) => month.year.toString() === selectedYear
        ) || [];

  // Preparar datos para el gráfico de líneas (evolución mensual)
  const lineChartData = filteredHistory.map((month) => ({
    month: month.monthName.split(" ")[0], // Solo el nombre del mes
    income: month.income,
    gastado: month.totalSpent,
    disponible: month.totalRemaining,
  }));

  // Preparar datos para el gráfico de barras (distribución por categoría)
  const barChartData = filteredHistory.map((month) => ({
    month: month.monthName.split(" ")[0], // Solo el nombre del mes
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
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value, userCurrency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartButtons = [
    { id: "pie", label: "Distribución", icon: PieChartIcon },
    { id: "line", label: "Evolución", icon: TrendingUp },
    { id: "bar", label: "Categorías", icon: BarChart3 },
  ];

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
        <h1 className="text-xl font-bold text-gray-900">Gráficos</h1>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filtros</span>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Año</label>
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
          </div>
        </CardContent>
      </Card>

      {/* Selector de Gráfico */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {chartButtons.map((button) => (
              <Button
                key={button.id}
                variant={activeChart === button.id ? "default" : "outline"}
                onClick={() =>
                  setActiveChart(button.id as "line" | "bar" | "pie")
                }
                className="flex flex-col items-center gap-1 h-16"
              >
                <button.icon className="h-5 w-5" />
                <span className="text-xs">{button.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Pastel - Distribución Actual */}
      {activeChart === "pie" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">🥧 Distribución Actual</CardTitle>
            <CardDescription>
              Proporción de gastos por categoría este mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pieChartData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>No hay datos para mostrar</p>
                <p className="text-sm">
                  Agrega algunos gastos para ver el gráfico
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
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
      )}

      {/* Gráfico de líneas - Evolución mensual */}
      {activeChart === "line" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">📈 Evolución Mensual</CardTitle>
            <CardDescription>
              Comparación de ingresos, gastos y dinero disponible
              {selectedYear !== "all" && ` en ${selectedYear}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lineChartData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📈</div>
                <p>No hay datos para mostrar</p>
                <p className="text-sm">Necesitas al menos 2 meses de datos</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis hide />
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
      )}

      {/* Gráfico de barras - Distribución por categoría */}
      {activeChart === "bar" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              📊 Distribución por Categoría
            </CardTitle>
            <CardDescription>
              Gastos por categoría a lo largo de los meses
              {selectedYear !== "all" && ` en ${selectedYear}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {barChartData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>No hay datos para mostrar</p>
                <p className="text-sm">Necesitas al menos 1 mes de datos</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis hide />
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
      )}

      {/* Resumen Estadístico */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📋 Resumen Estadístico</CardTitle>
          <CardDescription>
            Estadísticas de tus finanzas
            {selectedYear !== "all" && ` en ${selectedYear}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">
                {filteredHistory.length}
              </div>
              <div className="text-xs text-gray-600">Meses registrados</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(
                  filteredHistory.reduce((sum, month) => sum + month.income, 0),
                  userCurrency
                )}
              </div>
              <div className="text-xs text-gray-600">Total ingresos</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">
                {formatCurrency(
                  filteredHistory.reduce(
                    (sum, month) => sum + month.totalSpent,
                    0
                  ),
                  userCurrency
                )}
              </div>
              <div className="text-xs text-gray-600">Total gastado</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">
                {formatCurrency(
                  filteredHistory.reduce(
                    (sum, month) => sum + month.totalRemaining,
                    0
                  ),
                  userCurrency
                )}
              </div>
              <div className="text-xs text-gray-600">Total ahorrado</div>
            </div>
          </div>

          {filteredHistory.length > 0 && (
            <div className="mt-4 text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                {(
                  (filteredHistory.reduce(
                    (sum, month) => sum + month.totalRemaining,
                    0
                  ) /
                    filteredHistory.reduce(
                      (sum, month) => sum + month.income,
                      0
                    )) *
                  100
                ).toFixed(1)}
                %
              </div>
              <div className="text-xs text-gray-600">Promedio de ahorro</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
