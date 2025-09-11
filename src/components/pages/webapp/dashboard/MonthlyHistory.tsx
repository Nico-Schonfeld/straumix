"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MonthlyData } from "@/types/expense/expense";
import { formatCurrency } from "@/utils/expense-utils";

interface MonthlyHistoryProps {
  monthlyHistory: MonthlyData[];
  onViewMonth: (monthData: MonthlyData) => void;
}

export function MonthlyHistory({
  monthlyHistory,
  onViewMonth,
}: MonthlyHistoryProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Obtener años únicos
  const years = [...new Set(monthlyHistory.map((month) => month.year))].sort(
    (a, b) => b - a
  );

  // Filtrar por año seleccionado
  const filteredHistory = selectedYear
    ? monthlyHistory.filter((month) => month.year === selectedYear)
    : monthlyHistory;

  const getMonthStatus = (monthData: MonthlyData) => {
    const totalBudget =
      monthData.budget.needs +
      monthData.budget.wants +
      monthData.budget.savings;
    const totalSpent = monthData.totalSpent;
    const percentage = (totalSpent / totalBudget) * 100;

    if (percentage <= 80)
      return { status: "Excelente", color: "bg-green-100 text-green-800" };
    if (percentage <= 95)
      return { status: "Bueno", color: "bg-yellow-100 text-yellow-800" };
    return { status: "Excedido", color: "bg-red-100 text-red-800" };
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>📅 Historial de Meses</CardTitle>
          <CardDescription>
            Revisa tus finanzas de meses anteriores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedYear === null ? "default" : "outline"}
              onClick={() => setSelectedYear(null)}
            >
              Todos los años
            </Button>
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabla de historial */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Resumen por Mes</CardTitle>
          <CardDescription>
            {filteredHistory.length} meses registrados
            {selectedYear && ` en ${selectedYear}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay datos para mostrar
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
                      <TableCell>{formatCurrency(monthData.income)}</TableCell>
                      <TableCell>
                        <span className="text-red-600 font-semibold">
                          {formatCurrency(monthData.totalSpent)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-600 font-semibold">
                          {formatCurrency(monthData.totalRemaining)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewMonth(monthData)}
                        >
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

      {/* Resumen del año seleccionado */}
      {selectedYear && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Resumen {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {filteredHistory.length}
                </div>
                <div className="text-sm text-gray-600">Meses</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    filteredHistory.reduce(
                      (sum, month) => sum + month.income,
                      0
                    )
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Ingresos</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(
                    filteredHistory.reduce(
                      (sum, month) => sum + month.totalSpent,
                      0
                    )
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Gastado</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(
                    filteredHistory.reduce(
                      (sum, month) => sum + month.totalRemaining,
                      0
                    )
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Ahorrado</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
