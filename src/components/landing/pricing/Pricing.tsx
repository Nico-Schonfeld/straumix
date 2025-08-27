"use client";
import { Badge } from "@/components/ui/badge";
import CustomLink from "@/components/ui/CustomLink";
import React from "react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">(
    "monthly"
  );
  const [isClient, setIsClient] = React.useState(false);
  const [expandedCards, setExpandedCards] = React.useState<Set<string>>(
    new Set()
  );

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleCardExpansion = (cardId: string) => {
    console.log(
      "Toggle card:",
      cardId,
      "Current expanded cards:",
      Array.from(expandedCards)
    );

    setExpandedCards((prevExpandedCards) => {
      const newExpandedCards = new Set(prevExpandedCards);

      // Si la card clickeada está expandida, contraer todas
      if (newExpandedCards.has(cardId)) {
        newExpandedCards.clear();
        console.log("Contrayendo todas las cards");
      } else {
        // Si la card clickeada no está expandida, expandir todas
        pricingPlans.forEach((plan) => {
          newExpandedCards.add(plan.id);
        });
        console.log("Expandiendo todas las cards");
      }

      console.log("New expanded cards:", Array.from(newExpandedCards));
      return newExpandedCards;
    });
  };

  const pricingPlans = [
    {
      id: "basic",
      name: "Persona",
      description:
        "Gestioná tus finanzas personales con la metodología 50/30/20",
      pricing: {
        monthly: 7000,
        yearly: 67200,
        yearlyOriginal: 84000,
      },
      currency: "ARS",
      features: [
        {
          text: "Metodología 50/30/20 personalizada",
          included: true,
          priority: "high",
        },
        {
          text: "Registro de gastos por categorías",
          included: true,
          priority: "high",
        },
        {
          text: "Dashboard con progreso visual",
          included: true,
          priority: "high",
        },
        { text: "Alertas de presupuesto", included: true, priority: "high" },
        {
          text: "Categorización inteligente",
          included: true,
          priority: "high",
        },
        {
          text: "Metas de ahorro personales",
          included: true,
          priority: "high",
        },
        {
          text: "Reportes mensuales básicos",
          included: true,
          priority: "medium",
        },
        { text: "1 usuario individual", included: true, priority: "medium" },
        {
          text: "Tips de educación financiera",
          included: false,
          priority: "low",
        },
        { text: "Gráficos avanzados", included: false, priority: "low" },
        {
          text: "Notificaciones personalizables",
          included: false,
          priority: "low",
        },
        { text: "Exportación de datos", included: false, priority: "low" },
      ],
      buttonText: "Comenzar gratis",
      buttonStyle:
        "w-full justify-center mt-auto bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground dark:bg-muted dark:hover:bg-primary dark:hover:text-primary-foreground transition-colors duration-200",
      cardStyle:
        "relative bg-card dark:bg-card rounded-2xl p-6 sm:p-8 border border-border dark:border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full shadow-sm",
      iconColor: "gray",
      isPopular: false,
      badge: null,
      highlight: "Perfecto para organizar tus finanzas personales",
    },
    {
      id: "couple",
      name: "Pareja",
      description:
        "Gestioná finanzas compartidas con tu pareja de forma transparente",
      pricing: {
        monthly: 15000,
        yearly: 144000,
        yearlyOriginal: 180000,
      },
      currency: "ARS",
      features: [
        { text: "Todo del plan Persona", included: true, priority: "high" },
        { text: "2 usuarios vinculados", included: true, priority: "high" },
        {
          text: "Metas de ahorro compartidas",
          included: true,
          priority: "high",
        },
        {
          text: "Transparencia financiera total",
          included: true,
          priority: "high",
        },
        {
          text: "División de responsabilidades",
          included: true,
          priority: "medium",
        },
        {
          text: "Sistema de notas y comentarios",
          included: true,
          priority: "medium",
        },
        { text: "Reportes compartidos", included: true, priority: "medium" },
        {
          text: "Alertas para ambos usuarios",
          included: true,
          priority: "medium",
        },
        { text: "Historial de cambios", included: true, priority: "low" },
        { text: "Gráficos comparativos", included: false, priority: "low" },
        { text: "Exportación avanzada", included: false, priority: "low" },
        { text: "Soporte prioritario", included: false, priority: "low" },
      ],
      buttonText: "Comenzar gratis",
      buttonStyle:
        "w-full justify-center mt-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm",
      cardStyle:
        "relative bg-card dark:bg-card rounded-2xl p-6 sm:p-8 border-2 border-primary shadow-xl flex flex-col h-full ring-2 ring-primary/20",
      iconColor: "primary",
      isPopular: true,
      badge: { text: "Más popular", variant: "default" },
      highlight: "Ideal para parejas que quieren crecer juntas financieramente",
    },
    {
      id: "organization",
      name: "Organización",
      description: "Control total para empresas, startups y equipos de trabajo",
      pricing: {
        monthly: 30000,
        yearly: 288000,
        yearlyOriginal: 360000,
      },
      currency: "ARS",
      features: [
        { text: "Todo del plan Pareja", included: true, priority: "high" },
        { text: "Usuarios ilimitados", included: true, priority: "high" },
        {
          text: "Gestión de roles y permisos",
          included: true,
          priority: "high",
        },
        { text: "Reportes por departamento", included: true, priority: "high" },
        {
          text: "Planificación presupuestaria",
          included: true,
          priority: "high",
        },
        {
          text: "Análisis de costos avanzado",
          included: true,
          priority: "medium",
        },
        { text: "Historial y auditorías", included: true, priority: "medium" },
        {
          text: "Exportación en Excel/PDF",
          included: true,
          priority: "medium",
        },
        { text: "API personalizada", included: true, priority: "low" },
        { text: "Soporte empresarial 24/7", included: true, priority: "low" },
        { text: "Integración bancaria", included: true, priority: "low" },
        { text: "Dashboard ejecutivo", included: true, priority: "low" },
      ],
      buttonText: "Contactar ventas",
      buttonStyle:
        "w-full justify-center mt-auto bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground dark:bg-muted dark:hover:bg-primary dark:hover:text-primary-foreground transition-colors duration-200",
      cardStyle:
        "relative bg-card dark:bg-card rounded-2xl p-6 sm:p-8 border border-border dark:border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full shadow-sm",
      iconColor: "gray",
      isPopular: false,
      badge: null,
      highlight:
        "Potencia el crecimiento de tu empresa con control financiero total",
    },
  ];

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      gray: {
        bg: "bg-muted",
        text: "text-muted-foreground",
        check: "text-primary",
      },
      primary: {
        bg: "bg-primary/20",
        text: "text-primary",
        check: "text-primary",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Pricing section */}
      <section
        className="w-full min-h-screen mt-[5rem] overflow-hidden"
        id="pricing"
      >
        <div className="w-full h-full container mx-auto flex items-center justify-center flex-col gap-12 sm:gap-16 lg:gap-20 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center flex flex-col items-center justify-center gap-4 sm:gap-6">
            <h2 className="text-2xl  lg:text-5xl font-medium items-center gap-2 flex-wrap text-center px-4 text-foreground dark:text-foreground">
              Planes adaptados a cada rol
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl">
              Gestioná tus finanzas con la metodología 50/30/20. Cada plan está
              diseñado para adaptarse a tus necesidades específicas, desde
              finanzas personales hasta gestión empresarial completa.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mt-6">
              <div className="relative bg-muted dark:bg-muted rounded-xl p-1 flex items-center border border-border">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    billingCycle === "monthly"
                      ? "text-primary-foreground bg-primary shadow-sm"
                      : "text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                  }`}
                >
                  Mensual
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    billingCycle === "yearly"
                      ? "text-primary-foreground bg-primary shadow-sm"
                      : "text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>Anual</span>
                    <Badge
                      variant="secondary"
                      className="bg-chart-3 text-chart-4 dark:bg-chart-3 dark:text-chart-4 font-semibold"
                    >
                      20% OFF
                    </Badge>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
            {pricingPlans.map((plan) => {
              const iconColors = getIconColorClasses(plan.iconColor);
              const isExpanded = expandedCards.has(plan.id);
              const highPriorityFeatures = plan.features.filter(
                (f) => f.priority === "high"
              );
              const mediumPriorityFeatures = plan.features.filter(
                (f) => f.priority === "medium"
              );
              const lowPriorityFeatures = plan.features.filter(
                (f) => f.priority === "low"
              );

              console.log(
                `Card ${plan.id}: isExpanded = ${isExpanded}, expandedCards =`,
                Array.from(expandedCards)
              );

              return (
                <div key={plan.id} className={plan.cardStyle}>
                  {/* Badge superior */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge
                        variant={plan.badge.variant as any}
                        className="text-xs font-semibold px-3 py-1"
                      >
                        {plan.badge.text}
                      </Badge>
                    </div>
                  )}

                  {/* Header de la card */}
                  <div className="text-left mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-card-foreground dark:text-card-foreground mb-3">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground dark:text-muted-foreground text-sm mb-4 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Highlight */}
                    <div className="bg-primary/10 dark:bg-primary/10 rounded-lg p-3 mb-4 border border-primary/20">
                      <p className="text-xs text-primary dark:text-primary font-medium">
                        ✨ {plan.highlight}
                      </p>
                    </div>

                    {/* Precio */}
                    <div className="mb-4">
                      {billingCycle === "monthly" ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-bold text-card-foreground dark:text-card-foreground">
                            ${plan.pricing.monthly.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground dark:text-muted-foreground text-sm">
                            {plan.currency}
                          </span>
                          <span className="text-muted-foreground dark:text-muted-foreground text-sm">
                            /mes
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-bold text-card-foreground dark:text-card-foreground">
                              ${plan.pricing.yearly.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground dark:text-muted-foreground text-xs">
                              {plan.currency}
                            </span>
                            <span className="text-muted-foreground dark:text-muted-foreground text-sm">
                              /año
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground line-through">
                              ${plan.pricing.yearlyOriginal.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground dark:text-muted-foreground text-xs">
                              {plan.currency}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              -20%
                            </Badge>{" "}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lista de características - Solo características de alta prioridad inicialmente */}
                  <div className="space-y-3 mb-6 flex-grow">
                    {highPriorityFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <div
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                          >
                            <svg
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${iconColors.check}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                        <span
                          className={`text-xs sm:text-sm leading-relaxed ${
                            feature.included
                              ? "text-card-foreground dark:text-card-foreground"
                              : "text-muted-foreground dark:text-muted-foreground"
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}

                    {/* Características expandibles */}
                    {isExpanded && (
                      <>
                        {/* Características de prioridad media */}
                        {mediumPriorityFeatures.length > 0 && (
                          <>
                            <div className="border-t border-border dark:border-border pt-3 mt-3">
                              <p className="text-xs text-muted-foreground dark:text-muted-foreground font-medium mb-2">
                                Características adicionales:
                              </p>
                            </div>
                            {mediumPriorityFeatures.map((feature, index) => (
                              <div
                                key={`medium-${index}`}
                                className="flex items-start gap-3"
                              >
                                {feature.included ? (
                                  <div
                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                                  >
                                    <svg
                                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${iconColors.check}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg
                                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <span
                                  className={`text-xs sm:text-sm leading-relaxed ${
                                    feature.included
                                      ? "text-card-foreground dark:text-card-foreground"
                                      : "text-muted-foreground dark:text-muted-foreground"
                                  }`}
                                >
                                  {feature.text}
                                </span>
                              </div>
                            ))}
                          </>
                        )}

                        {/* Características de prioridad baja */}
                        {lowPriorityFeatures.length > 0 && (
                          <>
                            <div className="border-t border-border dark:border-border pt-3 mt-3">
                              <p className="text-xs text-muted-foreground dark:text-muted-foreground font-medium mb-2">
                                Funcionalidades avanzadas:
                              </p>
                            </div>
                            {lowPriorityFeatures.map((feature, index) => (
                              <div
                                key={`low-${index}`}
                                className="flex items-start gap-3"
                              >
                                {feature.included ? (
                                  <div
                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                                  >
                                    <svg
                                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${iconColors.check}`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg
                                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <span
                                  className={`text-xs sm:text-sm leading-relaxed ${
                                    feature.included
                                      ? "text-card-foreground dark:text-card-foreground"
                                      : "text-muted-foreground dark:text-muted-foreground"
                                  }`}
                                >
                                  {feature.text}
                                </span>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {/* Botón de expandir/contraer */}
                  <div className="mb-4">
                    <button
                      onClick={() => toggleCardExpansion(plan.id)}
                      className="w-full text-center text-sm text-primary dark:text-primary hover:text-primary/80 dark:hover:text-primary/80 font-medium py-2 transition-colors duration-200 hover:bg-primary/10 dark:hover:bg-primary/10 rounded-lg"
                    >
                      {isExpanded
                        ? "Contraer todas las cards"
                        : `Ver todas las características`}
                    </button>
                  </div>

                  {/* Botón principal */}
                  <CustomLink
                    href="/auth/signup"
                    btn
                    className={plan.buttonStyle}
                  >
                    {plan.buttonText}
                  </CustomLink>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
