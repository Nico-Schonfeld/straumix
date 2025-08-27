"use client";

import React from "react";
import { LogoStraumix } from "../ui/Icons/LogoStraumix";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { AlertCircle, Clock, Wrench, Mail, Phone } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-[#eef2e6] rounded-full">
            <Wrench className="w-8 h-8 text-[#BAD8B6]" />
          </div>
        </div>

        {/* Mensaje principal */}
        <Card className="mb-8 border-0 bg-transparent shadow-none">
          <CardContent className="p-8">
            <div className="flex justify-center mb-6">
              <LogoStraumix w={120} h={55} />
            </div>

            <h1 className="text-4xl md:text-5xl font-medium text-slate-900 dark:text-white mb-4">
              Sitio en Mantenimiento
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Estamos realizando mejoras importantes en nuestro sitio web para
              brindarte una mejor experiencia. Disculpa las molestias y
              agradecemos tu paciencia.
            </p>

            {/* Estado del servicio */}
            <div className="flex items-center justify-center gap-2 mb-6 text-[#BAD8B6]">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">
                Estado: Mantenimiento Programado
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-slate-500 dark:text-slate-400">
          <p className="text-sm">
            © {new Date().getFullYear()} Straumix. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
