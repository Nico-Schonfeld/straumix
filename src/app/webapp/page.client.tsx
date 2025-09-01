"use client";

import React from "react";
import { useSessionData } from "@/hooks/use-session-data";
import SubscriptionExpired from "@/components/webapp/SubscriptionExpired";
import DebugDates from "@/components/debug/DebugDates";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import AccountSetup from "@/components/webapp/AccountSetup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { updateUserRoleWithRelations } from "@/lib/actions/auth";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const WebAppPageClient = () => {
  const sessionData = useSessionData();
  const loading = sessionData.isLoading;
  const sessionExpired =
    sessionData.subscription && sessionData.utils.isExpiredOrTrialExpired;

  const router = useRouter();

  const [selectedRole, setSelectedRole] = React.useState<string>("");

  const handleUpdateRoleAccount = async (formData: FormData) => {
    const newRole = formData.get("role") as string;
    const UpperNewRole = newRole.toUpperCase();
    toast.info("Configurando cuenta... " + newRole);

    if (UpperNewRole === "COUPLE") {
      const accountName = formData.get("accountName") as string;
      const partnerEmail = formData.get("partnerEmail") as string;
      const partnerFirstName = formData.get("partnerFirstName") as string;
      const partnerLastName = formData.get("partnerLastName") as string;
      const partnerProfileImage = formData.get("partnerProfileImage") as string;

      const objectToUpdate = {
        userId: sessionData.user.id as string,
        newRole: "COUPLE",
        partnerEmail,
        accountName,
        partnerFirstName,
        partnerLastName,
        partnerProfileImage,
      };

      const result = await updateUserRoleWithRelations(objectToUpdate);
      if (result.success) {
        toast.success("Cuenta de pareja configurada correctamente");
        //router.refresh();
        location.reload();
      }
    } else if (UpperNewRole === "ORGANIZATION") {
      const organizationName = formData.get("organizationName") as string;
      const organizationType = formData.get("organizationType") as string;
      const organizationSize = formData.get("organizationSize") as string;
      const organizationDescription = formData.get(
        "organizationDescription"
      ) as string;

      const objectToUpdate = {
        userId: sessionData.user.id as string,
        newRole: "ORGANIZATION",
        organizationName,
        organizationType,
        organizationSize,
        organizationDescription,
      };

      const result = await updateUserRoleWithRelations(objectToUpdate);
      if (result.success) {
        toast.success("Cuenta organizacional configurada correctamente");
        //router.refresh();
        location.reload();
      }
    } else if (UpperNewRole === "PERSONAL") {
      const objectToUpdate = {
        userId: sessionData.user.id as string,
        newRole: "PERSONAL",
      };

      toast.info("Configurando cuenta personal...");

      const result = await updateUserRoleWithRelations(objectToUpdate);
      if (result.success) {
        toast.success("Cuenta personal configurada correctamente");
        // router.refresh();

        location.reload();
      }
    }
  };

  return (
    <section className="min-h-screen p-6">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {sessionData.user.role === "PERSONAL" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h1 className="text-2xl font-bold">Configura tu cuenta</h1>
              <p className="text-gray-600">
                Elige el tipo de cuenta que mejor se adapte a tus necesidades
              </p>

              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo de cuenta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="couple">Pareja</SelectItem>
                  <SelectItem value="organization">Organización</SelectItem>
                </SelectContent>
              </Select>

              {selectedRole === "personal" && (
                <form
                  className="space-y-4 p-4 border rounded-lg"
                  action={handleUpdateRoleAccount}
                >
                  <input type="hidden" name="role" value="personal" />
                  <div>
                    <h3 className="font-semibold mb-2">Cuenta Personal</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Ideal para gestionar tus finanzas personales de forma
                      individual
                    </p>
                  </div>
                  <Button type="submit" className="w-full">
                    Configurar cuenta personal
                  </Button>
                </form>
              )}

              {selectedRole === "couple" && (
                <form
                  className="space-y-4 p-4 border rounded-lg"
                  action={handleUpdateRoleAccount}
                >
                  <input type="hidden" name="role" value="couple" />
                  <div>
                    <h3 className="font-semibold mb-2">Cuenta de Pareja</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Comparte y gestiona las finanzas con tu pareja
                    </p>
                  </div>

                  <Label htmlFor="accountName">
                    Nombre de la cuenta compartida
                    <Input
                      type="text"
                      placeholder="Cuenta de Juan y María"
                      id="accountName"
                      name="accountName"
                      required
                    />
                  </Label>

                  <Label htmlFor="partnerEmail">
                    Correo de tu pareja
                    <Input
                      type="email"
                      placeholder="maria@ejemplo.com"
                      id="partnerEmail"
                      name="partnerEmail"
                      required
                    />
                    <span className="text-sm text-gray-500">
                      Tu pareja recibirá un correo para unirse a la cuenta
                    </span>
                  </Label>

                  <Label htmlFor="partnerFirstName">
                    Nombre de tu pareja
                    <Input
                      type="text"
                      placeholder="María"
                      id="partnerFirstName"
                      name="partnerFirstName"
                    />
                  </Label>

                  <Label htmlFor="partnerLastName">
                    Apellido de tu pareja
                    <Input
                      type="text"
                      placeholder="García"
                      id="partnerLastName"
                      name="partnerLastName"
                    />
                  </Label>

                  <Button type="submit" className="w-full">
                    Configurar cuenta de pareja
                  </Button>
                </form>
              )}

              {selectedRole === "organization" && (
                <form
                  className="space-y-4 p-4 border rounded-lg"
                  action={handleUpdateRoleAccount}
                >
                  <input type="hidden" name="role" value="organization" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      Cuenta Organizacional
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Gestiona las finanzas de tu empresa u organización
                    </p>
                  </div>

                  <Label htmlFor="organizationName">
                    Nombre de la organización
                    <Input
                      type="text"
                      placeholder="Mi Empresa S.A."
                      id="organizationName"
                      name="organizationName"
                      required
                    />
                  </Label>

                  <Label htmlFor="organizationType">
                    Tipo de organización
                    <Select name="organizationType">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STARTUP">
                          Startup/Emprendimiento
                        </SelectItem>
                        <SelectItem value="SMALL_BUSINESS">
                          Pequeña empresa
                        </SelectItem>
                        <SelectItem value="MEDIUM_BUSINESS">
                          Empresa mediana
                        </SelectItem>
                        <SelectItem value="CORPORATION">
                          Corporación grande
                        </SelectItem>
                        <SelectItem value="NON_PROFIT">
                          Organización sin fines de lucro
                        </SelectItem>
                        <SelectItem value="FREELANCE">
                          Freelancer/Independiente
                        </SelectItem>
                        <SelectItem value="OTHER">Otro tipo</SelectItem>
                      </SelectContent>
                    </Select>
                  </Label>

                  <Label htmlFor="organizationSize">
                    Tamaño de la organización
                    <Select name="organizationSize">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tamaño" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SOLO">1 persona</SelectItem>
                        <SelectItem value="SMALL">2-10 personas</SelectItem>
                        <SelectItem value="MEDIUM">11-50 personas</SelectItem>
                        <SelectItem value="LARGE">51-200 personas</SelectItem>
                        <SelectItem value="ENTERPRISE">
                          200+ personas
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Label>

                  <Label htmlFor="organizationDescription">
                    Descripción (opcional)
                    <Textarea
                      placeholder="Describe brevemente tu organización..."
                      id="organizationDescription"
                      name="organizationDescription"
                    />
                  </Label>

                  <Button type="submit" className="w-full">
                    Configurar cuenta organizacional
                  </Button>
                </form>
              )}
            </div>
          )}

          {sessionExpired ? (
            <>
              <SubscriptionExpired />
              <Button onClick={() => signOut()}>Cerrar sesión</Button>
            </>
          ) : (
            <>
              <DebugDates />
              <Button onClick={() => signOut()}>Cerrar sesión</Button>
              <pre>{JSON.stringify(sessionData, null, 2)}</pre>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default WebAppPageClient;
