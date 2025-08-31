"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Plus, TrendingUp, Settings } from "lucide-react";
import { useSession } from "next-auth/react";

interface DashboardProps {
  onSetupBudget: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSetupBudget }) => {
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-blue-900">
            ¡Bienvenido a Straumix!
          </CardTitle>
          <CardDescription className="text-blue-700">
            Tu dashboard de gestión de gastos está listo
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Alert className="mb-6 border-blue-200 bg-blue-100/50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Próximo paso:</strong> Configura tu presupuesto mensual
              para empezar a usar la metodología 50/30/20.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Necesidades (50%)
              </h3>
              <p className="text-3xl font-bold text-green-900">$0.00</p>
              <p className="text-sm text-green-700 mt-2">
                Vivienda, comida, transporte, servicios
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Deseos (30%)
              </h3>
              <p className="text-3xl font-bold text-blue-900">$0.00</p>
              <p className="text-sm text-blue-700 mt-2">
                Entretenimiento, ropa, restaurantes
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                Ahorros (20%)
              </h3>
              <p className="text-3xl font-bold text-purple-900">$0.00</p>
              <p className="text-sm text-purple-700 mt-2">
                Ahorro, inversiones, emergencias
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onSetupBudget}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Configurar mi presupuesto
              </div>
            </Button>

            <Button variant="outline" className="w-full">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Explorar funcionalidades
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Dashboard;
