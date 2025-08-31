"use client";

import { useSessionData } from "@/hooks/use-session-data";
import React from "react";
import dayjs from "dayjs";

const DebugDates = () => {
  const sessionData = useSessionData();

  const formatDate = (date: Date | string | null) => {
    if (!date) return "No disponible";
    return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
  };

  const calculateDaysRemaining = () => {
    if (!sessionData.subscription?.trialEndDate) return "No disponible";

    const now = new Date();
    const endDate = new Date(sessionData.subscription.trialEndDate);
    const timeRemaining = endDate.getTime() - now.getTime();
    const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

    return daysRemaining;
  };

  return (
    <div className="p-6  rounded-lg">
      <h2 className="text-xl font-bold mb-4">🔍 Debug de Fechas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" p-4 rounded">
          <h3 className="font-semibold mb-2">📅 Fechas de Suscripción</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Fecha actual:</strong> {formatDate(new Date())}
            </div>
            <div>
              <strong>Fecha de fin de prueba:</strong>{" "}
              {formatDate(sessionData.subscription?.trialEndDate || null)}
            </div>
            <div>
              <strong>Fecha de fin de suscripción:</strong>{" "}
              {formatDate(sessionData.subscription?.endDate || null)}
            </div>
          </div>
        </div>

        <div className="p-4 rounded">
          <h3 className="font-semibold mb-2">⏰ Cálculos</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Días restantes (calculado):</strong>{" "}
              {calculateDaysRemaining()}
            </div>
            <div>
              <strong>Días restantes (del hook):</strong>{" "}
              {sessionData.subscription?.daysRemaining || "No disponible"}
            </div>
            <div>
              <strong>¿Es prueba?</strong>{" "}
              {sessionData.subscription?.isTrial ? "Sí" : "No"}
            </div>
            <div>
              <strong>¿Prueba expirada?</strong>{" "}
              {sessionData.subscription?.isTrialExpired ? "Sí" : "No"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4  p-4 rounded">
        <h3 className="font-semibold mb-2">💡 Información</h3>
        <p className="text-sm text-blue-800">
          <strong>Estado actual:</strong>{" "}
          {sessionData.subscription?.isActive ? "Activa" : "Inactiva"} |
          <strong>Puede acceder:</strong>{" "}
          {sessionData.utils?.canAccessFullFeatures ? "Sí" : "No"}
        </p>
      </div>
    </div>
  );
};

export default DebugDates;
