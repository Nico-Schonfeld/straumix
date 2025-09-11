"use client";

import React from "react";
import { logoutAuth } from "@/app/actions/auth/loginAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserSessionType } from "@/types/user/user";
import { LogOut } from "lucide-react";
import { deleteAccountUser } from "@/app/actions/auth/accountUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const ProfileClient = ({ session }: { session: UserSessionType }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [confirmText, setConfirmText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const res = await deleteAccountUser(session.user.id);

      if (res.error && !res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(
        "✅ Cuenta eliminada exitosamente. Todos los datos han sido borrados permanentemente."
      );
      await logoutAuth();
      router.push("/auth/signin");
    } catch (error) {
      toast.error("Error al eliminar la cuenta");
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const expectedText = `straumix-${session.user.username}`;
  const isConfirmTextValid = confirmText === expectedText;

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={session.user.avatar} />
          <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0">
          <h3 className="text-lg font-bold">@{session.user.username}</h3>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>

      <div className="flex items-center flex-col gap-2 w-full">
        <Button
          onClick={() => logoutAuth()}
          className="w-[20rem] cursor-pointer"
          variant={"outline"}
        >
          <LogOut /> Logout
        </Button>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="destructive" className="w-[20rem] cursor-pointer">
              🗑️ Eliminar Cuenta Permanentemente
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full min-h-[50%]">
            <div className="mx-auto max-w-2xl w-full">
              <DrawerHeader>
                <DrawerTitle>
                  {step === 1
                    ? "⚠️ Eliminación Permanente de Cuenta"
                    : "🔒 Confirmación Final"}
                </DrawerTitle>
                <DrawerDescription asChild>
                  {step === 1 ? (
                    <div className="space-y-3">
                      <div className="text-red-600 font-semibold">
                        ⚠️ Esta acción es IRREVERSIBLE y eliminará
                        PERMANENTEMENTE:
                      </div>
                      <div className="space-y-1 text-sm">
                        <div>• Tu cuenta de usuario</div>
                        <div>• Todos tus gastos registrados</div>
                        <div>• Tus configuraciones de presupuesto</div>
                        <div>• Tu historial mensual completo</div>
                        <div>• Todos los datos financieros asociados</div>
                      </div>
                      <div className="text-red-600 font-semibold">
                        🚨 NO podrás recuperar esta información una vez
                        eliminada.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-red-600 font-semibold">
                        Última oportunidad para cancelar
                      </div>
                      <div>
                        Para confirmar la eliminación permanente, escribe
                        exactamente:
                      </div>
                      <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                        straumix-{session.user.username}
                      </div>
                    </div>
                  )}
                </DrawerDescription>
                {step === 2 && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="straumix-username"
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                )}
              </DrawerHeader>
              <DrawerFooter className="flex flex-row gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setConfirmText("");
                    setOpen(false);
                  }}
                  disabled={isDeleting}
                >
                  ✅ Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (step === 1) {
                      setStep(2);
                    } else if (isConfirmTextValid) {
                      handleDeleteAccount();
                      setOpen(false);
                    } else {
                      toast.error(
                        "El texto de confirmación no coincide exactamente"
                      );
                    }
                  }}
                  disabled={(step === 2 && !isConfirmTextValid) || isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Eliminando...
                    </>
                  ) : step === 1 ? (
                    "⚠️ Continuar"
                  ) : (
                    "🗑️ Eliminar Permanentemente"
                  )}
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
};

export default ProfileClient;
