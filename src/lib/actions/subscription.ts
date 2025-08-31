"use server";

import prisma from "@/lib/prisma";

export const checkSubscriptionStatus = async (userId: string) => {
  try {
    // Buscar la suscripción activa del usuario
    const userSubscription = await prisma.userSubscription.findFirst({
      where: {
        userId: userId,
        isActive: true,
      },
      include: {
        subscription: true,
      },
    });

    if (!userSubscription) {
      return {
        success: false,
        error: "No active subscription found",
        data: null,
      };
    }

    const subscription = userSubscription.subscription;
    const now = new Date();
    const isExpired = now > subscription.endDate;
    const isTrialExpired =
      subscription.trialEndDate && now > subscription.trialEndDate;

    // Calcular días restantes
    const endDate = subscription.trialEndDate || subscription.endDate;
    const timeRemaining = endDate.getTime() - now.getTime();
    const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

    return {
      success: true,
      error: null,
      data: {
        isActive: subscription.isActive && !isExpired,
        isTrial: subscription.status === "TRIAL",
        isTrialExpired: isTrialExpired,
        isExpired: isExpired,
        daysRemaining: Math.max(0, daysRemaining),
        planType: subscription.planType,
        status: subscription.status,
        endDate: subscription.endDate,
        trialEndDate: subscription.trialEndDate,
      },
    };
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return {
      success: false,
      error: "Internal server error",
      data: null,
    };
  }
};
