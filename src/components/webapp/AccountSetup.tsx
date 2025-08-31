"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, DollarSign, Check } from "lucide-react";
import { useSession } from "next-auth/react";

interface AccountSetupProps {
  onComplete: () => void;
}

const AccountSetup: React.FC<AccountSetupProps> = ({ onComplete }) => {
  const { data: session } = useSession();
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (!monthlyIncome || parseFloat(monthlyIncome) <= 0) {
      setError("Por favor ingresa un ingreso mensual válido");
      return;
    }

    if (!session?.user?.id) {
      setError("Error de sesión. Por favor inicia sesión nuevamente.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Aquí iría la lógica para actualizar el presupuesto
      // Por ahora simulamos el éxito
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      setError(
        "Error al configurar el presupuesto. Por favor intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const income = parseFloat(monthlyIncome) || 0;
  const needsAmount = income * 0.5;
  const wantsAmount = income * 0.3;
  const savingsAmount = income * 0.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-blue-900">
            Configura tu presupuesto
          </CardTitle>
          <CardDescription className="text-blue-700">
            Establece tu ingreso mensual para aplicar la metodología 50/30/20
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Alert className="mb-6 border-blue-200 bg-blue-100/50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Metodología 50/30/20:</strong> 50% para necesidades, 30%
              para deseos, 20% para ahorros.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="monthlyIncome"
                className="text-sm font-medium text-gray-700"
              >
                Ingreso mensual neto
              </Label>
              <Input
                id="monthlyIncome"
                type="number"
                placeholder="0.00"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="mt-2"
              />
            </div>

            {income > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-sm font-semibold text-green-800 mb-1">
                    Necesidades (50%)
                  </h3>
                  <p className="text-2xl font-bold text-green-900">
                    ${needsAmount.toFixed(2)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-800 mb-1">
                    Deseos (30%)
                  </h3>
                  <p className="text-2xl font-bold text-blue-900">
                    ${wantsAmount.toFixed(2)}
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="text-sm font-semibold text-purple-800 mb-1">
                    Ahorros (20%)
                  </h3>
                  <p className="text-2xl font-bold text-purple-900">
                    ${savingsAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <Alert className="border-red-200 bg-red-100/50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting || !monthlyIncome}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Configurando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Configurar presupuesto
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccountSetup;
