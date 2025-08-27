"use client";

import { LogoStraumix } from "@/components/ui/Icons/LogoStraumix";
import CustomLink from "@/components/ui/CustomLink";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LogoStraumix w={128} h={35} styles="dark:fill-white" />
        </motion.div>

        {/* Illustration SVG - Server Error */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400 dark:text-gray-600"
          >
            {/* Server/Computer icon */}
            <rect
              x="40"
              y="60"
              width="120"
              height="80"
              rx="8"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-[#61B390] dark:text-[#BAD8B6]"
            />

            {/* Screen */}
            <rect
              x="50"
              y="70"
              width="100"
              height="50"
              rx="4"
              fill="currentColor"
              className="text-[#BAD8B6] dark:text-[#61B390]"
            />

            {/* Error symbols on screen */}
            <circle
              cx="75"
              cy="85"
              r="4"
              fill="currentColor"
              className="text-[#E1EACD]"
            />
            <circle
              cx="95"
              cy="85"
              r="4"
              fill="currentColor"
              className="text-[#E1EACD]"
            />
            <circle
              cx="115"
              cy="85"
              r="4"
              fill="currentColor"
              className="text-[#E1EACD]"
            />

            {/* Warning triangle */}
            <path
              d="M100 100L85 115L115 115Z"
              fill="currentColor"
              className="text-[#E1EACD]"
            />

            {/* Exclamation mark */}
            <path
              d="M100 105V110"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-[#01352C]"
            />
            <circle
              cx="100"
              cy="115"
              r="1.5"
              fill="currentColor"
              className="text-[#01352C]"
            />

            {/* Stand */}
            <rect
              x="90"
              y="140"
              width="20"
              height="10"
              fill="currentColor"
              className="text-[#61B390] dark:text-[#BAD8B6]"
            />
          </svg>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900 dark:text-white mb-4">
            Error del Servidor
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
            Algo salió mal en nuestro servidor. No te preocupes, nuestro equipo
            ya está trabajando para solucionarlo.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CustomLink
            href="/"
            btn
            variant="outline"
            size="lg"
            buttonClassName="border-[#61B390] text-[#61B390] hover:bg-[#61B390] hover:text-white dark:border-[#BAD8B6] dark:text-[#BAD8B6] dark:hover:bg-[#BAD8B6] dark:hover:text-[#01352C]"
          >
            Volver al Inicio
          </CustomLink>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          className="border-t border-gray-200 dark:border-gray-700 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            ¿El problema persiste? Te podemos asistir:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <CustomLink
              href="/#faq"
              className="text-[#61B390] hover:text-[#01352C] dark:text-[#BAD8B6] dark:hover:text-[#E1EACD] transition-colors duration-200"
            >
              Preguntas Frecuentes
            </CustomLink>
            <CustomLink
              href="mailto:straumix.app@gmail.com"
              target="_blank"
              className="text-[#61B390] hover:text-[#01352C] dark:text-[#BAD8B6] dark:hover:text-[#E1EACD] transition-colors duration-200"
            >
              Reportar Error
            </CustomLink>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#61B390]/10 to-[#BAD8B6]/10 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-[#BAD8B6]/10 to-[#E1EACD]/10 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#61B390]/5 via-[#BAD8B6]/5 to-[#E1EACD]/5 rounded-full blur-3xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          />
        </div>
      </div>
    </div>
  );
}
