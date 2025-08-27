import { SpotlightBorder } from "@/components/ui/spotlight-border";
import { Bell, GraduationCap, Search, Target, Users } from "lucide-react";
import React from "react";

const Benefits = () => {
  const benefitsData = [
    {
      id: 1,
      title: "Claridad Total",
      description: "Visualizá tus gastos por tipo y categoría con dashboards intuitivos y reportes detallados en tiempo real.",
      icon: Search,
      borderColor: "#E1EACD",
      backgroundColor: "#E1EACD20",
      iconColor: "#E1EACD"
    },
    {
      id: 2,
      title: "Colaboración Real",
      description: "Compartí cuentas con tu pareja o equipo de forma segura y colaborativa para gestionar finanzas en conjunto.",
      icon: Users,
      borderColor: "#BAD8B6",
      backgroundColor: "#BAD8B620",
      iconColor: "#BAD8B6"
    },
    {
      id: 3,
      title: "Metas Alcanzables",
      description: "Establecé objetivos de ahorro específicos y seguí tu progreso paso a paso con indicadores visuales claros.",
      icon: Target,
      borderColor: "#61B390",
      backgroundColor: "#61B39020",
      iconColor: "#61B390"
    },
    {
      id: 4,
      title: "Alertas Inteligentes",
      description: "Recibí notificaciones cuando te acercás a tus límites de gasto y presupuesto para mantener el control total.",
      icon: Bell,
      borderColor: "#E1EACD",
      backgroundColor: "#E1EACD20",
      iconColor: "#E1EACD"
    },
    {
      id: 5,
      title: "Educación Financiera",
      description: "Accedé a tips, recursos y herramientas para mejorar tus decisiones financieras y construir un futuro sólido.",
      icon: GraduationCap,
      borderColor: "#BAD8B6",
      backgroundColor: "#BAD8B620",
      iconColor: "#BAD8B6"
    },
    {
      id: 6,
      title: "Multiplataforma",
      description: "Accedé desde cualquier dispositivo, siempre sincronizado en tiempo real.",
      icon: null,
      borderColor: "#61B390",
      backgroundColor: "#61B39020",
      iconColor: "#61B390",
      customIcon: (
        <svg
          className="w-6 h-6"
          style={{ color: "#61B390" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Benefits Section */}
      <section
        className="w-full min-h-screen mt-[2rem] lg:mt-[8rem] overflow-hidden"
        id="benefits"
      >
        <div className="w-full h-full container mx-auto flex items-center justify-center flex-col gap-20 px-4">
          <div className="flex flex-col gap-10 items-center">
            <h2 className="lg:text-5xl text-2xl font-medium items-center gap-2 flex-wrap text-center">
              ¿Por qué elegir Straumix?
            </h2>
            <p className="text-center text-gray-400 max-w-2xl">
              En un mundo donde el dinero se mueve rápido, Straumix te ayuda a
              mantener el control desde el núcleo de tus decisiones financieras.
              Visualizá tus ingresos, organizá tus gastos y alcanzá tus metas
              con una interfaz clara y herramientas colaborativas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {benefitsData.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  className="relative h-[280px] overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30"
                >
                  <SpotlightBorder size={504} borderColor={benefit.borderColor} />
                  <div className="relative h-full w-full rounded-2xl bg-white dark:bg-black p-6 flex flex-col justify-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: benefit.backgroundColor }}
                    >
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6" style={{ color: benefit.iconColor }} />
                      ) : (
                        benefit.customIcon
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Benefits;
