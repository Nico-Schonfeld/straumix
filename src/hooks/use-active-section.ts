"use client";

import { useEffect, useState } from "react";

// Función helper para obtener las propiedades de posición de una sección
const getSectionPosition = (section: Element) => {
  const rect = section.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return {
    top: rect.top + scrollTop,
    bottom: rect.bottom + scrollTop,
  };
};

// Función para verificar si una sección está visible en el viewport
const isSectionVisible = (section: Element, offset: number = 150) => {
  try {
    const position = getSectionPosition(section);
    const scrollPosition = window.scrollY + offset;

    return scrollPosition >= position.top && scrollPosition < position.bottom;
  } catch (error) {
    console.debug("Error al medir la sección:", error);
    return false;
  }
};

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const sections = [
          { id: "home", selector: "#home" },
          { id: "benefits", selector: "#benefits" },
          { id: "how-it-works", selector: "#how-it-works" },
          { id: "pricing", selector: "#pricing" },
          { id: "testimonials", selector: "#testimonials" },
          { id: "faq", selector: "#faq" },
        ];

        // Buscar la sección activa desde la última hacia la primera
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.querySelector(sections[i].selector);
          if (section && isSectionVisible(section)) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }, 10); // Debounce de 10ms para mejor rendimiento
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Llamar una vez al montar para establecer el estado inicial

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return { activeSection, setActiveSection };
};
