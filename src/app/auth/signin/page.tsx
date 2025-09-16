"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginAuth } from "@/app/actions/auth/loginAuth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { isMaintenance } from "@/utils/mantenance";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Dirección de correo electrónico inválida.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
});

const SignIn = () => {
  const [viewPassword, setViewPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const res = await loginAuth(values);

      if (res.error && !res.success) {
        toast.error(res.message);
        form.reset();
        return;
      }

      // Si el login fue exitoso
      toast.success(res.message);
      form.reset();

      // Intentar redirigir, pero no mostrar error si falla
      try {
        redirect("/webapp");
      } catch (redirectError) {
        // El redirect puede fallar en desarrollo, pero el login fue exitoso
        console.log(
          "Redirect falló, pero el login fue exitoso:",
          redirectError
        );
        // Forzar navegación del lado del cliente como fallback
        window.location.href = "/webapp";
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isMaintenance) {
    return <Maintenance />;
  }

  return (
    <section className="w-full h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Iniciar sesión</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex items-center gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type={viewPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="outline"
                className="mt-5 cursor-pointer"
                size="icon"
                onClick={() => setViewPassword(!viewPassword)}
              >
                {viewPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-2 mt-4">
          <p className="text-sm text-gray-500">¿No tienes una cuenta?</p>
          <Link href="/auth/signup" className="text-sm text-primary">
            Registrarse
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
