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
import { Info, CreditCard, Clock, Star } from "lucide-react";

const SubscriptionExpired: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl text-orange-900">
            Tu prueba gratuita ha expirado
          </CardTitle>
          <CardDescription className="text-orange-700">
            Continúa disfrutando de Straumix con una suscripción
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Alert className="mb-6 border-orange-200 bg-orange-100/50">
            <Info className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>¡Gracias por probar Straumix!</strong> Tu período de
              prueba gratuita de 14 días ha terminado. Elige un plan para
              continuar gestionando tus finanzas.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubscriptionExpired;
