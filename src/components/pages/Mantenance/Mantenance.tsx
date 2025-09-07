import React from "react";
import { LogoStraumix } from "@/components/LogosReusables";
import Link from "next/link";

const Maintenance = () => {
  return (
    <section className="w-full h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center container mx-auto px-4 text-center">
        <Link href="/">
          <LogoStraumix w={120} h={42} />
        </Link>
        <h1 className="text-2xl font-bold mt-8 mb-4 uppercase">
          Sitio en Mantenimiento
        </h1>
        <p className="text-gray-600 text-sm mb-2">
          Estamos realizando mejoras importantes en nuestro sitio web para
          brindarte una mejor experiencia.
        </p>
        <p className="text-gray-500 text-sm">
          Por favor, vuelve a intentarlo más tarde.
        </p>
      </div>
    </section>
  );
};

export default Maintenance;
