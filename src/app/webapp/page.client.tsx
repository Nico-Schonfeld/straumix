"use client";

import React from "react";

import { UserSessionType } from "@/types/user/user";
import { ExpenseData } from "@/types/expense/expense";
import {
  calculateBudget,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/expense-utils";
import { SetupForm } from "@/components/pages/webapp/setup/SetupForm";
import { Dashboard } from "@/components/pages/webapp/dashboard/Dashboard";

const WebAppClient = ({ session }: { session: UserSessionType }) => {
  const [data, setData] = React.useState<ExpenseData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Cargar datos del localStorage al iniciar

    const savedData = loadFromLocalStorage();

    if (savedData) {
      setData(savedData);
    }
    setIsLoading(false);
  }, []);

  const handleSetupComplete = (
    income: { net: number },
    config: {
      needsPercentage: number;
      wantsPercentage: number;
      savingsPercentage: number;
    },
    accumulatedSavings: number
  ) => {
    const budget = calculateBudget(income.net, config);
    const newData: ExpenseData = {
      config,
      income,
      budget,
      expenses: [],
      accumulatedSavings,
      monthlyHistory: [],
      lastUpdated: new Date().toISOString(),
    };

    setData(newData);
    saveToLocalStorage(newData);
  };

  const handleDataChange = (updatedData: ExpenseData) => {
    setData(updatedData);
  };

  const handleReset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("expense-tracker-data");
    }
    setData(null);
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
