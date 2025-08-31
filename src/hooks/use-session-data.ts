import { useSession } from "next-auth/react";

export const useSessionData = () => {
  const { data: session, status } = useSession();

  // Información básica del usuario
  const user = session?.user;
  const subscriptionStatus = session?.user?.subscriptionStatus;

  return {
    // Estado de la sesión
    isAuthenticated: !!user,
    isLoading: status === "loading",
    status: status,

    // Información del usuario
    user: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      image: user?.image,
      role: user?.role,
      provider: user?.provider,
      isProfileComplete: user?.isProfileComplete,
      createdAt: user?.createdAt,
    },

    // Información de suscripción
    subscription: subscriptionStatus
      ? {
          isActive: subscriptionStatus.isActive,
          isTrial: subscriptionStatus.isTrial,
          isTrialExpired: subscriptionStatus.isTrialExpired,
          isExpired: subscriptionStatus.isExpired,
          daysRemaining: subscriptionStatus.daysRemaining,
          planType: subscriptionStatus.planType,
          status: subscriptionStatus.status,
          endDate: subscriptionStatus.endDate,
          trialEndDate: subscriptionStatus.trialEndDate,
        }
      : null,

    // Utilidades calculadas
    utils: {
      hasActiveSubscription:
        subscriptionStatus?.isActive && !subscriptionStatus?.isExpired,
      isNearExpiration: (subscriptionStatus?.daysRemaining || 0) <= 7,
      isExpiredOrNearExpiration:
        subscriptionStatus?.isExpired ||
        false ||
        (subscriptionStatus?.daysRemaining || 0) <= 7,
      isExpiredOrTrialExpired:
        subscriptionStatus?.isExpired ||
        false ||
        subscriptionStatus?.isTrialExpired ||
        false,
      isTestUser: user?.role === "TEST",
      isPersonalUser: user?.role === "PERSONA",
      isCoupleUser: user?.role === "PAREJA",
      isOrganizationUser: user?.role === "ORGANIZACION",
      canAccessFullFeatures:
        !subscriptionStatus?.isExpired && !subscriptionStatus?.isTrialExpired,
    },

    // Información de debug
    debug: {
      currentTime: new Date(),
      subscriptionEndDate: subscriptionStatus?.endDate,
      subscriptionTrialEndDate: subscriptionStatus?.trialEndDate,
    },
  };
};
