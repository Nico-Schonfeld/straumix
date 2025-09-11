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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Expense, ExpenseData, MonthlyData } from "@/types/expense/expense";
import {
  calculateTotals,
  calculateRemaining,
  formatCurrency,
  createMonthlyData,
  getCurrentMonthKey,
} from "@/utils/expense-utils";
import {
  addExpense,
  deleteExpense,
  getUserExpenseData,
} from "@/app/actions/expense/expenseActions";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  needsCategories,
  wantsCategories,
  savingsCategories,
} from "@/utils/categories";
import { Charts } from "@/components/pages/webapp/dashboard/Charts";
import { MonthlyHistory } from "@/components/pages/webapp/dashboard/MonthlyHistory";

interface DashboardProps {
  data: ExpenseData;
  onDataChange: (data: ExpenseData) => void;
  onReset: () => void;
}

export function Dashboard({ data, onDataChange, onReset }: DashboardProps) {
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "needs" as "needs" | "wants" | "savings",
    subcategory: "",
  });
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "charts" | "history"
  >("dashboard");
  const [selectedMonthData, setSelectedMonthData] =
    useState<MonthlyData | null>(null);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isDeletingExpense, setIsDeletingExpense] = useState<string | null>(
    null
  );

  const totals = calculateTotals(data.expenses);
  const remaining = calculateRemaining(
    data.budget,
    totals,
    data.accumulatedSavings
  );

  // Crear datos del mes actual para gráficos
  const currentMonthData = createMonthlyData(data, getCurrentMonthKey());

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const isOtherCategory = newExpense.subcategory === "Otra";
    const hasRequiredFields =
      newExpense.amount &&
      newExpense.subcategory &&
      (!isOtherCategory || (isOtherCategory && newExpense.description));

    if (hasRequiredFields) {
      setIsAddingExpense(true);

      try {
        const expense: Omit<Expense, "id"> = {
          description: newExpense.description,
          amount: Number(newExpense.amount),
          category: newExpense.category,
          subcategory: newExpense.subcategory,
          date: new Date().toISOString().split("T")[0],
        };

        const result = await addExpense(expense);
        if (result.success && result.data) {
          // Actualizar datos locales
          const updatedData = {
            ...data,
            expenses: [...data.expenses, result.data],
            lastUpdated: new Date().toISOString(),
          };
          onDataChange(updatedData);

          // Obtener datos actualizados del servidor
          const dataResult = await getUserExpenseData();
          if (dataResult.success && dataResult.data) {
            onDataChange(dataResult.data);
          }

          setNewExpense({
            description: "",
            amount: "",
            category: "needs",
            subcategory: "",
          });

          toast.success("Gasto agregado correctamente");
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error al agregar el gasto");
        console.error("Error:", error);
      } finally {
        setIsAddingExpense(false);
      }
    }
  };

  const handleDeleteExpense = async (id: string) => {
    setIsDeletingExpense(id);

    try {
      const result = await deleteExpense(id);
      if (result.success) {
        // Actualizar datos locales
        const updatedData = {
          ...data,
          expenses: data.expenses.filter((expense) => expense.id !== id),
          lastUpdated: new Date().toISOString(),
        };
        onDataChange(updatedData);

        // Obtener datos actualizados del servidor
        const dataResult = await getUserExpenseData();
        if (dataResult.success && dataResult.data) {
          onDataChange(dataResult.data);
        }

        toast.success("Gasto eliminado correctamente");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error al eliminar el gasto");
      console.error("Error:", error);
    } finally {
      setIsDeletingExpense(null);
    }
  };

  const handleViewMonth = (monthData: MonthlyData) => {
    setSelectedMonthData(monthData);
    setActiveTab("dashboard");
  };

  const handleBackToCurrent = () => {
    setSelectedMonthData(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "needs":
        return "text-blue-600";
      case "wants":
        return "text-purple-600";
      case "savings":
        return "text-green-600";
      default:
        return "text-gray-600";
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

  const getCategoriesByType = (type: "needs" | "wants" | "savings") => {
    switch (type) {
      case "needs":
        return needsCategories;
      case "wants":
        return wantsCategories;
      case "savings":
        return savingsCategories;
      default:
        return [];
    }
  };

  const getCategoryBadge = (category: string, subcategory: string) => {
    const allCategories = [
      ...needsCategories,
      ...wantsCategories,
      ...savingsCategories,
    ];
    const foundCategory = allCategories.find((cat) => cat.name === subcategory);

    if (foundCategory) {
      return (
        <Badge
          className="text-xs"
          style={{ backgroundColor: foundCategory.color, color: "white" }}
        >
          {foundCategory.icon} {foundCategory.name}
        </Badge>
      );
    }

    // Si es "Otra" o no se encuentra, mostrar la descripción
    return (
      <Badge variant="outline" className="text-xs">
        📝 {subcategory}
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header con información de ingresos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            💰 Gestión de Gastos - Dashboard
            {selectedMonthData && (
              <span className="text-lg text-blue-600 ml-2">
                ({selectedMonthData.monthName})
              </span>
            )}
          </CardTitle>
          <CardDescription className="text-center">
            Ingreso Neto: {formatCurrency(data.income.net)}
          </CardDescription>
          <div className="flex justify-center gap-4 mt-4">
            {selectedMonthData && (
              <Button variant="outline" onClick={handleBackToCurrent}>
                ← Volver al Mes Actual
              </Button>
            )}
            <Button variant="outline" onClick={onReset}>
              🔄 Reiniciar Configuración
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Pestañas de navegación */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              📊 Dashboard
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "charts"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("charts")}
            >
              📈 Gráficos
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "history"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("history")}
            >
              📅 Historial
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Contenido según pestaña activa */}
      {activeTab === "dashboard" && (
        <>
          {/* Resumen de presupuesto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-600">
                  🧾 Necesidades
                </CardTitle>
                <CardDescription>
                  {data.config.needsPercentage}% del ingreso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Presupuesto:</span>
                    <span className="font-semibold">
                      {formatCurrency(data.budget.needs)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gastado:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(totals.needs)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Restante:</span>
                    <span
                      className={`font-bold ${
                        remaining.needs >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(remaining.needs)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-purple-600">
                  💸 Deseos
                </CardTitle>
                <CardDescription>
                  {data.config.wantsPercentage}% del ingreso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Presupuesto:</span>
                    <span className="font-semibold">
                      {formatCurrency(data.budget.wants)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gastado:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(totals.wants)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Restante:</span>
                    <span
                      className={`font-bold ${
                        remaining.wants >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(remaining.wants)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-600">
                  📈 Ahorro/Inversión
                </CardTitle>
                <CardDescription>
                  {data.config.savingsPercentage}% del ingreso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Presupuesto:</span>
                    <span className="font-semibold">
                      {formatCurrency(data.budget.savings)}
                    </span>
                  </div>
                  {data.accumulatedSavings > 0 && (
                    <div className="flex justify-between">
                      <span>Ahorro Acumulado:</span>
                      <span className="font-semibold text-green-600">
                        +{formatCurrency(data.accumulatedSavings)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Gastado:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(totals.savings)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Restante:</span>
                    <span
                      className={`font-bold ${
                        remaining.savings >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(remaining.savings)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario para agregar gastos */}
          <Card>
            <CardHeader>
              <CardTitle>➕ Agregar Nuevo Gasto</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleAddExpense}
                className="grid grid-cols-1 md:grid-cols-5 gap-4"
              >
                <div>
                  <Label htmlFor="description">
                    Descripción{" "}
                    {newExpense.subcategory === "Otra"
                      ? "(Requerido)"
                      : "(Opcional)"}
                  </Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value,
                      })
                    }
                    placeholder="Ej: Supermercado"
                    required={newExpense.subcategory === "Otra"}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Monto</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoría Principal</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value: "needs" | "wants" | "savings") => {
                      setNewExpense({
                        ...newExpense,
                        category: value,
                        subcategory: "", // Resetear subcategoría al cambiar categoría
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="needs">🧾 Necesidades</SelectItem>
                      <SelectItem value="wants">💸 Deseos</SelectItem>
                      <SelectItem value="savings">
                        📈 Ahorro/Inversión
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategoría</Label>
                  <Select
                    value={newExpense.subcategory}
                    onValueChange={(value: string) =>
                      setNewExpense({ ...newExpense, subcategory: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una subcategoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCategoriesByType(newExpense.category).map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="Otra">📝 Otra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isAddingExpense}
                  >
                    {isAddingExpense ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Agregando...
                      </>
                    ) : (
                      "Agregar"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tabla de gastos */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Lista de Gastos</CardTitle>
              <CardDescription>
                Total de gastos: {data.expenses.length} | Total gastado:{" "}
                {formatCurrency(totals.needs + totals.wants + totals.savings)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.expenses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay gastos registrados aún. ¡Agrega tu primer gasto!
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Subcategoría</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>
                          {expense.description || (
                            <span className="text-gray-400 italic">
                              Sin descripción
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {getCategoryBadge(
                            expense.category,
                            expense.subcategory
                          )}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(expense.amount)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteExpense(expense.id)}
                            disabled={isDeletingExpense === expense.id}
                          >
                            {isDeletingExpense === expense.id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                                Eliminando...
                              </>
                            ) : (
                              "Eliminar"
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Resumen final */}
          <Card>
            <CardHeader>
              <CardTitle>🧮 Saldo Total Disponible</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {formatCurrency(remaining.needs)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Sobrante Necesidades
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {formatCurrency(remaining.wants)}
                  </div>
                  <div className="text-sm text-gray-600">Sobrante Deseos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {formatCurrency(remaining.savings)}
                  </div>
                  <div className="text-sm text-gray-600">Ahorro/Inversión</div>
                  {data.accumulatedSavings > 0 && (
                    <div className="text-xs text-green-500">
                      Incluye {formatCurrency(data.accumulatedSavings)}{" "}
                      acumulado
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center mt-4 pt-4 border-t">
                <div className="text-2xl font-bold">
                  Total Disponible:{" "}
                  {formatCurrency(
                    remaining.needs + remaining.wants + remaining.savings
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "charts" && (
        <Charts
          monthlyHistory={data.monthlyHistory || []}
          currentMonthData={currentMonthData}
        />
      )}

      {activeTab === "history" && (
        <MonthlyHistory
          monthlyHistory={data.monthlyHistory || []}
          onViewMonth={handleViewMonth}
        />
      )}
    </div>
  );
}
