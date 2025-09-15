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
import { ExpenseConfig, Income } from "@/types/expense/expense";
import {
  defaultConfig,
  formatCurrency,
  getRecommendedConfig,
} from "@/utils/expense-utils";

interface SetupFormProps {
  onComplete: (
    income: Income,
    config: ExpenseConfig,
    accumulatedSavings: number
  ) => void;
}

export function SetupForm({ onComplete }: SetupFormProps) {
  const [income, setIncome] = useState<Income>({
    net: 0,
  });
  const [config, setConfig] = useState<ExpenseConfig>(defaultConfig);
  const [accumulatedSavings, setAccumulatedSavings] = useState<number>(0);

  const handleIncomeChange = (value: number) => {
    const newIncome = { net: value };
    setIncome(newIncome);

    // Actualizar configuración recomendada automáticamente
    if (value > 0) {
      setConfig(getRecommendedConfig(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (income.net > 0) {
      onComplete(income, config, accumulatedSavings);
    }
  };

  const getRecommendationText = (netIncome: number) => {
    if (netIncome < 500000) {
      return "💡 Recomendación: 70/20/10 - Prioriza necesidades básicas";
    } else if (netIncome < 800000) {
      return "💡 Recomendación: 60/30/10 - Balance entre necesidades y calidad de vida";
    } else if (netIncome < 1200000) {
      return "💡 Recomendación: 60/20/20 - Mantén ahorro fuerte con margen";
    } else {
      return "💡 Recomendación: 50/30/20 - Método clásico para ingresos altos";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            💰 Configuración de Gestión de Gastos
          </CardTitle>
          <CardDescription className="text-center">
            Configura tu ingreso y distribución de presupuesto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ingresos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">📊 Ingreso Neto</h3>
              <div>
                <Label htmlFor="net">Ingreso Neto Mensual</Label>
                <Input
                  id="net"
                  type="number"
                  value={income.net || ""}
                  onChange={(e) => handleIncomeChange(Number(e.target.value))}
                  placeholder="0"
                  required
                />
                {income.net > 0 && (
                  <p className="text-sm text-blue-600 mt-2">
                    {getRecommendationText(income.net)}
                  </p>
                )}
              </div>
            </div>

            {/* Ahorro Acumulado */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">💰 Ahorro Acumulado</h3>
              <div>
                <Label htmlFor="accumulatedSavings">
                  Ahorro del Mes Anterior
                </Label>
                <Input
                  id="accumulatedSavings"
                  type="number"
                  value={accumulatedSavings || ""}
                  onChange={(e) =>
                    setAccumulatedSavings(Number(e.target.value))
                  }
                  placeholder="0"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Ingresa el monto que tenías ahorrado antes de este mes
                </p>
              </div>
            </div>

            {/* Distribución */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                📦 Distribución del Presupuesto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="needs">Necesidades (%)</Label>
                  <Input
                    id="needs"
                    type="number"
                    value={config.needsPercentage}
                    onChange={(e) => {
                      const newConfig = {
                        ...config,
                        needsPercentage: Number(e.target.value),
                      };
                      setConfig(newConfig);
                    }}
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="wants">Deseos (%)</Label>
                  <Input
                    id="wants"
                    type="number"
                    value={config.wantsPercentage}
                    onChange={(e) => {
                      const newConfig = {
                        ...config,
                        wantsPercentage: Number(e.target.value),
                      };
                      setConfig(newConfig);
                    }}
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="savings">Ahorro/Inversión (%)</Label>
                  <Input
                    id="savings"
                    type="number"
                    value={config.savingsPercentage}
                    onChange={(e) => {
                      const newConfig = {
                        ...config,
                        savingsPercentage: Number(e.target.value),
                      };
                      setConfig(newConfig);
                    }}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="text-center">
                <span
                  className={`text-sm ${
                    config.needsPercentage +
                      config.wantsPercentage +
                      config.savingsPercentage ===
                    100
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Total:{" "}
                  {config.needsPercentage +
                    config.wantsPercentage +
                    config.savingsPercentage}
                  %
                </span>
              </div>
            </div>

            {/* Vista previa */}
            {income.net > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">👀 Vista Previa</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(
                            Math.round(
                              income.net * (config.needsPercentage / 100)
                            )
                          )}
                        </div>
                        <div className="text-sm text-gray-600">Necesidades</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(
                            Math.round(
                              income.net * (config.wantsPercentage / 100)
                            )
                          )}
                        </div>
                        <div className="text-sm text-gray-600">Deseos</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(
                            Math.round(
                              income.net * (config.savingsPercentage / 100)
                            ) + accumulatedSavings
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          Ahorro/Inversión
                        </div>
                        {accumulatedSavings > 0 && (
                          <div className="text-xs text-green-500">
                            + {formatCurrency(accumulatedSavings)} acumulado
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                income.net <= 0 ||
                config.needsPercentage +
                  config.wantsPercentage +
                  config.savingsPercentage !==
                  100
              }
            >
              Comenzar Gestión de Gastos
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
