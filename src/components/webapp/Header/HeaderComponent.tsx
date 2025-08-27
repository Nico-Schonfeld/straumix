"use client";

import { Bell, GalleryVerticalEnd } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NotificationList } from "@/components/ui/notification-list";
import Link from "next/link";
import { TextEffect } from "@/components/ui/Text/TextEffect";

const HeaderComponent = () => {
  const [isOpenNotification, setIsOpenNotification] =
    React.useState<boolean>(false);
  const [trigger, setTrigger] = React.useState(false);
  // Simulación: zona horaria de Argentina
  const zonaHoraria = "America/Argentina/Buenos_Aires";

  function getSaludoPorZonaHoraria(timeZone: string) {
    const fecha = new Date();
    // Obtenemos la hora local de la zona horaria indicada
    const hora = Number(
      fecha.toLocaleString("en-US", {
        hour: "2-digit",
        hour12: false,
        timeZone,
      })
    );
    if (hora >= 5 && hora < 12) return "Buenos días";
    if (hora >= 12 && hora < 19) return "Buenas tardes";
    return "Buenas noches";
  }

  const notifications = [
    {
      id: 1,
      title: "Nuevo gasto registrado",
      subtitle: "Compra en supermercado: $150.00",
      time: "ahora mismo",
      count: 2,
    },
    {
      id: 2,
      title: "Presupuesto actualizado",
      subtitle: "Presupuesto mensual: $1,500.00",
      time: "hace 1m",
    },
    {
      id: 3,
      title: "Límite alcanzado",
      subtitle: "Categoría: Entretenimiento",
      time: "hace 5m",
    },
    {
      id: 4,
      title: "Recordatorio de pago",
      subtitle: "Factura pendiente: $250.00",
      time: "hace 10m",
    },
    {
      id: 5,
      title: "Meta de ahorro alcanzada",
      subtitle: "¡Felicitaciones! Has alcanzado tu meta",
      time: "hace 15m",
    },
    {
      id: 6,
      title: "Nuevo ingreso registrado",
      subtitle: "Depósito: $2,000.00",
      time: "hace 30m",
    },
    {
      id: 7,
      title: "Alerta de seguridad",
      subtitle: "Inicio de sesión desde nuevo dispositivo",
      time: "hace 45m",
    },
    {
      id: 8,
      title: "Reporte mensual disponible",
      subtitle: "Tu resumen de gastos está listo",
      time: "hace 1h",
    },
    {
      id: 9,
      title: "Gasto recurrente próximo",
      subtitle: "Suscripción mensual: $15.99",
      time: "hace 2h",
    },
    {
      id: 10,
      title: "Categoría modificada",
      subtitle: "Cambios en: Transporte",
      time: "hace 3h",
    },
    {
      id: 11,
      title: "Nuevo presupuesto creado",
      subtitle: "Categoría: Alimentación",
      time: "hace 4h",
    },
    {
      id: 12,
      title: "Transferencia exitosa",
      subtitle: "Enviado a cuenta de ahorros: $500.00",
      time: "hace 5h",
    },
    {
      id: 13,
      title: "Actualización de perfil",
      subtitle: "Datos actualizados correctamente",
      time: "hace 6h",
    },
    {
      id: 14,
      title: "Recordatorio de meta",
      subtitle: "Faltan $300 para tu objetivo",
      time: "hace 12h",
    },
    {
      id: 15,
      title: "Recomendación de ahorro",
      subtitle: "Tips para reducir gastos mensuales",
      time: "hace 24h",
    },
  ];

  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.01 },
      },
      exit: {
        transition: { staggerChildren: 0.01, staggerDirection: 1 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(10px) brightness(0%)",
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px) brightness(100%)",
        transition: {
          duration: 0.4,
        },
      },
      exit: {
        opacity: 0,
        y: -30,
        filter: "blur(10px) brightness(0%)",
        transition: {
          duration: 0.4,
        },
      },
    },
  };

  React.useEffect(() => {
    // Ejecutar la animación solo una vez al montar el componente
    const timer = setTimeout(() => {
      setTrigger(true);
    }, 500); // Pequeño delay para que se vea mejor

    // Después de 8 segundos, hacer desaparecer el texto
    const hideTimer = setTimeout(() => {
      setTrigger(false);
    }, 10500); // 500ms + 8000ms = 8500ms total

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <header className="w-full flex items-center justify-center fixed top-0 left-0 z-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b">
        <nav className="w-full flex items-center justify-between container mx-auto py-4 px-4">
          <div className="flex items-center gap-2">
            <Link href="/webapp">
              <GalleryVerticalEnd className="size-5" />
            </Link>

            <div className="flex flex-col items-start gap-0">
              <TextEffect
                className="inline-flex text-xs"
                per="char"
                variants={blurSlideVariants}
                trigger={trigger}
              >
                {getSaludoPorZonaHoraria(zonaHoraria)}
              </TextEffect>

              <TextEffect
                className="inline-flex font-bold text-xs"
                per="char"
                variants={blurSlideVariants}
                trigger={trigger}
              >
                Nico Schönfeld
              </TextEffect>
            </div>
          </div>

          <ul className="flex items-center gap-2">
            <li>
              <Bell
                className="w-4 h-4"
                onClick={() => setIsOpenNotification(!isOpenNotification)}
              />
            </li>
          </ul>
        </nav>
      </header>

      <AnimatePresence>
        {isOpenNotification && (
          <motion.div
            className="w-full h-screen bg-white/20 dark:bg-black/20 backdrop-blur-sm fixed top-0 left-0 z-50 flex items-start justify-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="md:-translate-x-[15rem] md:translate-y-0 md:absolute md:top-5 md:right-5"
            >
              <NotificationList
                setIsOpenNotification={setIsOpenNotification}
                notifications={notifications}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderComponent;
