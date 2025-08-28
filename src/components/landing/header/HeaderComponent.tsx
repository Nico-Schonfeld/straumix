"use client";

import { LogoStraumix, LogoWave } from "@/components/ui/Icons/LogoStraumix";
import Link from "next/link";
import React from "react";
import { useScroll } from "@/hooks/use-scroll";
import { useActiveSectionIntersection } from "@/hooks/use-active-section-intersection";
import CustomLink from "@/components/ui/CustomLink";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

const HeaderComponent = () => {
  const isScrolled = useScroll();
  const { activeSection, setActiveSection } = useActiveSectionIntersection();

  const scrollToSection = (sectionId: string) => {
    // Actualizar inmediatamente el estado activo
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // Altura aproximada del header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      // Asegurar que el estado se mantenga después del scroll
      setTimeout(() => {
        setActiveSection(sectionId);
      }, 100);
    }
  };

  return (
    <header
      className={`w-full h-auto mt-0.5 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "lg:mt-8" : ""
      }`}
    >
      <div
        className={`w-full h-full py-2 container max-w-7xl mx-auto rounded-none lg:rounded-full flex items-center justify-between gap-4 transition-all duration-300 ${
          isScrolled
            ? "dark:bg-black/40 bg-white/40 border border-white/20 backdrop-blur-sm lg:px-12 px-8"
            : "bg-transparent border border-transparent px-8"
        }`}
      >
        <Link href={"/"} className="hidden lg:flex">
          <LogoStraumix
            w={isScrolled ? 120 : 190}
            styles="transition-all duration-300 "
          />
        </Link>

        <Link href={"/"} className="flex lg:hidden">
          <LogoWave w={30} />
        </Link>

        <nav className=" items-center gap-6 hidden lg:flex">
          <button
            onClick={() => scrollToSection("home")}
            className={cn(
              "header-nav-button text-sm font-medium cursor-pointer",
              activeSection === "home"
                ? "active"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            )}
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("benefits")}
            className={cn(
              "header-nav-button text-sm font-medium cursor-pointer",
              activeSection === "benefits"
                ? "active"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            )}
          >
            Beneficios
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className={cn(
              "header-nav-button text-sm font-medium cursor-pointer",
              activeSection === "how-it-works"
                ? "active"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            )}
          >
            Como funciona
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className={cn(
              "header-nav-button text-sm font-medium cursor-pointer",
              activeSection === "pricing"
                ? "active"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            )}
          >
            Precios
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className={cn(
              "header-nav-button text-sm font-medium cursor-pointer",
              activeSection === "testimonials"
                ? "active"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            )}
          >
            Testimonios
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className={cn(
              "header-nav-button text-sm font-medium cursor-pointer",
              activeSection === "faq"
                ? "active"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
            )}
          >
            FAQ
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <CustomLink
            href={"/auth/signup"}
            btn={true}
            variant={"default"}
            className="flex items-center"
          >
            <Zap className="w-4 h-4 mr-1" />
            <span> Probar gratis</span>
          </CustomLink>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
