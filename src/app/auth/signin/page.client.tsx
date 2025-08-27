"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Inicia sesión en tu cuenta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Ingresa tu correo electrónico para iniciar sesión en tu cuenta
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="m@ejemplo.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              required
            />

            {showPassword ? (
              <EyeOff
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer w-4 h-4"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer w-4 h-4"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Iniciar sesión
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        ¿No tienes una cuenta?{" "}
        <Link href="/auth/signup" className="underline underline-offset-4">
          Regístrate
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
