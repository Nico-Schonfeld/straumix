"use client";

import React from "react";
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
import { MonthlyData } from "@/types/expense/expense";
import { formatCurrency } from "@/utils/expense-utils";
import { CurrencyCode } from "@/utils/currencies";

interface ChartsProps {
  monthlyHistory: MonthlyData[];
  currentMonthData: MonthlyData;
  userCurrency: CurrencyCode;
}

const COLORS = {
  needs: "#3B82F6",
  wants: "#8B5CF6",
  savings: "#10B981",
  income: "#059669",
  spent: "#EF4444",
  remaining: "#F59E0B",
};

export function Charts({
  monthlyHistory,
  currentMonthData,
  userCurrency,
}: ChartsProps) {
  // Preparar datos para el gráfico de líneas (evolución mensual)
  const lineChartData = monthlyHistory.map((month) => ({
    month: month.monthName,
    income: month.income,
    gastado: month.totalSpent,
    disponible: month.totalRemaining,
  }));

  // Preparar datos para el gráfico de barras (distribución por categoría)
  const barChartData = monthlyHistory.map((month) => ({
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

  return (
    <div className="space-y-6">
      {/* Gráfico de líneas - Evolución mensual */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Evolución Mensual</CardTitle>
          <CardDescription>
            Comparación de ingresos, gastos y dinero disponible por mes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => formatCurrency(value, userCurrency)}
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
        </CardContent>
      </Card>

      {/* Gráfico de barras - Distribución por categoría */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Distribución por Categoría</CardTitle>
          <CardDescription>
            Gastos por categoría a lo largo de los meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => formatCurrency(value, userCurrency)}
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
        </CardContent>
      </Card>

      {/* Gráfico de pastel - Distribución actual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>🥧 Distribución Actual</CardTitle>
            <CardDescription>
              Proporción de gastos por categoría este mes
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Resumen estadístico */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Resumen Estadístico</CardTitle>
            <CardDescription>Estadísticas de tus finanzas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {monthlyHistory.length}
                  </div>
                  <div className="text-sm text-gray-600">Meses registrados</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      monthlyHistory.reduce(
                        (sum, month) => sum + month.income,
                        0
                      ),
                      userCurrency
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Total ingresos</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(
                      monthlyHistory.reduce(
                        (sum, month) => sum + month.totalSpent,
                        0
                      ),
                      userCurrency
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Total gastado</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatCurrency(
                      monthlyHistory.reduce(
                        (sum, month) => sum + month.totalRemaining,
                        0
                      ),
                      userCurrency
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Total ahorrado</div>
                </div>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {monthlyHistory.length > 0
                    ? `${(
                        (monthlyHistory.reduce(
                          (sum, month) => sum + month.totalRemaining,
                          0
                        ) /
                          monthlyHistory.reduce(
                            (sum, month) => sum + month.income,
                            0
                          )) *
                        100
                      ).toFixed(1)}%`
                    : "0%"}
                </div>
                <div className="text-sm text-gray-600">Promedio de ahorro</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
