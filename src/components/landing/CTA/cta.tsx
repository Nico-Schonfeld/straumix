"use client";

import { Badge } from "@/components/ui/badge";
import CustomLink from "@/components/ui/CustomLink";
import React from "react";
import Image from "next/image";

const Cta = () => {
  return (
    <>
      {/* CTA Section */}
      <section
        className="w-full py-12 lg:py-16 bg-gradient-to-br lg:mt-[8rem] mt-[3rem] mb-[3rem]"
        id="cta"
      >
        {/* Content Container - Everything inside */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Main CTA Card */}
            <div className="bg-white dark:bg-[#0c1e1b] py-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Side - Content */}
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    {/* Badge */}
                    <Badge
                      variant="secondary"
                      className="text-xs bg-[#E1EACD] dark:bg-[#E1EACD]/30 text-[#01352C] dark:text-[#61B390] border-[#BAD8B6] dark:border-[#61B390] w-fit"
                    >
                      Comienza tu viaje financiero
                    </Badge>

                    {/* Main Title - Reduced to max 4xl/5xl */}
                    <h2 className="text-2xl lg:text-3xl font-medium text-gray-900 dark:text-white leading-tight">
                      Empezá a gestionar tu dinero con{" "}
                      <span className="bg-gradient-to-r from-[#61B390] via-[#BAD8B6] to-[#BAD8B6] dark:from-[#61B390] dark:via-[#BAD8B6] dark:to-[#BAD8B6] bg-clip-text text-transparent">
                        claridad
                      </span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                      Probá Straumix gratis por 14 días y descubrí cómo
                      transformar tus finanzas con la metodología 50/30/20. Sin
                      compromisos, sin tarjetas de crédito.
                    </p>

                    {/* CTA Buttons - Simplified and smaller height */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-10">
                      <CustomLink
                        href="/signup"
                        btn
                        variant="default"
                        size="default"
                        className="w-[50%]"
                      >
                        Probar gratis
                      </CustomLink>
                    </div>
                  </div>
                </div>

                {/* Right Side - Image Content */}
                <div className="bg-gradient-to-br  p-6 lg:p-8 flex items-center justify-center">
                  <div className="relative w-full max-w-sm lg:max-w-md">
                    {/* Main Image - Smaller size */}
                    <div className="relative w-full aspect-square max-w-[240px] mx-auto">
                      <Image
                        src="/assets/BANNER_CTA.png"
                        alt="Straumix Financial Management"
                        fill
                        className="object-contain drop-shadow-lg"
                        priority
                      />
                    </div>

                    {/* Decorative elements - contained within the image area */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#BAD8B6]/20 to-[#E1EACD]/20 rounded-full blur-md"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#61B390]/20 to-[#BAD8B6]/20 rounded-full blur-md"></div>

                    {/* Small decorative dots */}
                    <div className="absolute top-1/4 -left-1 w-1 h-1 bg-[#61B390] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/4 -right-1 w-1 h-1 bg-[#BAD8B6] rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 -right-3 w-0.5 h-0.5 bg-[#E1EACD] rounded-full animate-pulse delay-1000"></div>
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

export default Cta;
