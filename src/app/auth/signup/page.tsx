"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { formSchema, FormSchemaType } from "@/utils/zod/registrerZod";
import { countryOptions, currencyOptions } from "@/utils/jsons/register.util";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

const SignUp = () => {
  const [viewPassword, setViewPassword] = React.useState(false);
  const [viewPasswordConfirm, setViewPasswordConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [step1, setStep1] = React.useState(true);
  const [step2, setStep2] = React.useState(false);
  const [step3, setStep3] = React.useState(false);

  const [onboardingStep1, setOnboardingStep1] = React.useState(true);
  const [onboardingStep2, setOnboardingStep2] = React.useState(false);
  const [onboardingStep3, setOnboardingStep3] = React.useState(false);
  const [onboardingIsActive, setOnboardingIsActive] = React.useState(true);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      country: "",
      preferredCurrency: "ARS",
      password: "",
      confirmPassword: "",
    },
  });

  // Función para validar campos del paso actual
  const validateCurrentStep = async () => {
    if (step1) {
      // Validar campos del paso 1
      const step1Fields = ["name", "lastName", "username"] as const;
      const isValid = await form.trigger(step1Fields);
      return isValid;
    }

    if (step2) {
      // Validar campos del paso 2
      const step2Fields = [
        "email",
        "country",
        "phone",
        "preferredCurrency",
      ] as const;
      const isValid = await form.trigger(step2Fields);
      return isValid;
    }

    if (step3) {
      // Validar campos del paso 3
      const step3Fields = ["password", "confirmPassword"] as const;
      const isValid = await form.trigger(step3Fields);
      return isValid;
    }

    return false;
  };

  // Función para avanzar al siguiente paso
  const nextStep = async () => {
    const isValid = await validateCurrentStep();

    if (!isValid) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    if (step1) {
      setStep1(false);
      setStep2(true);
    } else if (step2) {
      setStep2(false);
      setStep3(true);
    }
  };

  // Función para retroceder al paso anterior
  const prevStep = () => {
    if (step2) {
      setStep2(false);
      setStep1(true);
    } else if (step3) {
      setStep3(false);
      setStep2(true);
    }
  };

  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);

    try {
      const res = await registerAuth(values);

      if (res.error && !res.success) {
        toast.error(res.message);
        form.reset();
        return;
      }

      // Si el registro fue exitoso
      toast.success(res.message);
      form.reset();

      console.log(`RES: ${JSON.stringify(res, null, 2)}`);

      // Si requiere verificación, redirigir a página de verificación
      if (res.requiresVerification) {
        // Guardar userId en localStorage para la verificación
        localStorage.setItem(
          "pendingVerificationUserId",
          res.user.id.toString()
        );
        try {
          redirect(`/auth/verify?userId=${res.user.id}`);
        } catch (redirectError) {
          console.log("Redirect falló:", redirectError);
          window.location.href = `/auth/verify?userId=${res.user.id}`;
        }
      } else {
        // Si no requiere verificación, ir a webapp
        try {
          redirect("/webapp");
        } catch (redirectError) {
          console.log("Redirect falló:", redirectError);
          window.location.href = "/webapp";
        }
      }
    } catch (error) {
      toast.error("Error al registrar usuario");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isMaintenance) {
    return <Maintenance />;
  }

  const renderTitleOnboarding = () => {
    if (onboardingStep1)
      return " lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam";

    if (onboardingStep2)
      return " lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam";

    if (onboardingStep3)
      return " lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam";
  };

  // Onboarding
  if (onboardingIsActive) {
    return (
      <section className="w-full h-screen">
        <div className="w-full h-full flex flex-col items-center justify-start container mx-auto p-2 gap-4">
          <img
            src="/assets/img/placeholderImage.svg"
            alt="Registrarse"
            className="rounded-2xl object-cover w-full h-full"
          />

          {/* Indicador de progreso */}
          <div className="w-full flex items-center gap-2 mb-6">
            <Progress
              value={onboardingStep1 ? 100 : 0}
              className="w-full h-[0.3rem]"
            />
            <Progress
              value={onboardingStep2 ? 100 : 0}
              className="w-full h-[0.3rem]"
            />
            <Progress
              value={onboardingStep3 ? 100 : 0}
              className="w-full h-[0.3rem]"
            />
          </div>

          <div className="flex flex-col gap-8 w-full h-[40rem] items-start justify-center">
            <div className="flex items-start flex-col justify-center gap-2">
              <Badge variant="secondary">Lorem</Badge>

              <h1 className="text-2xl font-bold">{renderTitleOnboarding()}</h1>
            </div>

            <div className="flex items-center flex-col gap-2 w-full">
              {onboardingStep1 && (
                <Button
                  className="w-full"
                  onClick={() => (
                    setOnboardingStep1(false),
                    setOnboardingStep2(true)
                  )}
                >
                  Continuar 1
                </Button>
              )}

              {onboardingStep2 && (
                <Button
                  className="w-full"
                  onClick={() => (
                    setOnboardingStep2(false),
                    setOnboardingStep3(true)
                  )}
                >
                  Continuar 2
                </Button>
              )}

              {onboardingStep3 && (
                <Button
                  className="w-full"
                  onClick={() => setOnboardingIsActive(false)}
                >
                  Continuar
                </Button>
              )}

              <Link href="/">
                <Button className="w-full" variant="link">
                  Volver al inicio
                </Button>
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
        <h1 className="text-2xl font-bold my-4">Registrarse</h1>

        {/* Indicador de progreso */}
        <div className="w-full flex items-center gap-2 mb-6">
          <Progress value={100} className="w-full h-[0.3rem]" />
          <Progress
            value={step2 ? 100 : step3 ? 100 : 0}
            className="w-full h-[0.3rem]"
          />
          <Progress value={step3 ? 100 : 0} className="w-full h-[0.3rem]" />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            {step1 && (
              <>
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
              </>
            )}

            {step2 && (
              <>
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

                <div className="flex items-start gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccionar país" />
                            </SelectTrigger>
                            <SelectContent>
                              {countryOptions.map((country) => (
                                <SelectItem
                                  key={country.value}
                                  value={country.value}
                                >
                                  {country.icon} - {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 234 567 8900"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="preferredCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moneda Preferida</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencyOptions.map((currency) => (
                              <SelectItem
                                key={currency.value}
                                value={currency.value}
                              >
                                {currency.icon} - {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        La moneda preferida será usada para mostrar los montos
                        de los gastos y presupuestos.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step3 && (
              <>
                <div className="w-full flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={viewPassword ? "text" : "password"}
                              placeholder="Contraseña"
                              {...field}
                            />

                            <Button
                              type="button"
                              variant="link"
                              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                              size="icon"
                              onClick={() => setViewPassword(!viewPassword)}
                            >
                              {viewPassword ? <EyeOff /> : <Eye />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={viewPasswordConfirm ? "text" : "password"}
                              placeholder="Confirmar contraseña"
                              {...field}
                            />

                            <Button
                              type="button"
                              variant="link"
                              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                              size="icon"
                              onClick={() =>
                                setViewPasswordConfirm(!viewPasswordConfirm)
                              }
                            >
                              {viewPasswordConfirm ? <EyeOff /> : <Eye />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {/* Botones de navegación */}
            <div className="flex gap-2 mt-4">
              {step1 && (
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={nextStep}
                  className="flex-1"
                >
                  Continuar
                </Button>
              )}

              {step2 && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Anterior
                  </Button>
                  <Button
                    type="button"
                    disabled={isLoading}
                    onClick={nextStep}
                    className="flex-1"
                  >
                    Continuar
                  </Button>
                </>
              )}

              {step3 && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Anterior
                  </Button>
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Registrando...
                      </>
                    ) : (
                      "Registrarse"
                    )}
                  </Button>
                </>
              )}
            </div>
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
