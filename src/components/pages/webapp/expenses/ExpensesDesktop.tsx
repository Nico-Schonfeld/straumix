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
import { Expense, ExpenseData } from "@/types/expense/expense";
import { UserIDType } from "@/types/user/user";
import {
  calculateTotals,
  calculateRemaining,
  formatCurrency,
  getCurrentMonthKey,
} from "@/utils/expense-utils";
import { CurrencyCode } from "@/utils/currencies";
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
import {
  Plus,
  Trash2,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Calculator,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ExpensesDesktopProps {
  data: ExpenseData;
  onDataChange: (data: ExpenseData) => void;
  onReset: () => void;
  user: UserIDType;
}

export function ExpensesDesktop({
  data,
  onDataChange,
  onReset,
  user,
}: ExpensesDesktopProps) {
  const router = useRouter();
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "needs" as "needs" | "wants" | "savings",
    subcategory: "",
  });
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isDeletingExpense, setIsDeletingExpense] = useState<string | null>(
    null
  );

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
                💰 Gestión de Gastos
              </h1>
              <p className="text-gray-600 mt-1">
                Agrega nuevos gastos y gestiona tu saldo disponible
              </p>
            </div>
          </div>
        </div>

        {/* Resumen de Saldo */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Saldo Total */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Saldo Total Disponible
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(
                      remaining.needs + remaining.wants + remaining.savings,
                      userCurrency
                    )}
                  </p>
                </div>
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-green-600" />
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

          {/* Número de Gastos */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Gastos Registrados
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {data.expenses.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribución por Categorías */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {["needs", "wants", "savings"].map((category) => (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle
                  className={`text-lg flex items-center gap-2 ${getCategoryColor(category).split(" ")[0]}`}
                >
                  <span className="text-xl">
                    {category === "needs"
                      ? "🧾"
                      : category === "wants"
                        ? "💸"
                        : "📈"}
                  </span>
                  {getCategoryName(category)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Disponible:</span>
                    <span
                      className={`font-semibold ${
                        (category === "needs"
                          ? remaining.needs
                          : category === "wants"
                            ? remaining.wants
                            : remaining.savings) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(
                        category === "needs"
                          ? remaining.needs
                          : category === "wants"
                            ? remaining.wants
                            : remaining.savings,
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gastado:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(
                        category === "needs"
                          ? totals.needs
                          : category === "wants"
                            ? totals.wants
                            : totals.savings,
                        userCurrency
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Presupuesto:</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        category === "needs"
                          ? data.budget.needs
                          : category === "wants"
                            ? data.budget.wants
                            : data.budget.savings,
                        userCurrency
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Formulario para Agregar Gasto */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Agregar Nuevo Gasto
            </CardTitle>
            <CardDescription>
              Completa los campos para registrar un nuevo gasto
            </CardDescription>
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
                    <SelectItem value="savings">📈 Ahorro/Inversión</SelectItem>
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
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tabla de Gastos */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Lista de Gastos</CardTitle>
            <CardDescription>
              Total de gastos: {data.expenses.length} | Total gastado:{" "}
              {formatCurrency(
                totals.needs + totals.wants + totals.savings,
                userCurrency
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.expenses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold mb-2">
                  No hay gastos registrados
                </h3>
                <p className="mb-4">
                  ¡Agrega tu primer gasto usando el formulario de arriba!
                </p>
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
                          {expense.category === "needs"
                            ? "🧾"
                            : expense.category === "wants"
                              ? "💸"
                              : "📈"}{" "}
                          {getCategoryName(expense.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getCategoryBadge(
                          expense.category,
                          expense.subcategory
                        )}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(expense.amount, userCurrency)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteExpense(expense.id)}
                          disabled={isDeletingExpense === expense.id}
                          className="flex items-center gap-1"
                        >
                          {isDeletingExpense === expense.id ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                              Eliminando...
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-3 w-3" />
                              Eliminar
                            </>
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
      </div>
    </div>
  );
}
