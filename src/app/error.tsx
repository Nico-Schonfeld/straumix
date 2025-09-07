"use client"; // Error boundaries must be Client Components

import ASCIIText from "@/components/ui/AnimatedComponents/vertex-shader";
import { Button } from "@/components/ui/button";
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
    <section className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Fondo animado ASCII */}
      <div className="absolute inset-0 opacity-20">
        <ASCIIText text="Oooooops!" enableWaves={true} asciiFontSize={12} />
      </div>

      {/* Contenido principal */}
      <div className="z-10 text-center space-y-6  px-6">
        {/* Código de error */}
        <h1 className="text-5xl font-medium mb-4">
          No eres tu, somos nosotros
        </h1>

        {/* Mensaje secundario */}
        <p className="text-sm text-gray-300 mb-6">
          No eres tú, somos nosotros. Algo salió mal en nuestros servidores.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 min-w-[140px]"
          >
            Reintentar
          </Button>
          <Button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 min-w-[140px]"
          >
            Volver atrás
          </Button>
        </div>
      </div>
    </section>
  );
}
