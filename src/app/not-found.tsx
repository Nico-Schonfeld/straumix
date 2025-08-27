"use client";

import { LogoStraumix } from "@/components/ui/Icons/LogoStraumix";
import CustomLink from "@/components/ui/CustomLink";
import { motion } from "framer-motion";

export default function NotFound() {
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

        {/* Illustration SVG */}
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
            {/* Search magnifying glass */}
            <circle
              cx="85"
              cy="85"
              r="60"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-[#61B390] dark:text-[#BAD8B6]"
            />
            <path
              d="M130 130L170 170"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-[#61B390] dark:text-[#BAD8B6]"
            />

            {/* Question mark - Centrado dentro de la lupa */}
            <circle
              cx="85"
              cy="75"
              r="6"
              fill="currentColor"
              className="text-[#E1EACD]"
            />
            <path
              d="M85 85V95"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-[#E1EACD]"
            />

            {/* Sad face - Centrado dentro de la lupa */}
            <path
              d="M65 105 Q85 120 105 105"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              className="text-[#01352C] dark:text-gray-400"
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
            Página no encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-300  leading-relaxed max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida. Te
            ayudamos a encontrar lo que necesitas.
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
            variant="default"
            size="lg"
            buttonClassName="bg-[#61B390] hover:bg-[#01352C] text-white"
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
            ¿Necesitas ayuda? Te podemos asistir:
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
              Contactar Soporte
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
