import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Limpiar la base de datos antes de sembrar
  await cleanup();

  // Crear categorías por defecto para cada tipo de gasto
  await createDefaultCategories();

  console.log("✅ Seed completado exitosamente!");
}

async function cleanup() {
  console.log("🧹 Limpiando base de datos...");

  // Eliminar en orden para evitar conflictos de foreign keys
  await prisma.userSubscription.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.category.deleteMany();
  await prisma.accountUserRole.deleteMany();
  await prisma.account.deleteMany();
}

async function createDefaultCategories() {
  console.log("📂 Creando categorías por defecto...");

  // Categorías para necesidades (50%)
  const needsCategories = [
    { name: "Supermercado", icon: "🛒", color: "#3B82F6" },
    { name: "Vivienda", icon: "🏠", color: "#10B981" },
    { name: "Servicios Públicos", icon: "⚡", color: "#F59E0B" },
    { name: "Transporte", icon: "🚗", color: "#8B5CF6" },
    { name: "Salud", icon: "🏥", color: "#EF4444" },
    { name: "Seguros", icon: "🛡️", color: "#06B6D4" },
    { name: "Educación", icon: "📚", color: "#84CC16" },
    { name: "Ropa Básica", icon: "👕", color: "#F97316" },
  ];

  // Categorías para deseos (30%)
  const wantsCategories = [
    { name: "Entretenimiento", icon: "🎬", color: "#EC4899" },
    { name: "Restaurantes", icon: "🍽️", color: "#F59E0B" },
    { name: "Ropa de Moda", icon: "👗", color: "#8B5CF6" },
    { name: "Viajes", icon: "✈️", color: "#06B6D4" },
    { name: "Hobbies", icon: "🎨", color: "#84CC16" },
    { name: "Tecnología", icon: "📱", color: "#3B82F6" },
    { name: "Deportes", icon: "⚽", color: "#10B981" },
    { name: "Regalos", icon: "🎁", color: "#EF4444" },
  ];

  // Categorías para ahorros (20%)
  const savingsCategories = [
    { name: "Ahorro General", icon: "💰", color: "#10B981" },
    { name: "Fondo de Emergencia", icon: "🚨", color: "#F59E0B" },
    { name: "Inversiones", icon: "📈", color: "#3B82F6" },
    { name: "Jubilación", icon: "👴", color: "#8B5CF6" },
    { name: "Metas Específicas", icon: "🎯", color: "#EC4899" },
    { name: "Pago de Deudas", icon: "💳", color: "#EF4444" },
  ];

  console.log("✅ Categorías");
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
