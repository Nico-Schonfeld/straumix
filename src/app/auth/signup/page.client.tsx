"use client";

import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import CustomLink from "@/components/ui/CustomLink";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoWave, LogoStraumix } from "@/components/ui/Icons/LogoStraumix";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SignupClient = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const [nextSteps, setNextSteps] = React.useState<boolean>(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Estado para guardar la altura de la pantalla
  const [screenHeight, setScreenHeight] = React.useState<number>(0);

  const LogoWaveOnboardin = ({
    styles,
    w = 85,
    h = 72,
    wave1 = "#E1EACD",
    wave2 = "#BAD8B6",
    wave3 = "#61B390",
  }: {
    styles?: string;
    w?: number;
    h?: number;
    wave1?: string;
    wave2?: string;
    wave3?: string;
  }) => {
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 85 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles}
      >
        <motion.path
          initial={{
            strokeDasharray: "0 1000",
            strokeDashoffset: 0,
            opacity: 0,
            fill: "none",
          }}
          animate={{
            strokeDasharray: "1000 0",
            strokeDashoffset: 0,
            opacity: 1,
            fill: wave1,
          }}
          transition={{
            strokeDasharray: { delay: 0, duration: 0.8, ease: "easeInOut" },
            opacity: { delay: 0, duration: 0.4, ease: "easeIn" },
            fill: { delay: 0.3, duration: 0.4, ease: "easeIn" },
          }}
          d="M67.1884 12.5957C60.0686 11.5131 52.7906 12.2459 46.0295 14.7261L44.6335 15.2587C35.4838 18.9666 25.5033 20.1375 15.7438 18.648C11.5557 18.0024 7.18993 16.9614 3.36488 15.0529C1.97108 14.3622 0.896742 13.1613 0.364828 11.6995C-0.167086 10.2377 -0.115732 8.62723 0.50823 7.20229C1.13219 5.77735 2.28085 4.64736 3.71583 4.04684C5.1508 3.44632 6.76191 3.42138 8.21479 3.97718L8.74739 4.2112C11.4992 5.50236 14.5979 6.2246 17.5837 6.68457C23.0066 7.51575 30.4267 7.57224 38.7426 4.55013L40.1386 4.01753C49.2883 0.309556 59.2689 -0.861346 69.0283 0.62824C73.2165 1.27382 77.5782 2.31885 81.3992 4.21927C82.8267 4.94744 83.9108 6.20736 84.418 7.72745C84.9252 9.24753 84.8148 10.9061 84.1106 12.3455C82.6217 15.3273 79.5835 16.0051 76.0207 15.065L67.1884 12.5957Z"
          stroke={wave1}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          initial={{
            strokeDasharray: "0 1000",
            strokeDashoffset: 0,
            opacity: 0,
            fill: "none",
          }}
          animate={{
            strokeDasharray: "1000 0",
            strokeDashoffset: 0,
            opacity: 1,
            fill: wave2,
          }}
          transition={{
            strokeDasharray: { delay: 0.2, duration: 0.8, ease: "easeInOut" },
            opacity: { delay: 0.2, duration: 0.4, ease: "easeIn" },
            fill: { delay: 0.6, duration: 0.4, ease: "easeIn" },
          }}
          d="M67.1884 38.9576C60.0685 37.875 52.7906 38.6078 46.0295 41.088L44.6335 41.6206C35.4838 45.3285 25.5033 46.4994 15.7438 45.0099C11.5557 44.3643 7.18993 43.3233 3.36488 41.4148C1.97108 40.7241 0.896742 39.5232 0.364828 38.0614C-0.167086 36.5996 -0.115732 34.9891 0.50823 33.5642C1.13219 32.1393 2.28085 31.0093 3.71583 30.4087C5.1508 29.8082 6.76191 29.7833 8.21479 30.3391L8.74739 30.5731C11.4992 31.8643 14.5979 32.5865 17.5837 33.0465C23.0066 33.8777 30.4267 33.9342 38.7426 30.912L40.1386 30.3794C49.2883 26.6715 59.2688 25.5006 69.0283 26.9901C73.2165 27.6357 77.5782 28.6808 81.3992 30.5812C82.8266 31.3093 83.9108 32.5693 84.418 34.0894C84.9252 35.6094 84.8148 37.268 84.1106 38.7074C82.6217 41.6892 79.5835 42.367 76.0207 41.4269L67.1884 38.9576Z"
          stroke={wave2}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          initial={{
            strokeDasharray: "0 1000",
            strokeDashoffset: 0,
            opacity: 0,
            fill: "none",
          }}
          animate={{
            strokeDasharray: "1000 0",
            strokeDashoffset: 0,
            opacity: 1,
            fill: wave3,
          }}
          transition={{
            strokeDasharray: { delay: 0.4, duration: 0.8, ease: "easeInOut" },
            opacity: { delay: 0.4, duration: 0.4, ease: "easeIn" },
            fill: { delay: 0.9, duration: 0.4, ease: "easeIn" },
          }}
          d="M67.1884 65.3195C60.0686 64.2369 52.7906 64.9697 46.0295 67.4499L44.6335 67.9825C35.4838 71.6905 25.5033 72.8614 15.7438 71.3718C11.5557 70.7262 7.18993 69.6852 3.36488 67.7767C1.97108 67.086 0.896742 65.8851 0.364828 64.4233C-0.167086 62.9615 -0.115732 61.351 0.50823 59.9261C1.13219 58.5012 2.28085 57.3712 3.71583 56.7707C5.1508 56.1701 6.76191 56.1452 8.21479 56.701L8.74739 56.935C11.4992 58.2262 14.5979 58.9484 17.5837 59.4084C23.0066 60.2396 30.4267 60.2961 38.7426 57.2739L40.1386 56.7413C49.2883 53.0334 59.2689 51.8625 69.0283 53.3521C73.2165 53.9976 77.5782 55.0427 81.3992 56.9431C82.8267 57.6713 83.9108 58.9312 84.418 60.4513C84.9252 61.9714 84.8148 63.6299 84.1106 65.0693C82.6217 68.0511 79.5835 68.7289 76.0207 67.7888L67.1884 65.3195Z"
          stroke={wave3}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  function LogoStraumixOnboardinSinWave({
    styles,
    w = 192,
    h = 53,
    fill = "#08121E",
  }: {
    styles?: string;
    w?: number;
    h?: number;
    fill?: string;
  }) {
    return (
      <svg
        width="148"
        height="26"
        viewBox="0 0 148 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M130.091 25L134.465 16.5757L130.091 8.15137H136.636L138.807 13.3356H138.872L141.043 8.15137H147.588L143.214 16.5757L147.588 25H141.043L138.872 19.8158H138.807L136.636 25H130.091Z"
          fill="white"
        />
        <path
          d="M120.731 25V9.1234H127.211V25H120.731ZM123.971 7.17933C122.848 7.17933 121.973 6.89852 121.347 6.3369C120.72 5.75368 120.407 4.95445 120.407 3.93922C120.407 2.92398 120.72 2.13555 121.347 1.57393C121.973 0.990707 122.848 0.699097 123.971 0.699097C125.095 0.699097 125.969 0.990707 126.596 1.57393C127.222 2.13555 127.535 2.92398 127.535 3.93922C127.535 4.95445 127.222 5.75368 126.596 6.3369C125.969 6.89852 125.095 7.17933 123.971 7.17933Z"
          fill="white"
        />
        <path
          d="M92.147 25V8.1514H98.044L98.1088 10.4195H98.1736C98.8216 9.53385 99.5236 8.88583 100.28 8.47542C101.036 8.0434 101.889 7.82739 102.839 7.82739C103.833 7.82739 104.675 8.0434 105.367 8.47542C106.058 8.90743 106.587 9.55546 106.954 10.4195H107.019C107.797 9.46905 108.574 8.79943 109.352 8.41061C110.13 8.0218 111.08 7.82739 112.203 7.82739C113.953 7.82739 115.206 8.33501 115.962 9.35025C116.718 10.3439 117.096 11.9963 117.096 14.3076V25H110.875V15.2797C110.875 14.5236 110.756 13.962 110.518 13.5948C110.302 13.206 109.978 13.0116 109.546 13.0116C109.028 13.0116 108.596 13.26 108.25 13.7568C107.905 14.232 107.732 14.8476 107.732 15.6037V25H101.511V15.2797C101.511 14.5236 101.392 13.962 101.155 13.5948C100.938 13.206 100.614 13.0116 100.182 13.0116C99.664 13.0116 99.232 13.26 98.8864 13.7568C98.5408 14.232 98.368 14.8476 98.368 15.6037V25H92.147Z"
          fill="white"
        />
        <path
          d="M77.3012 25.324C75.3355 25.324 73.9206 24.7516 73.0566 23.6067C72.2142 22.4403 71.793 20.5286 71.793 17.8717V8.15137H78.1436V16.5757C78.1436 17.8285 78.284 18.7358 78.5648 19.2974C78.8456 19.859 79.2884 20.1398 79.8933 20.1398C80.3469 20.1398 80.7465 20.021 81.0921 19.7834C81.4593 19.5458 81.7509 19.2326 81.9669 18.8438C82.1829 18.4549 82.291 18.0229 82.291 17.5477V8.15137H88.6416V25H82.615L82.5502 22.7319H82.4854C81.7509 23.6607 80.9841 24.3304 80.1849 24.7408C79.4072 25.1296 78.446 25.324 77.3012 25.324Z"
          fill="white"
        />
        <path
          d="M57.6598 25.324C56.0829 25.324 54.8193 24.8596 53.8688 23.9308C52.94 22.9803 52.4756 21.7167 52.4756 20.1398C52.4756 18.2822 53.21 16.8457 54.6789 15.8305C56.1477 14.8152 58.2214 14.3076 60.8999 14.3076H62.6496C62.6496 13.5732 62.4552 13.0656 62.0663 12.7848C61.6991 12.504 61.0295 12.3636 60.0575 12.3636C59.0422 12.3636 58.0054 12.4932 56.9469 12.7524C55.9101 12.99 54.8733 13.3572 53.8364 13.854L53.156 9.31785C54.3441 8.79943 55.5537 8.42141 56.7849 8.18381C58.0378 7.9462 59.4202 7.82739 60.9323 7.82739C62.9196 7.82739 64.4964 8.0434 65.6629 8.47542C66.8509 8.88583 67.7041 9.56626 68.2226 10.5167C68.741 11.4671 69.0002 12.7308 69.0002 14.3076V25H62.9736L62.9088 23.0559H62.844C62.2175 23.7688 61.4507 24.3304 60.5435 24.7408C59.6362 25.1296 58.675 25.324 57.6598 25.324ZM60.1223 20.9499C60.6407 20.9499 61.0835 20.8743 61.4507 20.7231C61.8395 20.5503 62.1311 20.3234 62.3255 20.0426C62.5416 19.7402 62.6496 19.3946 62.6496 19.0058V17.7098H61.8719C60.5975 17.7098 59.6578 17.8502 59.053 18.131C58.4698 18.4118 58.1782 18.8654 58.1782 19.4918C58.1782 19.967 58.3402 20.3343 58.6642 20.5935C59.0098 20.8311 59.4958 20.9499 60.1223 20.9499Z"
          fill="white"
        />
        <path
          d="M38.103 25V8.1514H44.1945L44.2593 11.0675H44.3241C44.9721 10.3547 45.6633 9.76066 46.3977 9.28545C47.1538 8.78863 47.953 8.42141 48.7954 8.18381C49.6378 7.9462 50.5019 7.82739 51.3875 7.82739V13.0116C50.1347 13.0116 48.979 13.2276 47.9206 13.6596C46.8837 14.0916 46.0521 14.6748 45.4257 15.4093C44.8209 16.1437 44.5185 16.9645 44.5185 17.8718V25H38.103Z"
          fill="white"
        />
        <path
          d="M30.4858 25.324C28.153 25.324 26.4573 24.8596 25.3989 23.9308C24.362 23.0019 23.8436 21.5223 23.8436 19.4918V12.6876H20.7007V8.15139H23.8436V2.64319H30.259V8.15139H34.9572V12.6876H30.259V18.5198C30.259 19.2542 30.3778 19.7618 30.6154 20.0426C30.8747 20.3234 31.3175 20.4638 31.9439 20.4638C32.3327 20.4638 32.7431 20.4206 33.1751 20.3342C33.6072 20.2478 34.0068 20.129 34.374 19.9778L34.86 24.676C34.0608 24.892 33.3263 25.054 32.6567 25.162C31.9871 25.27 31.2635 25.324 30.4858 25.324Z"
          fill="white"
        />
        <path
          d="M9.95141 25.324C8.18015 25.324 6.48449 25.1404 4.86443 24.7731C3.24437 24.4059 1.90512 23.8983 0.84668 23.2503L2.20753 17.7421C2.96356 18.1525 3.81679 18.5305 4.76722 18.8761C5.73926 19.2217 6.71129 19.4917 7.68333 19.6862C8.67697 19.8806 9.5734 19.9778 10.3726 19.9778C11.3231 19.9778 12.0467 19.8266 12.5435 19.5241C13.0403 19.2217 13.2887 18.7789 13.2887 18.1957C13.2887 17.9149 13.2131 17.6665 13.0619 17.4505C12.9107 17.2129 12.6515 16.9969 12.2843 16.8024C11.9171 16.5864 11.3987 16.3704 10.729 16.1544C10.081 15.9168 9.24939 15.6576 8.23415 15.3768C6.9597 15.0312 5.85806 14.6208 4.92923 14.1455C4.00039 13.6703 3.23357 13.1303 2.62874 12.5255C2.02392 11.9207 1.57031 11.2402 1.2679 10.4842C0.987085 9.72819 0.84668 8.89656 0.84668 7.98932C0.84668 5.74284 1.71071 4.02558 3.43877 2.83754C5.18844 1.62789 7.68333 1.02307 10.9234 1.02307C12.5003 1.02307 14.0556 1.16348 15.5892 1.44428C17.1445 1.70349 18.4945 2.08151 19.6394 2.57833L18.2785 8.08653C17.1121 7.52491 15.8808 7.10369 14.5848 6.82288C13.3103 6.52047 12.0575 6.36926 10.8262 6.36926C9.7462 6.36926 8.94697 6.49887 8.42856 6.75808C7.91014 6.99569 7.65093 7.3953 7.65093 7.95692C7.65093 8.25933 7.71573 8.54014 7.84533 8.79935C7.97494 9.03696 8.21255 9.26377 8.55816 9.47978C8.90377 9.69579 9.37899 9.9226 9.98381 10.1602C10.6102 10.3978 11.4095 10.657 12.3815 10.9378C13.764 11.3482 14.9412 11.7911 15.9132 12.2663C16.8853 12.7415 17.6737 13.2707 18.2785 13.8539C18.9049 14.4156 19.3586 15.0636 19.6394 15.798C19.9418 16.5108 20.093 17.3101 20.093 18.1957C20.093 20.4854 19.2073 22.2458 17.4361 23.4771C15.6864 24.7083 13.1915 25.324 9.95141 25.324Z"
          fill="white"
        />
      </svg>
    );
  }

  // Función para obtener y actualizar la altura de la pantalla
  const updateScreenHeight = () => {
    setScreenHeight(window.innerHeight);
  };

  // Effect para obtener la altura inicial y escuchar cambios de tamaño
  React.useEffect(() => {
    // Establecer altura inicial
    updateScreenHeight();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", updateScreenHeight);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateScreenHeight);
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsAnimating(true);
    }, 3000);
  }, []);

  // Función para manejar el inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Error al iniciar sesióasn con Google:", error);
    }
  };

  return (
    <>
      {!isAnimating ? (
        <AnimatePresence>
          <motion.div
            className="relative w-screen h-screen flex items-center justify-center bg-[#01352C]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex items-center justify-center">
              {/* Contenedor del icono con fondo verde para ocultar el texto */}
              <motion.div
                initial={{
                  width: "100px",
                  height: "100px",
                  x: 80,
                }}
                animate={{
                  width: "32px",
                  height: "32px",
                  x: -0,
                }}
                transition={{
                  delay: 1.5,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="relative z-20 bg-[#01352C] rounded-lg flex items-center justify-center"
              >
                <LogoWaveOnboardin styles="w-full h-full" />
              </motion.div>

              {/* Texto del logo que aparece por detrás */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -50,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                transition={{
                  delay: 1.8,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="ml-2"
              >
                <LogoStraumixOnboardinSinWave />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          {nextSteps ? (
            <motion.section
              className="min-h-screen w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full relative flex flex-col items-center justify-center text-center bg-[#01352C]">
                <div className="flex items-center gap-2 absolute">
                  <LogoWave w={32} />

                  <LogoStraumixOnboardinSinWave />
                </div>
                <img
                  src="/assets/auth/img_onboardin_1.png"
                  alt="logo"
                  className={`w-screen object-cover min-h-[50vh] max-h-[65vh] ${
                    screenHeight < 700 ? "h-[50vh]" : "h-[65vh]"
                  }`}
                />
              </div>

              <div className="w-full h-full container mx-auto px-6 py-8 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-medium text-black dark:text-white text-center mb-4 leading-tight">
                  Bienvenido
                </h1>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-300 mb-8 max-w-sm md:max-w-md leading-relaxed">
                  Gestiona tus gastos. Organiza tus necesidades, deseos y
                  ahorros de manera inteligente.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-sm">
                  <Button
                    variant="default"
                    className="w-full sm:flex-1 bg-white text-black"
                    onClick={handleGoogleSignIn}
                  >
                    <svg
                      data-testid="geist-icon"
                      height="16"
                      strokeLinejoin="round"
                      style={{ color: "currentColor" }}
                      viewBox="0 0 16 16"
                      width="16"
                    >
                      <path
                        d="M8.15991 6.54543V9.64362H12.4654C12.2763 10.64 11.709 11.4837 10.8581 12.0509L13.4544 14.0655C14.9671 12.6692 15.8399 10.6182 15.8399 8.18188C15.8399 7.61461 15.789 7.06911 15.6944 6.54552L8.15991 6.54543Z"
                        fill="#4285F4"
                      ></path>
                      <path
                        d="M3.6764 9.52268L3.09083 9.97093L1.01807 11.5855C2.33443 14.1963 5.03241 16 8.15966 16C10.3196 16 12.1305 15.2873 13.4542 14.0655L10.8578 12.0509C10.1451 12.5309 9.23598 12.8219 8.15966 12.8219C6.07967 12.8219 4.31245 11.4182 3.67967 9.5273L3.6764 9.52268Z"
                        fill="#34A853"
                      ></path>
                      <path
                        d="M1.01803 4.41455C0.472607 5.49087 0.159912 6.70543 0.159912 7.99995C0.159912 9.29447 0.472607 10.509 1.01803 11.5854C1.01803 11.5926 3.6799 9.51991 3.6799 9.51991C3.5199 9.03991 3.42532 8.53085 3.42532 7.99987C3.42532 7.46889 3.5199 6.95983 3.6799 6.47983L1.01803 4.41455Z"
                        fill="#FBBC05"
                      ></path>
                      <path
                        d="M8.15982 3.18545C9.33802 3.18545 10.3853 3.59271 11.2216 4.37818L13.5125 2.0873C12.1234 0.792777 10.3199 0 8.15982 0C5.03257 0 2.33443 1.79636 1.01807 4.41455L3.67985 6.48001C4.31254 4.58908 6.07983 3.18545 8.15982 3.18545Z"
                        fill="#EA4335"
                      ></path>
                    </svg>{" "}
                    Continuar con Google
                  </Button>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.section
              className="min-h-screen w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full relative flex flex-col items-center justify-center text-center bg-[#01352C]">
                <div className="flex items-center gap-2 absolute">
                  <LogoWave w={32} />

                  <LogoStraumixOnboardinSinWave />
                </div>
                <img
                  src="/assets/auth/img_onboardin_1.png"
                  alt="logo"
                  className={`w-screen object-cover min-h-[50vh] max-h-[65vh] ${
                    screenHeight < 700 ? "h-[50vh]" : "h-[65vh]"
                  }`}
                />
              </div>

              <div className="w-full h-full container mx-auto px-6 py-8 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-medium text-black dark:text-white text-center mb-4 leading-tight">
                  Bienvenido
                </h1>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-300 mb-8 max-w-sm md:max-w-md leading-relaxed">
                  Gestiona tus gastos. Organiza tus necesidades, deseos y
                  ahorros de manera inteligente.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-sm">
                  <Button
                    variant="default"
                    className="w-full sm:flex-1"
                    onClick={() => setNextSteps(true)}
                  >
                    Siguiente <ArrowRight className="mt-[0.2rem]" />
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full sm:flex-1"
                    onClick={() => router.push("/")}
                  >
                    Volver
                  </Button>
                </div>
              </div>
            </motion.section>
          )}
        </>
      )}
    </>
  );
};

export default SignupClient;
