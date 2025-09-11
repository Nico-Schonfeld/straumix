"use client";

import React from "react";

import { UserSessionType } from "@/types/user/user";
import { ExpenseData } from "@/types/expense/expense";
import { SetupForm } from "@/components/pages/webapp/setup/SetupForm";
import { Dashboard } from "@/components/pages/webapp/dashboard/Dashboard";
import {
  createExpenseConfig,
  createMonthlyBudget,
  getUserExpenseData,
  resetExpenseData,
} from "@/app/actions/expense/expenseActions";
import { toast } from "sonner";

interface WebAppClientProps {
  session: UserSessionType;
  initialExpenseData: ExpenseData | null;
  hasExpenseData: boolean;
}

const WebAppClient = ({
  session,
  initialExpenseData,
  hasExpenseData,
}: WebAppClientProps) => {
  const [data, setData] = React.useState<ExpenseData | null>(
    initialExpenseData
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSetupComplete = async (
    income: { net: number },
    config: {
      needsPercentage: number;
      wantsPercentage: number;
      savingsPercentage: number;
    },
    accumulatedSavings: number
  ) => {
    setIsLoading(true);

    try {
      // Crear configuración de gastos
      const configResult = await createExpenseConfig(config);
      if (!configResult.success) {
        toast.error(configResult.message);
        return;
      }

      // Crear presupuesto mensual
      const budgetResult = await createMonthlyBudget(
        income,
        config,
        accumulatedSavings
      );
      if (!budgetResult.success) {
        toast.error(budgetResult.message);
        return;
      }

      // Obtener datos actualizados
      const dataResult = await getUserExpenseData();
      if (dataResult.success && dataResult.data) {
        setData(dataResult.data);
        toast.success("Configuración completada correctamente");
      } else {
        toast.error("Error al obtener datos actualizados");
      }
    } catch (error) {
      toast.error("Error al completar la configuración");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDataChange = async (updatedData: ExpenseData) => {
    setData(updatedData);
  };

  const handleReset = async () => {
    setIsLoading(true);

    try {
      const result = await resetExpenseData();
      if (result.success) {
        setData(null);
        toast.success("Datos reiniciados correctamente");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error al reiniciar los datos");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">💰</div>
          <div>Cargando...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <SetupForm onComplete={handleSetupComplete} />;
  }

  return (
    <>
      <section className="w-full h-screen flex flex-col items-center justify-center">
        <h1>WebApp</h1>
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Información del Usuario:</h2>
          <p>
            <strong>ID:</strong> {session.user.id}
          </p>
          <p>
            <strong>Nombre:</strong> {session.user.name} {session.user.lastName}
          </p>
          <p>
            <strong>Username:</strong> @{session.user.username}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
          <p>
            <strong>Activo:</strong> {session.user.isActive ? "Sí" : "No"}
          </p>
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-gray-500">
            Ver datos completos de la sesión
          </summary>
          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto max-w-md">
            {JSON.stringify(session, null, 2)}
          </pre>
        </details>
      </section>

      <Dashboard
        data={data}
        onDataChange={handleDataChange}
        onReset={handleReset}
      />
    </>
  );
};

export default WebAppClient;
