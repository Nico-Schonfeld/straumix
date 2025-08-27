"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  FileText,
  Lock,
  Eye,
  Users,
  CreditCard,
  AlertTriangle,
  Mail,
} from "lucide-react";
import CustomLink from "@/components/ui/CustomLink";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-[#0c1e1b] text-white">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-[#E1EACD] transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al inicio</span>
            </Link>
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Términos y Condiciones
            </h1>
            <p className="text-lg text-[#BAD8B6]">
              Política de Privacidad y Uso del Servicio
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Términos y Condiciones */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#BAD8B6]/20 dark:bg-[#61B390]/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Términos y Condiciones
              </h2>
            </div>

            <div className="space-y-8">
              {/* Aceptación */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#61B390]" />
                  1. Aceptación de los Términos
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Al registrarte y usar nuestra plataforma, aceptas estos
                  Términos y Condiciones. Si no estás de acuerdo, no utilices el
                  servicio.
                </p>
              </div>

              {/* Uso del Servicio */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#61B390]" />
                  2. Uso del Servicio
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#01352C] rounded-full mt-2 flex-shrink-0"></span>
                    Nuestra plataforma está diseñada para la gestión de gastos
                    personales, en pareja y organizacionales.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#01352C] rounded-full mt-2 flex-shrink-0"></span>
                    Está prohibido usar el servicio para actividades ilícitas o
                    que perjudiquen el funcionamiento de la plataforma.
                  </li>
                </ul>
              </div>

              {/* Registro de Cuenta */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#E1EACD]" />
                  3. Registro de Cuenta
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#E1EACD] rounded-full mt-2 flex-shrink-0"></span>
                    Eres responsable de proporcionar información precisa y
                    mantener la confidencialidad de tus credenciales.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#E1EACD] rounded-full mt-2 flex-shrink-0"></span>
                    Notifica cualquier acceso no autorizado inmediatamente.
                  </li>
                </ul>
              </div>

              {/* Suscripciones */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#61B390]" />
                  4. Suscripciones
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Las suscripciones son renovadas automáticamente al finalizar
                    su período, salvo cancelación previa.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    No se emiten reembolsos por períodos no utilizados tras la
                    cancelación.
                  </li>
                </ul>
              </div>

              {/* Uso de Datos */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#61B390]" />
                  5. Uso de Datos
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Al usar nuestra plataforma, aceptas el procesamiento de tus
                  datos de acuerdo con nuestra Política de Privacidad.
                </p>
              </div>

              {/* Modificaciones */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#61B390]" />
                  6. Modificaciones del Servicio
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Nos reservamos el derecho de modificar la plataforma, agregar
                  o eliminar funcionalidades, o cambiar los términos con previo
                  aviso.
                </p>
              </div>

              {/* Limitación de Responsabilidad */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#61B390]" />
                  7. Limitación de Responsabilidad
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  No seremos responsables por pérdidas económicas o
                  interrupciones del servicio.
                </p>
              </div>

              {/* Jurisdicción */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#61B390]" />
                  8. Jurisdicción
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Estos términos se rigen por las leyes locales y cualquier
                  disputa será resuelta en sus tribunales.
                </p>
              </div>
            </div>
          </section>

          {/* Separador */}
          <div className="border-t-2 border-gray-200 dark:border-gray-700 my-16"></div>

          {/* Política de Privacidad */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Política de Privacidad
              </h2>
            </div>

            <div className="space-y-8">
              {/* Información Recopilada */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#61B390]" />
                  1. Información Recopilada
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Recopilamos datos personales como nombre, correo electrónico
                    y datos financieros introducidos para el uso de la
                    plataforma.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    También recopilamos datos técnicos como la dirección IP y
                    cookies para mejorar la experiencia del usuario.
                  </li>
                </ul>
              </div>

              {/* Uso de la Información */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#61B390]" />
                  2. Uso de la Información
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Los datos recopilados se utilizan para operar y mejorar la
                  plataforma, personalizar el contenido, y para fines
                  administrativos y legales.
                </p>
              </div>

              {/* Compartición de Datos */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#61B390]" />
                  3. Compartición de Datos
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  No compartimos tus datos con terceros excepto en los
                  siguientes casos:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Cuando sea requerido por ley.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Para proteger los derechos o la seguridad de los usuarios.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Con proveedores de servicios que nos asisten en el
                    funcionamiento de la plataforma.
                  </li>
                </ul>
              </div>

              {/* Seguridad */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#61B390]" />
                  4. Seguridad de los Datos
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Tomamos medidas razonables para proteger tus datos contra
                  accesos no autorizados o pérdida.
                </p>
              </div>

              {/* Derechos del Usuario */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#61B390]" />
                  5. Derechos del Usuario
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Puedes acceder, corregir o eliminar tus datos personales a
                  través de tu cuenta o contactándonos directamente.
                </p>
              </div>

              {/* Actualizaciones */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#61B390]" />
                  6. Actualizaciones de la Política
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Nos reservamos el derecho de modificar esta Política de
                  Privacidad. Los cambios serán notificados y estarán
                  disponibles en nuestra plataforma.
                </p>
              </div>

              {/* Contacto */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#61B390]" />
                  7. Contacto
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Si tienes preguntas sobre esta política, puedes contactarnos
                  en{" "}
                  <a
                    href="mailto:straumix.app@gmail.com"
                    className="dark:text-[#E1EACD] dark:hover:text-[#61B390]  font-medium transition-colors duration-200"
                  >
                    straumix.app@gmail.com
                  </a>{" "}
                  o a través de la misma plataforma.
                </p>
              </div>
            </div>
          </section>

          {/* Botón de volver */}
          <div className="flex justify-center">
            <CustomLink href="/" btn>
              <ArrowLeft className="w-5 h-5" />
              Volver al inicio
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
