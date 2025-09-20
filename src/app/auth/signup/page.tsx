"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
    phone: z.string().min(10, {
      message: "El número de teléfono debe tener al menos 10 caracteres.",
    }),
    country: z.string().min(1, {
      message: "Debes seleccionar un país.",
    }),
    preferredCurrency: z.string().min(1, {
      message: "Debes seleccionar una moneda.",
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
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
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

            <div className="flex items-start gap-4">
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
                          <SelectItem value="AR">Argentina</SelectItem>
                          <SelectItem value="BO">Bolivia</SelectItem>
                          <SelectItem value="BR">Brasil</SelectItem>
                          <SelectItem value="CL">Chile</SelectItem>
                          <SelectItem value="CO">Colombia</SelectItem>
                          <SelectItem value="CR">Costa Rica</SelectItem>
                          <SelectItem value="CU">Cuba</SelectItem>
                          <SelectItem value="DO">
                            República Dominicana
                          </SelectItem>
                          <SelectItem value="EC">Ecuador</SelectItem>
                          <SelectItem value="SV">El Salvador</SelectItem>
                          <SelectItem value="GT">Guatemala</SelectItem>
                          <SelectItem value="HN">Honduras</SelectItem>
                          <SelectItem value="MX">México</SelectItem>
                          <SelectItem value="NI">Nicaragua</SelectItem>
                          <SelectItem value="PA">Panamá</SelectItem>
                          <SelectItem value="PY">Paraguay</SelectItem>
                          <SelectItem value="PE">Perú</SelectItem>
                          <SelectItem value="PR">Puerto Rico</SelectItem>
                          <SelectItem value="UY">Uruguay</SelectItem>
                          <SelectItem value="VE">Venezuela</SelectItem>
                          <SelectItem value="ES">España</SelectItem>
                          <SelectItem value="US">Estados Unidos</SelectItem>
                          <SelectItem value="CA">Canadá</SelectItem>
                        </SelectContent>
                      </Select>
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ARS">
                          🇦🇷 Peso Argentino (ARS)
                        </SelectItem>
                        <SelectItem value="USD">
                          🇺🇸 Dólar Estadounidense (USD)
                        </SelectItem>
                        <SelectItem value="EUR">🇪🇺 Euro (EUR)</SelectItem>
                        <SelectItem value="BRL">
                          🇧🇷 Real Brasileño (BRL)
                        </SelectItem>
                        <SelectItem value="CLP">
                          🇨🇱 Peso Chileno (CLP)
                        </SelectItem>
                        <SelectItem value="COP">
                          🇨🇴 Peso Colombiano (COP)
                        </SelectItem>
                        <SelectItem value="MXN">
                          🇲🇽 Peso Mexicano (MXN)
                        </SelectItem>
                        <SelectItem value="PEN">
                          🇵🇪 Sol Peruano (PEN)
                        </SelectItem>
                        <SelectItem value="UYU">
                          🇺🇾 Peso Uruguayo (UYU)
                        </SelectItem>
                        <SelectItem value="VES">
                          🇻🇪 Bolívar Venezolano (VES)
                        </SelectItem>
                        <SelectItem value="CAD">
                          🇨🇦 Dólar Canadiense (CAD)
                        </SelectItem>
                        <SelectItem value="GBP">
                          🇬🇧 Libra Esterlina (GBP)
                        </SelectItem>
                        <SelectItem value="JPY">
                          🇯🇵 Yen Japonés (JPY)
                        </SelectItem>
                        <SelectItem value="CNY">🇨🇳 Yuan Chino (CNY)</SelectItem>
                        <SelectItem value="AUD">
                          🇦🇺 Dólar Australiano (AUD)
                        </SelectItem>
                        <SelectItem value="CHF">
                          🇨🇭 Franco Suizo (CHF)
                        </SelectItem>
                        <SelectItem value="SEK">
                          🇸🇪 Corona Sueca (SEK)
                        </SelectItem>
                        <SelectItem value="NOK">
                          🇳🇴 Corona Noruega (NOK)
                        </SelectItem>
                        <SelectItem value="DKK">
                          🇩🇰 Corona Danesa (DKK)
                        </SelectItem>
                        <SelectItem value="PLN">
                          🇵🇱 Zloty Polaco (PLN)
                        </SelectItem>
                        <SelectItem value="CZK">
                          🇨🇿 Corona Checa (CZK)
                        </SelectItem>
                        <SelectItem value="HUF">
                          🇭🇺 Forint Húngaro (HUF)
                        </SelectItem>
                        <SelectItem value="RUB">🇷🇺 Rublo Ruso (RUB)</SelectItem>
                        <SelectItem value="INR">
                          🇮🇳 Rupia India (INR)
                        </SelectItem>
                        <SelectItem value="KRW">
                          🇰🇷 Won Surcoreano (KRW)
                        </SelectItem>
                        <SelectItem value="SGD">
                          🇸🇬 Dólar de Singapur (SGD)
                        </SelectItem>
                        <SelectItem value="HKD">
                          🇭🇰 Dólar de Hong Kong (HKD)
                        </SelectItem>
                        <SelectItem value="NZD">
                          🇳🇿 Dólar Neozelandés (NZD)
                        </SelectItem>
                        <SelectItem value="ZAR">
                          🇿🇦 Rand Sudafricano (ZAR)
                        </SelectItem>
                        <SelectItem value="TRY">🇹🇷 Lira Turca (TRY)</SelectItem>
                        <SelectItem value="ILS">
                          🇮🇱 Shekel Israelí (ILS)
                        </SelectItem>
                        <SelectItem value="AED">
                          🇦🇪 Dirham de los Emiratos Árabes Unidos (AED)
                        </SelectItem>
                        <SelectItem value="SAR">
                          🇸🇦 Riyal Saudí (SAR)
                        </SelectItem>
                        <SelectItem value="QAR">
                          🇶🇦 Riyal Catarí (QAR)
                        </SelectItem>
                        <SelectItem value="KWD">
                          🇰🇼 Dinar Kuwaití (KWD)
                        </SelectItem>
                        <SelectItem value="BHD">
                          🇧🇭 Dinar Bahreiní (BHD)
                        </SelectItem>
                        <SelectItem value="OMR">🇴🇲 Rial Omaní (OMR)</SelectItem>
                        <SelectItem value="JOD">
                          🇯🇴 Dinar Jordaniano (JOD)
                        </SelectItem>
                        <SelectItem value="LBP">
                          🇱🇧 Libra Libanesa (LBP)
                        </SelectItem>
                        <SelectItem value="EGP">
                          🇪🇬 Libra Egipcia (EGP)
                        </SelectItem>
                        <SelectItem value="MAD">
                          🇲🇦 Dirham Marroquí (MAD)
                        </SelectItem>
                        <SelectItem value="TND">
                          🇹🇳 Dinar Tunecino (TND)
                        </SelectItem>
                        <SelectItem value="DZD">
                          🇩🇿 Dinar Argelino (DZD)
                        </SelectItem>
                        <SelectItem value="NGN">
                          🇳🇬 Naira Nigeriana (NGN)
                        </SelectItem>
                        <SelectItem value="KES">
                          🇰🇪 Chelín Keniano (KES)
                        </SelectItem>
                        <SelectItem value="UGX">
                          🇺🇬 Chelín Ugandés (UGX)
                        </SelectItem>
                        <SelectItem value="TZS">
                          🇹🇿 Chelín Tanzano (TZS)
                        </SelectItem>
                        <SelectItem value="ETB">
                          🇪🇹 Birr Etíope (ETB)
                        </SelectItem>
                        <SelectItem value="GHS">
                          🇬🇭 Cedi Ghanés (GHS)
                        </SelectItem>
                        <SelectItem value="XOF">
                          🇸🇳 Franco CFA de África Occidental (XOF)
                        </SelectItem>
                        <SelectItem value="XAF">
                          🇨🇲 Franco CFA de África Central (XAF)
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                {viewPasswordConfirm ? <EyeOff /> : <Eye />}
              </Button>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Registrando...
                </>
              ) : (
                "Registrarse"
              )}
            </Button>
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
