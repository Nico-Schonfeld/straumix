"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Users,
  CreditCard,
  Building,
  Heart,
  FileText,
  Database,
  Bell,
  Target,
  BarChart3,
  Download,
  Globe,
  Smartphone,
  Trophy,
  Mail,
} from "lucide-react";
import CustomLink from "@/components/ui/CustomLink";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="bg-[#0c1e1b] text-white">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al inicio</span>
            </Link>
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Política de Privacidad
            </h1>
            <p className="text-lg text-[#BAD8B6]">
              Protección de datos en Straumix
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introducción */}
          <section className="mb-16">
            <div className="bg-blue-50 dark:bg-[#0c1e1b] rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#BAD8B6] dark:bg-[#61B390]/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#61B390]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Compromiso con tu Privacidad
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                En Straumix, entendemos la importancia de proteger tu
                información financiera personal. Esta política describe cómo
                recopilamos, usamos y protegemos tus datos mientras utilizas
                nuestra plataforma de gestión financiera basada en la
                metodología 50/30/20.
              </p>
            </div>
          </section>

          {/* Información Recopilada */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#BAD8B6] dark:bg-[#61B390]/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                1. Información que Recopilamos
              </h2>
            </div>

            <div className="space-y-6">
              {/* Datos Personales */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#61B390]" />
                  Datos Personales
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Información de registro:</strong> Nombre, correo
                    electrónico, contraseña y rol seleccionado (Persona, Pareja
                    u Organización)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Información financiera:</strong> Salario neto,
                    ingresos, gastos, categorías de gastos y metas de ahorro
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Datos de perfil:</strong> Preferencias de
                    notificaciones, configuración de temas y preferencias de
                    idioma
                  </li>
                </ul>
              </div>

              {/* Datos Técnicos */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#61B390]" />
                  Datos Técnicos
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Información del dispositivo:</strong> Dirección IP,
                    tipo de navegador, sistema operativo y dispositivo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Cookies y análisis:</strong> Datos de uso, páginas
                    visitadas y tiempo de permanencia en la plataforma
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Datos de rendimiento:</strong> Métricas de la
                    aplicación para mejorar la experiencia del usuario
                  </li>
                </ul>
              </div>

              {/* Datos Específicos por Rol */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#61B390]" />
                  Datos por Rol de Usuario
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#61B390]" />
                      Rol Persona
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Datos financieros individuales, historial de gastos
                      personales y metas de ahorro individuales.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#61B390]" />
                      Rol Pareja
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Información financiera compartida, gastos conjuntos, metas
                      comunes y comunicación entre miembros.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#61B390]" />
                      Rol Organización
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Datos de empleados, gastos corporativos, reportes
                      departamentales y auditorías financieras.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Uso de la Información */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#BAD8B6] dark:bg-[#0c1e1b] rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                2. Cómo Utilizamos tu Información
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Funcionalidades Principales
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Gestión financiera:</strong> Calcular
                    automáticamente la distribución 50/30/20 de tus ingresos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Seguimiento de gastos:</strong> Categorizar y
                    registrar tus gastos para mantener el control presupuestario
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Metas y progreso:</strong> Mostrar tu progreso hacia
                    objetivos financieros y alertas de presupuesto
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Colaboración:</strong> Permitir la gestión conjunta
                    de finanzas en roles Pareja y Organización
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Mejoras del Servicio
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Análisis y reportes:</strong> Generar insights sobre
                    tus patrones de gasto y recomendaciones personalizadas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Notificaciones inteligentes:</strong> Alertas
                    personalizadas sobre límites de presupuesto y oportunidades
                    de ahorro
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Educación financiera:</strong> Proporcionar tips y
                    recursos para mejorar tu salud financiera
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Compartición de Datos */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#BAD8B6] dark:bg-[#61B390]/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                3. Compartición y Protección de Datos
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Principio de No Compartición
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  No vendemos, alquilamos ni compartimos tu información personal
                  con terceros, excepto en las siguientes situaciones
                  específicas:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Requerimientos legales:</strong> Cuando sea
                    necesario cumplir con leyes, regulaciones o procesos legales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Protección de derechos:</strong> Para proteger
                    nuestros derechos, propiedad o seguridad, o la de nuestros
                    usuarios
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Proveedores de servicios:</strong> Con empresas que
                    nos ayudan a operar la plataforma (hosting, análisis,
                    soporte)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Colaboración entre usuarios:</strong> En roles
                    Pareja y Organización, la información se comparte entre
                    miembros autorizados
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Medidas de Seguridad
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Encriptación:</strong> Todos los datos sensibles
                    están encriptados usando estándares de la industria
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Acceso controlado:</strong> Solo personal autorizado
                    puede acceder a la información de los usuarios
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Monitoreo continuo:</strong> Supervisamos
                    constantemente la seguridad de nuestra plataforma
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Copias de seguridad:</strong> Mantenemos copias de
                    seguridad seguras de todos los datos
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Derechos del Usuario */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-[#0c1e1b] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                4. Tus Derechos y Control
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Control Total de tus Datos
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Acceso:</strong> Puedes ver y descargar todos tus
                    datos en cualquier momento
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Corrección:</strong> Actualiza o corrige información
                    incorrecta en tu perfil
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Eliminación:</strong> Solicita la eliminación
                    completa de tu cuenta y datos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Portabilidad:</strong> Exporta tus datos en formatos
                    estándar (CSV, PDF)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Preferencias:</strong> Controla qué notificaciones
                    recibes y cómo se procesan tus datos
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Funcionalidades de Exportación
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-[#61B390]" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Reportes financieros en PDF
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-[#61B390]" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Datos en formato CSV
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#61B390]" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Historial completo de transacciones
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-[#61B390]" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Metas y progreso financiero
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Funcionalidades Específicas */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                5. Funcionalidades por Rol
              </h2>
            </div>

            <div className="space-y-6">
              {/* Rol Persona */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#61B390]" />
                  Rol Persona - Gestión Individual
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Control total de datos financieros personales
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Notificaciones personalizadas sobre presupuesto
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Metas de ahorro individuales y seguimiento de progreso
                  </li>
                </ul>
              </div>

              {/* Rol Pareja */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#61B390]" />
                  Rol Pareja - Colaboración Compartida
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Compartición de datos financieros entre ambos miembros
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Metas financieras compartidas y seguimiento conjunto
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Transparencia total en gastos y decisiones financieras
                  </li>
                </ul>
              </div>

              {/* Rol Organización */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#61B390]" />
                  Rol Organización - Gestión Empresarial
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Múltiples usuarios con diferentes niveles de acceso
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Reportes avanzados y auditorías financieras
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    Exportación de datos para contabilidad externa
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Actualizaciones y Contacto */}
          <section className="mb-16">
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#61B390]" />
                  6. Actualizaciones de la Política
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Nos reservamos el derecho de actualizar esta Política de
                  Privacidad para reflejar cambios en nuestras prácticas o por
                  razones legales. Te notificaremos sobre cambios significativos
                  por correo electrónico o a través de la plataforma. Te
                  recomendamos revisar esta política periódicamente.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#61B390]" />
                  7. Contacto y Soporte
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Si tienes preguntas sobre esta política de privacidad o sobre
                  cómo manejamos tus datos, no dudes en contactarnos:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:straumix.app@gmail.com"
                      className="dark:text-[#BAD8B6] dark:hover:text-[#61B390] text-[#01352C] hover:text-[#61B390] font-medium transition-colors duration-200"
                    >
                      straumix.app@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Teléfono:</strong> +54 351 707-7224
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Ubicación:</strong> Córdoba, Argentina
                  </p>
                </div>
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

export default Privacy;
