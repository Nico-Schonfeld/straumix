"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

const AuthErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return "No tienes permisos para acceder con esta cuenta de Google.";
      case "Configuration":
        return "Error de configuración del servidor. Contacta al administrador.";
      case "Verification":
        return "Error de verificación. Intenta nuevamente.";
      default:
        return "Ocurrió un error inesperado durante la autenticación.";
    }
  };

  const getErrorDescription = (error: string | null) => {
    switch (error) {
      case "AccessDenied":
        return "Tu cuenta de Google no está autorizada para acceder a Straumix. Esto puede deberse a restricciones de dominio o configuración de OAuth.";
      case "Configuration":
        return "Hay un problema con la configuración del servidor de autenticación.";
      case "Verification":
        return "El proceso de verificación falló. Esto puede ser temporal.";
      default:
        return "Algo salió mal durante el proceso de autenticación.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-900">
            Error de Autenticación
          </CardTitle>
          <CardDescription className="text-red-700">
            {getErrorMessage(error)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-red-800">{getErrorDescription(error)}</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => (window.location.href = "/auth/signup")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Intentar nuevamente
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="w-full"
            >
              Volver al inicio
            </Button>
          </div>

          {error === "AccessDenied" && (
            <div className="text-center">
              <p className="text-xs text-gray-600">
                Si el problema persiste, contacta al soporte técnico.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthErrorPage;
