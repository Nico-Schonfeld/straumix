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
import { Plus, Trash2, ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface ExpensesMobileProps {
  data: ExpenseData;
  onDataChange: (data: ExpenseData) => void;
  onReset: () => void;
  user: UserIDType;
}

export function ExpensesMobile({
  data,
  onDataChange,
  onReset,
  user,
}: ExpensesMobileProps) {
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
  const [showAddForm, setShowAddForm] = useState(false);

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
          setShowAddForm(false);

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
        <h1 className="text-xl font-bold text-gray-900">Gastos</h1>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      {/* Saldo Total Disponible */}
      <Card className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-green-100 text-sm mb-2">
              Saldo Total Disponible
            </p>
            <p className="text-4xl font-bold mb-2">
              {formatCurrency(
                remaining.needs + remaining.wants + remaining.savings,
                userCurrency
              )}
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-green-100">Necesidades</p>
                <p className="font-semibold">
                  {formatCurrency(remaining.needs, userCurrency)}
                </p>
              </div>
              <div>
                <p className="text-green-100">Deseos</p>
                <p className="font-semibold">
                  {formatCurrency(remaining.wants, userCurrency)}
                </p>
              </div>
              <div>
                <p className="text-green-100">Ahorro</p>
                <p className="font-semibold">
                  {formatCurrency(remaining.savings, userCurrency)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón Agregar Gasto */}
      {!showAddForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full h-16 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-6 w-6 mr-2" />
              Agregar Nuevo Gasto
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Formulario para agregar gastos */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Agregar Nuevo Gasto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense} className="space-y-4">
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

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isAddingExpense}
                >
                  {isAddingExpense ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Agregando...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Agregar
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Gastos */}
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
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <p>No hay gastos registrados aún</p>
              <p className="text-sm">¡Agrega tu primer gasto!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${getCategoryColor(expense.category)} flex items-center justify-center text-white text-lg`}
                    >
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {expense.description || "Sin descripción"}
                      </p>
                      <p className="text-sm text-gray-500">{expense.date}</p>
                      <div className="mt-1">
                        {getCategoryBadge(
                          expense.category,
                          expense.subcategory
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-lg">
                      {formatCurrency(expense.amount, userCurrency)}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteExpense(expense.id)}
                      disabled={isDeletingExpense === expense.id}
                      className="mt-2"
                    >
                      {isDeletingExpense === expense.id ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                          Eliminando...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-3 w-3 mr-1" />
                          Eliminar
                        </>
                      )}
                    </Button>
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
