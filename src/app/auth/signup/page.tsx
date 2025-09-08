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
import { registerAuth } from "@/app/actions/auth/registerAuth";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { isMaintenance } from "@/utils/mantenance";
import { redirect } from "next/navigation";
// import { Label } from "@/components/ui/label";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    lastName: z.string().min(2, {
      message: "El apellido debe tener al menos 2 caracteres.",
    }),
    username: z
      .string()
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres.",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "El nombre de usuario solo puede contener letras, números y guiones bajos.",
      }),
    email: z.string().email({
      message: "Dirección de correo electrónico inválida.",
    }),
    password: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
      message:
        "La confirmación de contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const [viewPassword, setViewPassword] = React.useState(false);
  const [viewPasswordConfirm, setViewPasswordConfirm] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await registerAuth(values);

    if (res.error && !res.success) {
      toast.error(res.message);
      form.reset();
      return;
    }

    toast.success(res.message);
    form.reset();
    redirect("/webapp");
    return;
  }

  if (isMaintenance) {
    return <Maintenance />;
  }

  return (
    <section className="w-full h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Registrarse</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="nombre_usuario" {...field} />
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
                {viewPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>

            <div className="w-full flex items-center gap-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type={viewPasswordConfirm ? "text" : "password"}
                        placeholder="Confirmar contraseña"
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
                onClick={() => setViewPasswordConfirm(!viewPasswordConfirm)}
              >
                {viewPasswordConfirm ? <Eye /> : <EyeOff />}
              </Button>
            </div>

            <Button type="submit">Registrarse</Button>
          </form>
        </Form>

        <div className="flex items-center gap-2 mt-4">
          <p className="text-sm text-gray-500">¿Ya tienes una cuenta?</p>
          <Link href="/auth/signin" className="text-sm text-primary">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
