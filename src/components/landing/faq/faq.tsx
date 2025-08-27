"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const faqData = [
  {
    id: "item-1",
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer:
      "Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. No hay penalizaciones por cancelación y tendrás acceso completo hasta el final del período facturado.",
  },
  {
    id: "item-2",
    question: "Straumix se conecta con mi banco?",
    answer:
      "No, Straumix no se conecta directamente con tu banco ni accede a tus cuentas bancarias. Vos tenés el control total de la información que ingresás manualmente, garantizando tu privacidad y seguridad financiera.",
  },
  {
    id: "item-3",
    question: "¿Puedo usarlo con mi pareja o equipo?",
    answer:
      "¡Por supuesto! Straumix está diseñado para colaboración. Podés invitar a tu pareja para gestionar finanzas compartidas con metas comunes, o crear equipos de trabajo con roles y permisos personalizados para tu organización.",
  },
  {
    id: "item-4",
    question: "¿Qué métodos de pago aceptan para la suscripción?",
    answer:
      "Actualmente aceptamos pagos a través de Mercado Pago, que incluye tarjetas de crédito, débito y otros métodos locales. Próximamente vamos a ofrecer más opciones de pago internacionales.",
  },
  {
    id: "item-5",
    question: "¿Ofrecen soporte técnico?",
    answer:
      "Sí, nuestro equipo de soporte está disponible para ayudarte a través de email y chat. También contamos con una base de conocimientos completa y tutoriales para ayudarte a aprovechar al máximo la metodología 50/30/20 en Straumix.",
  },
  {
    id: "item-7",
    question: "¿Cómo funciona la metodología 50/30/20?",
    answer:
      "La metodología 50/30/20 divide tus ingresos en tres categorías: 50% para necesidades básicas (alquiler, servicios, comida), 30% para deseos (entretenimiento, salidas), y 20% para ahorro e inversiones. Straumix te ayuda a visualizar y mantener este equilibrio automáticamente.",
  },
  {
    id: "item-8",
    question: "¿Hay período de prueba gratuito?",
    answer:
      "Sí, ofrecemos una prueba gratuita de 14 días para que puedas explorar todas las funcionalidades de Straumix sin compromiso. No necesitás ingresar datos de tarjeta para comenzar tu prueba.",
  },
];

const Faq = () => {
  return (
    <>
      {/* FAQ Section */}
      <section
        className="w-full h-auto mt-[4rem]  lg:mt-[8rem] overflow-hidden"
        id="faq"
      >
        <div className="w-full h-full container mx-auto flex items-center justify-center flex-col gap-20 px-4">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-semibold">
              Resolvemos tus dudas
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre Straumix
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="w-full max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className={`border-b border-gray-200/20 ${
                    index === faqData.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <AccordionTrigger className="text-left text-lg font-medium cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
