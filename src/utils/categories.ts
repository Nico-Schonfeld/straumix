export interface Category {
  name: string;
  icon: string;
  color: string;
}

export const needsCategories: Category[] = [
  { name: "Supermercado", icon: "🛒", color: "#3B82F6" },
  { name: "Vivienda", icon: "🏠", color: "#10B981" },
  { name: "Servicios Públicos", icon: "⚡", color: "#F59E0B" },
  { name: "Transporte", icon: "🚗", color: "#8B5CF6" },
  { name: "Salud", icon: "🏥", color: "#EF4444" },
  { name: "Seguros", icon: "🛡️", color: "#06B6D4" },
  { name: "Educación", icon: "📚", color: "#84CC16" },
  { name: "Ropa Básica", icon: "👕", color: "#F97316" },
];

export const wantsCategories: Category[] = [
  { name: "Entretenimiento", icon: "🎬", color: "#EC4899" },
  { name: "Restaurantes", icon: "🍽️", color: "#F59E0B" },
  { name: "Ropa de Moda", icon: "👗", color: "#8B5CF6" },
  { name: "Viajes", icon: "✈️", color: "#06B6D4" },
  { name: "Hobbies", icon: "🎨", color: "#84CC16" },
  { name: "Tecnología", icon: "📱", color: "#3B82F6" },
  { name: "Deportes", icon: "⚽", color: "#10B981" },
  { name: "Regalos", icon: "🎁", color: "#EF4444" },
];

export const savingsCategories: Category[] = [
  { name: "Ahorro General", icon: "💰", color: "#10B981" },
  { name: "Fondo de Emergencia", icon: "🚨", color: "#F59E0B" },
  { name: "Inversiones", icon: "📈", color: "#3B82F6" },
  { name: "Jubilación", icon: "👴", color: "#8B5CF6" },
  { name: "Metas Específicas", icon: "🎯", color: "#EC4899" },
  { name: "Pago de Deudas", icon: "💳", color: "#EF4444" },
];

export const getAllCategories = () => {
  return [
    ...needsCategories.map((cat) => ({ ...cat, type: "needs" as const })),
    ...wantsCategories.map((cat) => ({ ...cat, type: "wants" as const })),
    ...savingsCategories.map((cat) => ({ ...cat, type: "savings" as const })),
  ];
};
