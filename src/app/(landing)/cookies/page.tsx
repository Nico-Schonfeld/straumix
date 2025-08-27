"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Cookie,
  Shield,
  Settings,
  BarChart3,
  Eye,
  Lock,
  CheckCircle,
  XCircle,
  Info,
  Database,
  Smartphone,
  Globe,
  Target,
  Users,
  Building,
  Heart,
  Mail,
} from "lucide-react";
import {
  saveCookiePreferences,
  getCookiePreferences,
  type CookiePreferences,
} from "@/lib/actions/cookies";
import CustomLink from "@/components/ui/CustomLink";

const Cookies = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar preferencias existentes al montar el componente
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPreferences = await getCookiePreferences();
        setPreferences(savedPreferences);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error al cargar preferencias:", error);
        setIsInitialized(true);
      }
    };

    loadPreferences();
  }, []);

  const handleSavePreferences = async () => {
    setIsLoading(true);

    try {
      const result = await saveCookiePreferences(preferences);

      if (result.success) {
        toast.success("Preferencias guardadas", {
          description:
            "Tus preferencias de cookies han sido guardadas exitosamente.",
          duration: 4000,
        });
      } else {
        toast.error("Error al guardar", {
          description:
            result.message || "No se pudieron guardar las preferencias.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error al guardar preferencias:", error);
      toast.error("Error inesperado", {
        description: "Ocurrió un error inesperado al guardar las preferencias.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = (
    type: keyof CookiePreferences,
    value: boolean
  ) => {
    if (type === "essential") return; // Las cookies esenciales no se pueden cambiar

    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
      functional: true,
    });
  };

  const handleRejectAll = () => {
    setPreferences({
      essential: true,
      analytics: false,
      functional: false,
    });
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61B390] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Cargando preferencias...
          </p>
        </div>
      </div>
    );
  }

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
              Política de Cookies
            </h1>
            <p className="text-lg text-blue-100">Uso de cookies en Straumix</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introducción */}
          <section className="mb-16">
            <div className="bg-green-100 dark:bg-[#61B390]/20 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#BAD8B6] dark:bg-[#61B390]/20 rounded-lg flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-[#61B390]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  ¿Qué son las Cookies?
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en
                tu dispositivo cuando visitas nuestra plataforma. Estas cookies
                nos ayudan a mejorar tu experiencia, recordar tus preferencias y
                proporcionar funcionalidades personalizadas para la gestión de
                tus finanzas personales, en pareja o empresariales.
              </p>
            </div>
          </section>

          {/* Tipos de Cookies */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                1. Tipos de Cookies que Utilizamos
              </h2>
            </div>

            <div className="space-y-6">
              {/* Cookies Esenciales */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6 border-l-4 border-[#61B390]">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#61B390]" />
                  Cookies Esenciales (Necesarias)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Estas cookies son absolutamente necesarias para el
                  funcionamiento básico de la plataforma. Sin ellas, no podrías
                  acceder a tu cuenta ni utilizar las funcionalidades
                  principales.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Autenticación:</strong> Mantienen tu sesión activa y
                    segura
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Seguridad:</strong> Protegen contra ataques y
                    accesos no autorizados
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Funcionalidad básica:</strong> Permiten que la
                    aplicación funcione correctamente
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-green-100 dark:bg-[#61B390]/30 rounded-lg">
                  <p className="text-sm text-[#61B390] dark:text-[#61B390]">
                    <Info className="w-4 h-4 inline mr-2" />
                    <strong>Importante:</strong> Estas cookies no se pueden
                    desactivar ya que son esenciales para el funcionamiento de
                    la plataforma.
                  </p>
                </div>
              </div>

              {/* Cookies de Análisis */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6 border-l-4 border-[#61B390]">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#61B390]" />
                  Cookies de Análisis (Opcionales)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Nos ayudan a entender cómo utilizas la plataforma para mejorar
                  la experiencia y desarrollar nuevas funcionalidades que se
                  adapten a tus necesidades financieras.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Uso de la plataforma:</strong> Analizan qué
                    funciones utilizas más
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Rendimiento:</strong> Identifican y resuelven
                    problemas técnicos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Mejoras:</strong> Nos ayudan a priorizar nuevas
                    funcionalidades
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-green-100 dark:bg-[#61B390]/30 rounded-lg">
                  <p className="text-sm text-[#61B390] dark:text-[#61B390]">
                    <Info className="w-4 h-4 inline mr-2" />
                    <strong>Beneficio:</strong> Estas cookies nos permiten crear
                    una experiencia más personalizada y eficiente para la
                    gestión de tus finanzas.
                  </p>
                </div>
              </div>

              {/* Cookies Funcionales */}
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6 border-l-4 border-[#61B390]">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#61B390]" />
                  Cookies Funcionales (Opcionales)
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Mejoran tu experiencia recordando tus preferencias y
                  proporcionando funcionalidades personalizadas para la gestión
                  financiera.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Preferencias:</strong> Recuerdan tu tema preferido
                    (claro/oscuro)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Configuración:</strong> Mantienen tus ajustes de
                    notificaciones
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Personalización:</strong> Adaptan la interfaz a tus
                    necesidades
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-green-100 dark:bg-[#61B390]/30 rounded-lg">
                  <p className="text-sm text-[#61B390] dark:text-[#61B390]">
                    <Info className="w-4 h-4 inline mr-2" />
                    <strong>Ventaja:</strong> Estas cookies hacen que la
                    plataforma sea más fácil de usar y se adapte mejor a tu
                    estilo de gestión financiera.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies por Rol */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                2. Cookies Específicas por Rol de Usuario
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
                    <strong>Preferencias individuales:</strong> Tema,
                    notificaciones y configuración personal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Historial de sesión:</strong> Última actividad y
                    preferencias de visualización
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Metas financieras:</strong> Recordar objetivos de
                    ahorro y progreso
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
                    <strong>Preferencias compartidas:</strong> Configuración
                    común de la cuenta
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Sincronización:</strong> Mantener sesiones activas
                    entre ambos miembros
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Metas conjuntas:</strong> Recordar objetivos
                    financieros compartidos
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
                    <strong>Configuración empresarial:</strong> Preferencias
                    corporativas y políticas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Roles y permisos:</strong> Mantener configuraciones
                    de acceso por usuario
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Reportes empresariales:</strong> Recordar
                    preferencias de exportación y análisis
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Gestor de Cookies */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-[#61B390]" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                3. Gestiona tus Preferencias de Cookies
              </h2>
            </div>

            <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Puedes controlar qué tipos de cookies aceptas. Ten en cuenta que
                desactivar ciertas cookies puede afectar la funcionalidad de la
                plataforma y tu experiencia de usuario.
              </p>

              {/* Botones de acción rápida */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-[#61B390] hover:bg-[#61B390] text-gray-900 rounded-lg font-medium transition-colors duration-200"
                >
                  Aceptar Todas
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Rechazar Todas
                </button>
              </div>

              <div className="space-y-4">
                {/* Cookies Esenciales */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-[#61B390]" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Cookies Esenciales
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Necesarias para el funcionamiento básico
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#61B390]" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Siempre activas
                    </span>
                  </div>
                </div>

                {/* Cookies de Análisis */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-[#61B390]" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Cookies de Análisis
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mejoran la experiencia del usuario
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        handlePreferenceChange("analytics", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#61B390]"></div>
                  </label>
                </div>

                {/* Cookies Funcionales */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-[#61B390]" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Cookies Funcionales
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Personalizan tu experiencia
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        handlePreferenceChange("functional", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#61B390]"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleSavePreferences}
                  disabled={isLoading}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#61B390] hover:bg-[#61B390] hover:shadow-lg"
                  } text-white`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Guardando...
                    </>
                  ) : (
                    "Guardar Preferencias"
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Información Adicional */}
          <section className="mb-16">
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#61B390]" />
                  4. Almacenamiento y Duración
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Duración de las Cookies
                    </h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                        <strong>Sesión:</strong> Se eliminan al cerrar el
                        navegador
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                        <strong>Persistentes:</strong> Permanecen hasta 2 años
                        máximo
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                        <strong>Seguridad:</strong> Se renuevan automáticamente
                        por seguridad
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Almacenamiento Seguro
                    </h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                        <strong>Encriptación:</strong> Todas las cookies están
                        encriptadas
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                        <strong>HTTPS:</strong> Transmisión segura de datos
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                        <strong>Acceso limitado:</strong> Solo personal
                        autorizado
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#61B390]" />
                  5. Cookies de Terceros
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Utilizamos servicios de terceros confiables para mejorar la
                  funcionalidad de la plataforma. Estos servicios pueden
                  establecer sus propias cookies:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Google Analytics:</strong> Análisis de uso y
                    rendimiento de la plataforma
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Stripe:</strong> Procesamiento seguro de pagos y
                    suscripciones
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#61B390] rounded-full mt-2 flex-shrink-0"></span>
                    <strong>Cloudflare:</strong> Seguridad y rendimiento de la
                    plataforma
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Información de Contacto */}
          <section className="mb-16">
            <div className="bg-gray-50 dark:bg-[#0c1e1b] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#61B390]" />
                6. Contacto y Soporte
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Si tienes preguntas sobre nuestra política de cookies o quieres
                modificar tus preferencias, no dudes en contactarnos:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:straumix.app@gmail.com"
                    className="text-[#61B390] hover:text-[#61B390] font-medium transition-colors duration-200"
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

export default Cookies;
