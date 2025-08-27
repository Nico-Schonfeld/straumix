"use client";
import { cn } from "@/lib/utils";
import { motion, SpringOptions, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
  // Nuevas opciones para formato de moneda
  currency?: string;
  locale?: string;
  showCurrency?: boolean;
  decimals?: number;
  // Opciones de formato
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
  currency = "USD",
  locale = "es-ES",
  showCurrency = false,
  decimals = 2,
  minimumFractionDigits,
  maximumFractionDigits,
}: AnimatedNumberProps) {
  // @ts-expect-error dynamic component
  const MotionComponent = motion.create(as as keyof JSX.IntrinsicElements);

  const spring = useSpring(value, springOptions);

  const display = useTransform(spring, (current) => {
    // Determinar los decimales basado en la prop decimals
    const minDecimals = minimumFractionDigits ?? decimals;
    const maxDecimals = maximumFractionDigits ?? decimals;

    // Crear el formateador de números
    const formatter = new Intl.NumberFormat(locale, {
      style: showCurrency ? "currency" : "decimal",
      currency: showCurrency ? currency : undefined,
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals,
    });

    // Si no queremos mostrar moneda, usar formato decimal
    if (!showCurrency) {
      return formatter.format(current);
    }

    // Para moneda, usar el formateador completo
    return formatter.format(current);
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    // @ts-expect-error dynamic component
    <MotionComponent className={cn("tabular-nums", className)}>
      {display}
    </MotionComponent>
  );
}
