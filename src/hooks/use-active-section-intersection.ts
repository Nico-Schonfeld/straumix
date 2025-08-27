"use client";

import { useEffect, useState } from "react";

export const useActiveSectionIntersection = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = [
      { id: "home", selector: "#home" },
      { id: "benefits", selector: "#benefits" },
      { id: "how-it-works", selector: "#how-it-works" },
      { id: "pricing", selector: "#pricing" },
      { id: "testimonials", selector: "#testimonials" },
      { id: "faq", selector: "#faq" },
    ];

    // Crear un IntersectionObserver para cada sección
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id, selector }) => {
      const section = document.querySelector(selector);
      if (section) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          {
            rootMargin: "-20% 0px -70% 0px", // Ajustar según necesites
            threshold: 0.1,
          }
        );

        observer.observe(section);
        observers.push(observer);
      }
    });

    // Cleanup: desconectar todos los observers
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return { activeSection, setActiveSection };
};
