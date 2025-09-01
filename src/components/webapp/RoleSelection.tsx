"use client";

import React, { useState } from "react";
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
import { Info, User, Heart, Building2, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { updateUserRole } from "@/lib/actions/auth";

interface RoleSelectionProps {
  onComplete: () => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onComplete }) => {
  const { data: session } = useSession();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const roles = [
    {
      id: "TRIAL",
      title: "Cuenta de Prueba",
      description: "Acceso completo de prueba por 14 días",
      icon: User,
      features: [
        "Gestión de gastos personales",
        "Metodología 50/30/20",
        "Categorización de gastos",
        "Reportes básicos",
        "Notificaciones de presupuesto",
      ],
      price: "Gratis por 14 días",
    },
    {
      id: "PERSONA",
      title: "Individual",
      description: "Gestiona tus gastos personales de forma individual",
      icon: User,
      features: [
        "Gestión de gastos personales",
        "Metodología 50/30/20",
        "Categorización de gastos",
        "Reportes básicos",
        "Notificaciones de presupuesto",
      ],
      price: "Gratis por 14 días",
    },
    {
      id: "PAREJA",
      title: "Pareja",
      description: "Gestiona gastos compartidos con tu pareja",
      icon: Heart,
      features: [
        "Gestión de gastos compartidos",
        "Metas financieras comunes",
        "Transparencia financiera",
        "Reportes colaborativos",
        "Notificaciones para ambos",
      ],
      price: "Gratis por 14 días",
    },
    {
      id: "ORGANIZACION",
      title: "Organización",
      description: "Gestiona gastos empresariales y equipos",
      icon: Building2,
      features: [
        "Gestión de gastos empresariales",
        "Múltiples usuarios y roles",
        "Reportes avanzados",
        "Auditoría de gastos",
        "Exportación de datos",
      ],
      price: "Gratis por 14 días",
    },
  ];

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      setError("Por favor selecciona un rol");
      return;
    }

    if (!session?.user?.id) {
      setError("Error de sesión. Por favor inicia sesión nuevamente.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await updateUserRole(session.user.id, selectedRole);

      if (result.success) {
        onComplete();
      } else {
        setError(
          result.error ||
            "Error al configurar el rol. Por favor intenta nuevamente."
        );
      }
    } catch (error) {
      setError("Error al configurar el rol. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-blue-900">
            Selecciona tu tipo de cuenta
          </CardTitle>
          <CardDescription className="text-blue-700">
            Elige cómo quieres usar Straumix para gestionar tus finanzas
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Alert className="mb-6 border-blue-200 bg-blue-100/50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Prueba gratuita de 14 días:</strong> Todos los planes
              incluyen una prueba gratuita de 14 días. Puedes cambiar tu plan en
              cualquier momento.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => {
              const IconComponent = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                          isSelected ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${
                            isSelected ? "text-blue-600" : "text-gray-600"
                          }`}
                        />
                      </div>
                      <CardTitle
                        className={`text-lg ${
                          isSelected ? "text-blue-900" : "text-gray-900"
                        }`}
                      >
                        {role.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {role.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-900">
                          {role.price}
                        </div>
                        <ul className="space-y-2">
                          {role.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4"
                        >
                          <div className="w-full h-1 bg-blue-500 rounded-full"></div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-100/50 mb-6">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleRoleSelection}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSubmitting || !selectedRole}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Configurando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Continuar con{" "}
                {selectedRole
                  ? roles.find((r) => r.id === selectedRole)?.title
                  : "rol seleccionado"}
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoleSelection;
