"use client";

import React, { Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import {
  verifyOTPCode,
  resendVerificationCode,
} from "@/app/actions/auth/verificationActions";
import { toast } from "sonner";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { isMaintenance } from "@/utils/mantenance";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  code: z.string().length(6, {
    message: "El código debe tener 6 dígitos.",
  }),
});

const VerifyAccountContent = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const [userId, setUserId] = React.useState<number | null>(null);
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  React.useEffect(() => {
    // Obtener userId de los parámetros de URL o localStorage
    const urlUserId = searchParams.get("userId");
    const storedUserId = localStorage.getItem("pendingVerificationUserId");

    if (urlUserId) {
      setUserId(parseInt(urlUserId));
      localStorage.setItem("pendingVerificationUserId", urlUserId);
    } else if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, [searchParams]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) {
      toast.error("Error: No se encontró información del usuario");
      return;
    }

    setIsLoading(true);

    try {
      const res = await verifyOTPCode(
        userId,
        values.code,
        "email_verification"
      );

      if (res.error && !res.success) {
        toast.error(res.message);
        form.reset();
        return;
      }

      // Si la verificación fue exitosa
      toast.success("¡Cuenta verificada correctamente!");
      form.reset();

      // Limpiar localStorage
      localStorage.removeItem("pendingVerificationUserId");

      // Redirigir al login
      try {
        redirect("/auth/signin?verified=true");
      } catch (redirectError) {
        console.log("Redirect falló:", redirectError);
        window.location.href = "/auth/signin?verified=true";
      }
    } catch (error) {
      toast.error("Error al verificar la cuenta");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendCode = async () => {
    if (!userId) {
      toast.error("Error: No se encontró información del usuario");
      return;
    }

    setIsResending(true);

    try {
      const res = await resendVerificationCode(userId);

      if (res.error && !res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Código de verificación reenviado");
    } catch (error) {
      toast.error("Error al reenviar código");
      console.error("Error:", error);
    } finally {
      setIsResending(false);
    }
  };

  if (!userId) {
    return (
      <section className="w-full h-screen">
        <div className="w-full h-full flex flex-col items-center justify-center container mx-auto px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-2xl font-bold mb-4">Verificación de cuenta</h1>
            <p className="text-gray-600 mb-6">
              Para verificar tu cuenta, necesitas el código que te enviamos por
              email.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>¿No recibiste el email?</strong>
                <br />
                Revisa tu carpeta de spam o solicita un nuevo código.
              </p>
            </div>
            <div className="space-y-3">
              <Link
                href="/auth/signup"
                className="block w-full bg-primary text-white py-2 px-4 rounded-md text-center hover:bg-primary/90 transition-colors"
              >
                Volver al registro
              </Link>
              <Link
                href="/auth/signin"
                className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-center hover:bg-gray-50 transition-colors"
              >
                Ya tengo una cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center container mx-auto px-4">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/auth/signup">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Verificar cuenta</h1>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl mb-4">📧</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Código enviado a tu email
            </h2>
            <p className="text-gray-600 mb-2">
              Hemos enviado un código de verificación de 6 dígitos a tu email.
            </p>
            <p className="text-sm text-gray-500">
              El código expirará en <strong>1 hora</strong>.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
              <p className="text-yellow-800 text-sm">
                <strong>💡 Tip:</strong> También puedes hacer clic en el enlace
                del email para ir directamente a esta página.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel>Código de verificación</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        className="justify-center"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verificando...
                  </>
                ) : (
                  "Verificar cuenta"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">
              ¿No recibiste el código?
            </p>
            <Button
              variant="outline"
              onClick={handleResendCode}
              disabled={isResending}
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Reenviando...
                </>
              ) : (
                "Reenviar código"
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 mt-6 justify-center">
            <p className="text-sm text-gray-500">¿Ya tienes una cuenta?</p>
            <Link href="/auth/signin" className="text-sm text-primary">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const VerifyAccount = () => {
  if (isMaintenance) {
    return <Maintenance />;
  }

  return (
    <Suspense
      fallback={
        <section className="w-full h-screen">
          <div className="w-full h-full flex flex-col items-center justify-center container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <div>Cargando...</div>
            </div>
          </div>
        </section>
      }
    >
      <VerifyAccountContent />
    </Suspense>
  );
};

export default VerifyAccount;
