"use client";

import React from "react";
import { useSessionData } from "@/hooks/use-session-data";
import SubscriptionExpired from "@/components/webapp/SubscriptionExpired";
import DebugDates from "@/components/debug/DebugDates";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const WebAppPageClient = () => {
  const sessionData = useSessionData();
  const loading = sessionData.isLoading;
  const sessionExpired =
    sessionData.subscription && sessionData.utils.isExpiredOrTrialExpired;

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <DebugDates />

          {sessionExpired ? (
            <>
              <SubscriptionExpired />

              <pre>{JSON.stringify(sessionData, null, 2)}</pre>

              <Button onClick={() => signOut()}>Cerrar sesión</Button>
            </>
          ) : (
            <>
              <pre>{JSON.stringify(sessionData, null, 2)}</pre>

              <Button onClick={() => signOut()}>Cerrar sesión</Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default WebAppPageClient;
// import React, { useState, useEffect } from "react";
// import { useSessionData } from "@/hooks/use-session-data";
// import RoleSelection from "@/components/webapp/RoleSelection";
// import AccountSetup from "@/components/webapp/AccountSetup";
// import Dashboard from "@/components/webapp/Dashboard";
// import SubscriptionExpired from "@/components/webapp/SubscriptionExpired";

// const WebAppPageClient = () => {
//   const sessionData = useSessionData();
//   const [onboardingStep, setOnboardingStep] = useState<string>("loading");

//   useEffect(() => {
//     if (sessionData.isLoading) {
//       setOnboardingStep("loading");
//       return;
//     }

//     if (!sessionData.isAuthenticated) {
//       setOnboardingStep("unauthenticated");
//       return;
//     }

//     // Verificar si la suscripción está expirada
//     if (sessionData.subscription && sessionData.utils.isExpiredOrTrialExpired) {
//       setOnboardingStep("subscription_expired");
//       return;
//     }

//     // Verificar si el perfil está completo
//     if (!sessionData.user.isProfileComplete) {
//       setOnboardingStep("role_selection");
//       return;
//     }

//     // Si todo está bien, mostrar el dashboard
//     setOnboardingStep("dashboard");
//   }, [sessionData]);

//   const handleRoleSelectionComplete = () => {
//     setOnboardingStep("account_setup");
//   };

//   const handleAccountSetupComplete = () => {
//     setOnboardingStep("dashboard");
//   };

//   // Mostrar loading mientras se carga la sesión
//   if (onboardingStep === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Cargando...</p>
//         </div>
//       </div>
//     );
//   }

//   // Usuario no autenticado
//   if (onboardingStep === "unauthenticated") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">
//             Acceso requerido
//           </h1>
//           <p className="text-gray-600 mb-4">
//             Necesitas iniciar sesión para acceder a Straumix
//           </p>
//           <a
//             href="/auth/signup"
//             className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Iniciar sesión
//           </a>
//         </div>
//       </div>
//     );
//   }

//   // Suscripción expirada
//   if (onboardingStep === "subscription_expired") {
//     return <SubscriptionExpired />;
//   }

//   // Selección de rol
//   if (onboardingStep === "role_selection") {
//     return <RoleSelection onComplete={handleRoleSelectionComplete} />;
//   }

//   // Configuración de cuenta
//   if (onboardingStep === "account_setup") {
//     return <AccountSetup onComplete={handleAccountSetupComplete} />;
//   }

//   // Dashboard principal
//   if (onboardingStep === "dashboard") {
//     return (
//       <Dashboard onSetupBudget={() => setOnboardingStep("account_setup")} />
//     );
//   }

//   // Fallback
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">
//           Error inesperado
//         </h1>
//         <p className="text-gray-600">
//           Algo salió mal. Por favor, recarga la página.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default WebAppPageClient;
