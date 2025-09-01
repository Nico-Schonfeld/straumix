import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    profileImage?: string;
    provider?: string;
    role?: string;
    isProfileComplete?: boolean;
    createdAt?: Date;

    // Campos para cuentas compartidas
    partnerEmail?: string;
    accountName?: string;
    partnerId?: string;
    partnerFirstName?: string;
    partnerLastName?: string;
    partnerProfileImage?: string;

    // Nuevos campos para relaciones
    coupleId?: string;
    organizationId?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      provider?: string;
      role?: string;
      isProfileComplete?: boolean;
      createdAt?: Date;
      subscriptionStatus?: {
        isActive: boolean;
        isTrial: boolean;
        isTrialExpired: boolean | null;
        isExpired: boolean;
        daysRemaining: number;
        planType: string;
        status: string;
        endDate: Date;
        trialEndDate: Date | null;
      };

      // Campos para cuentas compartidas
      partnerEmail?: string;
      accountName?: string;
      partnerId?: string;
      partnerFirstName?: string;
      partnerLastName?: string;
      partnerProfileImage?: string;

      // Nuevos campos para relaciones
      coupleId?: string;
      organizationId?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    provider?: string;
    role?: string;
    isProfileComplete?: boolean;
    createdAt?: Date;
    subscriptionStatus?: {
      isActive: boolean;
      isTrial: boolean;
      isTrialExpired: boolean | null;
      isExpired: boolean;
      daysRemaining: number;
      planType: string;
      status: string;
      endDate: Date;
      trialEndDate: Date | null;
    };

    // Campos para cuentas compartidas
    partnerEmail?: string;
    accountName?: string;
    partnerId?: string;
    partnerFirstName?: string;
    partnerLastName?: string;
    partnerProfileImage?: string;

    // Nuevos campos para relaciones
    coupleId?: string;
    organizationId?: string;
  }
}
