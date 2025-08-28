"use client";

import React, { useState, useEffect } from "react";
import { AnimatedNumber } from "@/components/ui/animated-numer";
import { Badge } from "@/components/ui/badge";
import CustomLink from "@/components/ui/CustomLink";
import { Magnetic } from "@/components/ui/magnetic";
import { TextLoop } from "@/components/ui/Text/text-loop";
import { Zap } from "lucide-react";
import Image from "next/image";
import { TextRoll } from "@/components/ui/Text/text-roll";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollValue } from "@/hooks/use-scroll";

const HeroArea = () => {
  const springOptions = { bounce: 0.1 };
  const scrollY = useScrollValue();

  const [value, setValue] = useState(0);
  const [showTextRoll, setShowTextRoll] = useState(true);

  // Calcular la rotación basada en el scroll
  const calculateRotation = () => {
    const maxScroll = 500; // Scroll máximo para completar la animación
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    const initialRotation = 32;
    const finalRotation = 0;
    return initialRotation - scrollProgress * (initialRotation - finalRotation);
  };

  useEffect(() => {
    setValue(435);
  }, []);

  return (
    <>
      {/* Hero Area */}
      <main className="w-full h-auto mt-[10rem]" id="home">
        <div className="w-full h-full container mx-auto flex items-center justify-center flex-col gap-4 px-4 py-10">
          <div className="flex flex-col gap-4 items-center">
            <Badge variant="secondary" className="text-xs lg:text-sm">
              🚀
              <AnimatedNumber
                springOptions={{
                  bounce: 0,
                  duration: 2000,
                }}
                value={value}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
              {"  "}
              usuarios activos
            </Badge>

            <AnimatePresence mode="wait">
              {showTextRoll ? (
                <motion.div
                  key="textroll"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TextRoll
                    className="lg:text-6xl text-2xl font-medium items-center gap-2 flex-wrap text-center"
                    onAnimationComplete={() => setShowTextRoll(false)}
                  >
                    Tu dinero, en equilibrio.
                  </TextRoll>
                </motion.div>
              ) : (
                <motion.h1
                  key="textloop"
                  className="lg:text-6xl text-2xl font-medium items-center gap-2 flex-wrap text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Tu dinero,{" "}
                  <TextLoop
                    className="overflow-y-clip text-center"
                    transition={{
                      type: "spring",
                      stiffness: 900,
                      damping: 80,
                      mass: 10,
                    }}
                    variants={{
                      initial: {
                        y: 20,
                        rotateX: 90,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                      animate: {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: {
                        y: -20,
                        rotateX: -90,
                        opacity: 0,
                        filter: "blur(4px)",
                      },
                    }}
                  >
                    <span>en equilibrio.</span>
                    <span>con propósito.</span>
                    <span>bajo control.</span>
                  </TextLoop>
                </motion.h1>
              )}
            </AnimatePresence>

            <p className="text-center text-gray-400 max-w-2xl">
              Gestioná tus finanzas personales, en pareja o en equipo con la
              metodología 50/30/20. Claridad, control y colaboración en una sola
              plataforma.
            </p>

            <ul className="flex items-center lg:flex-row flex-col lg:gap-5 gap-2 lg:mt-[1rem] mt-[0rem]">
              <li className="flex items-center gap-2  text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#E1EACD]" />
                Sin configuración requerida
              </li>
              <li className="flex items-center gap-2  text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#BAD8B6]" />
                Prueba gratis de 14 días
              </li>
              <li className="flex items-center gap-2  text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#61B390]" />
                Cancelá en cualquier momento
              </li>
            </ul>

            <Magnetic
              intensity={0.2}
              springOptions={springOptions}
              actionArea="global"
              range={200}
            >
              <CustomLink
                href="/auth/signup"
                btn
                className="mt-4 w-[15rem] lg:w-auto"
              >
                <Magnetic
                  intensity={0.1}
                  springOptions={springOptions}
                  actionArea="global"
                  range={200}
                >
                  <span className="flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Probar gratis
                  </span>
                </Magnetic>
              </CustomLink>
            </Magnetic>
          </div>

          <div
            className={`lg:w-[70%] w-[90%] h-auto p-2 ${
              calculateRotation() === 0 ? "border-t" : ""
            } rounded-lg relative lg:mt-[0rem] mt-[2rem]`}
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent z-10 "
              style={{
                transform: `perspective(1000px) rotateX(${calculateRotation()}deg) rotateY(0deg)`,
                transformStyle: "preserve-3d",
              }}
            ></div>
            <Image
              src="/assets/img_placeholder/img_home.png"
              objectFit="contain"
              overrideSrc="/assets/img_placeholder/img_home.png"
              alt="hero"
              className="w-full h-full rounded-lg transform perspective-1000 rotate-x-12 rotate-y-6"
              width={500}
              height={500}
              style={{
                transform: `perspective(1000px) rotateX(${calculateRotation()}deg) rotateY(0deg)`,
                transformStyle: "preserve-3d",
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default HeroArea;
