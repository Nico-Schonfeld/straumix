import React from "react";

const HowItWorks = () => {
  return (
    <>
      {/* How It Works */}
      <section
        className="w-full min-h-screen mt-[2rem] lg:mt-[8rem] overflow-hidden"
        id="how-it-works"
      >
        <div className="w-full h-full container mx-auto flex items-center justify-center flex-col gap-20 px-4">
          {/* Header */}
          <div className="text-center flex flex-col gap-4">
            <h2 className="lg:text-5xl text-2xl font-medium items-center gap-2 flex-wrap text-center">
              Empezá en 3 pasos simples
            </h2>
            <p className="text-center text-gray-400 max-w-2xl">
              Transformá tu relación con el dinero siguiendo estos pasos
              sencillos. Miles de usuarios ya han mejorado sus finanzas con
              nuestra plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-[1rem] lg:px-[10rem]">
            {/* Left Content */}
            <div>
              <h3 className="lg:text-3xl text-2xl font-medium items-center gap-2 flex-wrap text-start">
                Transformá tu Vida Financiera con la Metodología 50/30/20
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Nuestra plataforma te ayuda a gestionar tus finanzas de manera
                inteligente, siguiendo la metodología probada que ha ayudado a
                miles de personas a alcanzar libertad financiera y cumplir sus
                metas.
              </p>

              {/* Benefits List */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#E1EACD20" }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: "#61B390" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>50% Necesidades:</strong> Control total de gastos
                    esenciales
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#E1EACD20" }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: "#61B390" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>30% Deseos:</strong> Disfrutá sin culpa, dentro de
                    tu presupuesto
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#E1EACD20" }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: "#61B390" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>20% Ahorro:</strong> Construí tu futuro financiero
                    paso a paso
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#BAD8B620" }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: "#61B390" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Roles Flexibles:</strong> Persona, Pareja u
                    Organización
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#BAD8B620" }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: "#61B390" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Colaboración:</strong> Gestión compartida para
                    parejas y equipos
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#E1EACD20" }}
                  >
                    <svg
                      className="w-4 h-4"
                      style={{ color: "#61B390" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Reportes Avanzados:</strong> Análisis detallado y
                    exportación de datos
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="space-y-6">
              {/* Sales Teams Card */}
              <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, #E1EACD20, transparent)`,
                  }}
                ></div>
                <div className="relative bg-white dark:bg-black rounded-2xl p-4 flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, #E1EACD40, #E1EACD20)`,
                      }}
                    ></div>
                    <img
                      src="/assets/img_placeholder/img_home.png"
                      alt="Sales Teams"
                      className="relative w-full max-w-[10rem] rounded-lg object-cover flex-shrink-0"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "#E1EACD20" }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#61B390" }}
                        >
                          1
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Primer paso
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Registrate y elegí tu rol: Persona, Pareja u Organización.
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Support Card */}
              <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, #BAD8B620, transparent)`,
                  }}
                ></div>
                <div className="relative bg-white dark:bg-black rounded-2xl p-4 flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, #BAD8B640, #BAD8B620)`,
                      }}
                    ></div>
                    <img
                      src="/assets/img_placeholder/img_home.png"
                      alt="Customer Support"
                      className="relative w-full max-w-[10rem] rounded-lg object-cover flex-shrink-0"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "#BAD8B620" }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#61B390" }}
                        >
                          2
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Segundo paso
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ingresá tu sueldo y comenzá a registrar tus gastos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality Assurance Card */}
              <div className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-700/30">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, #61B39020, transparent)`,
                  }}
                ></div>
                <div className="relative bg-white dark:bg-black rounded-2xl p-4 flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, #61B39040, #61B39020)`,
                      }}
                    ></div>
                    <img
                      src="/assets/img_placeholder/img_home.png"
                      alt="Quality Assurance"
                      className="relative w-full max-w-[10rem] rounded-lg object-cover flex-shrink-0"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "#61B39020" }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: "#61B390" }}
                        >
                          3
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Tercer paso
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Visualizá tu presupuesto en tiempo real y alcanzá tus
                      metas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
