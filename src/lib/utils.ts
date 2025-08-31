import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Función para convertir objetos Decimal de Prisma a números
export function convertDecimalToNumber(value: any): number {
  if (value === null || value === undefined) return 0;

  // Si es un objeto Decimal de Prisma
  if (typeof value === "object" && value !== null && "toNumber" in value) {
    return value.toNumber();
  }

  // Si ya es un número
  if (typeof value === "number") return value;

  // Si es un string, intentar convertirlo
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

// Función para convertir un objeto completo, convirtiendo todos los campos Decimal
export function convertPrismaObject<T extends Record<string, any>>(obj: T): T {
  const converted = { ...obj } as any;

  for (const [key, value] of Object.entries(converted)) {
    if (value !== null && typeof value === "object") {
      if ("toNumber" in value && typeof value === "object" && value !== null) {
        // Es un objeto Decimal
        converted[key] = (value as any).toNumber();
      } else if (Array.isArray(value)) {
        // Es un array, convertir cada elemento
        converted[key] = value.map((item) =>
          typeof item === "object" && item !== null
            ? convertPrismaObject(item)
            : item
        );
      } else {
        // Es un objeto normal, convertir recursivamente
        converted[key] = convertPrismaObject(value);
      }
    }
  }

  return converted as T;
}
