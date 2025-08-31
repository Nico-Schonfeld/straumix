"use server";

import prisma from "@/lib/prisma";
import { hash, compare } from "bcryptjs";
import { convertPrismaObject } from "@/lib/utils";

export const createInitialAccountAndBudget = async (
  userId: string,
  role: string = "TEST"
) => {
  try {
    // Determinar el tipo de cuenta basado en el rol
    let accountType = "TEST";
    let accountName = "Cuenta de Prueba";
    let accountDescription = "Cuenta de prueba con acceso completo por 14 días";
    let planType = "BASIC";

    switch (role) {
      case "PERSONA":
        accountType = "PERSONAL";
        accountName = "Cuenta Personal";
        accountDescription =
          "Cuenta personal para gestión de gastos individuales";
        planType = "BASIC";
        break;
      case "PAREJA":
        accountType = "COUPLE";
        accountName = "Cuenta de Pareja";
        accountDescription =
          "Cuenta compartida para gestión de gastos de pareja";
        planType = "PREMIUM";
        break;
      case "ORGANIZACION":
        accountType = "ORGANIZATION";
        accountName = "Cuenta Organizacional";
        accountDescription =
          "Cuenta empresarial para gestión de gastos organizacionales";
        planType = "ENTERPRISE";
        break;
      case "TEST":
      default:
        accountType = "TEST";
        accountName = "Cuenta de Prueba";
        accountDescription = "Cuenta de prueba con acceso completo por 14 días";
        planType = "BASIC";
        break;
    }

    // Crear cuenta para el usuario
    const account = await prisma.account.create({
      data: {
        name: accountName,
        type: accountType as any, // Cast a AccountType
        description: accountDescription,
        users: {
          connect: { id: userId },
        },
      },
    });

    // Crear rol de propietario para el usuario en esta cuenta
    await prisma.accountUserRole.create({
      data: {
        userId: userId,
        accountId: account.id,
        role: "OWNER",
      },
    });

    // Obtener el mes y año actual
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() retorna 0-11
    const currentYear = now.getFullYear();

    // Crear presupuesto inicial (por defecto $0, el usuario lo configurará después)
    const budget = await prisma.budget.create({
      data: {
        month: currentMonth,
        year: currentYear,
        totalIncome: 0,
        needsAmount: 0,
        wantsAmount: 0,
        savingsAmount: 0,
        accountId: account.id,
      },
    });

    // Crear suscripción de prueba gratuita (14 días)
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14); // 14 días de prueba
    // trialEndDate.setMinutes(trialEndDate.getMinutes() + 1); // 1 minuto de prueba

    const subscription = await prisma.subscription.create({
      data: {
        planType: planType as any, // Cast a SubscriptionPlan
        status: "TRIAL",
        startDate: new Date(),
        endDate: trialEndDate,
        trialEndDate: trialEndDate,
        amount: 0,
        currency: "ARS",
        billingCycle: "MONTHLY",
        accountId: account.id,
      },
    });

    // Conectar usuario con la suscripción
    await prisma.userSubscription.create({
      data: {
        userId: userId,
        subscriptionId: subscription.id,
        role: "OWNER",
      },
    });

    // Convertir los objetos antes de devolverlos
    const convertedAccount = convertPrismaObject(account);
    const convertedBudget = convertPrismaObject(budget);
    const convertedSubscription = convertPrismaObject(subscription);

    return {
      success: true,
      error: null,
      account: convertedAccount,
      subscription: convertedSubscription,
    };
  } catch (error) {
    console.error("Error creating initial account and budget:", error);
    return {
      success: false,
      error: "Error creating initial account",
      account: null,
      subscription: null,
    };
  }
};

export const findOrCreateGoogleUser = async (profile: any) => {
  try {
    // Buscar usuario por providerId (sub de Google)
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ providerId: profile.sub }, { email: profile.email }],
      },
    });

    if (user) {
      // Si el usuario existe pero no tiene providerId, actualizarlo
      if (!user.providerId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            providerId: profile.sub,
            provider: "google",
            profileImage: profile.picture,
          },
        });
      }

      return {
        success: true,
        error: null,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profileImage: user.profileImage,
          provider: user.provider,
          role: user.role,
          isProfileComplete: user.isProfileComplete,
          createdAt: user.createdAt,
        },
      };
    }

    // Si no existe, crear nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        firstName: profile.given_name || profile.name,
        lastName: profile.family_name || null,
        email: profile.email,
        profileImage: profile.picture,
        provider: "google",
        providerId: profile.sub,
        role: "TEST", // Por defecto rol TEST para acceso de prueba
        isProfileComplete: true, // Ya está listo para usar la app
      },
    });

    // Crear cuenta y presupuesto inicial automáticamente
    const accountResult = await createInitialAccountAndBudget(
      newUser.id,
      "TEST"
    );

    if (!accountResult.success) {
      // Si falla la creación de la cuenta, eliminar el usuario
      await prisma.user.delete({ where: { id: newUser.id } });
      return {
        success: false,
        error: "Error creating initial account",
        user: null,
      };
    }

    return {
      success: true,
      error: null,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profileImage: newUser.profileImage,
        provider: newUser.provider,
        role: newUser.role,
        isProfileComplete: newUser.isProfileComplete,
        createdAt: newUser.createdAt,
      },
    };
  } catch (error) {
    console.error("Error finding/creating Google user:", error);
    return {
      success: false,
      error: "Internal server error",
      user: null,
    };
  }
};

export const updateUserRole = async (userId: string, newRole: string) => {
  try {
    // Verificar que el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return {
        success: false,
        error: "Usuario no encontrado",
      };
    }

    // Actualizar el rol del usuario
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: newRole as any, // Cast a UserRole
        isProfileComplete: true,
      },
    });

    // Si el usuario ya tiene una cuenta, actualizar el tipo de cuenta
    const existingAccount = await prisma.account.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (existingAccount) {
      // Determinar el nuevo tipo de cuenta basado en el rol
      let newAccountType = "TEST";
      let newAccountName = "Cuenta de Prueba";
      let newAccountDescription =
        "Cuenta de prueba con acceso completo por 14 días";

      switch (newRole) {
        case "PERSONA":
          newAccountType = "PERSONAL";
          newAccountName = "Cuenta Personal";
          newAccountDescription =
            "Cuenta personal para gestión de gastos individuales";
          break;
        case "PAREJA":
          newAccountType = "COUPLE";
          newAccountName = "Cuenta de Pareja";
          newAccountDescription =
            "Cuenta compartida para gestión de gastos de pareja";
          break;
        case "ORGANIZACION":
          newAccountType = "ORGANIZATION";
          newAccountName = "Cuenta Organizacional";
          newAccountDescription =
            "Cuenta empresarial para gestión de gastos organizacionales";
          break;
        case "TEST":
        default:
          newAccountType = "TEST";
          newAccountName = "Cuenta de Prueba";
          newAccountDescription =
            "Cuenta de prueba con acceso completo por 14 días";
          break;
      }

      // Actualizar la cuenta existente
      await prisma.account.update({
        where: { id: existingAccount.id },
        data: {
          type: newAccountType as any,
          name: newAccountName,
          description: newAccountDescription,
        },
      });

      // Actualizar la suscripción si existe
      const existingSubscription = await prisma.subscription.findFirst({
        where: { accountId: existingAccount.id },
      });

      if (existingSubscription) {
        let newPlanType = "BASIC";
        switch (newRole) {
          case "PERSONA":
            newPlanType = "BASIC";
            break;
          case "PAREJA":
            newPlanType = "PREMIUM";
            break;
          case "ORGANIZACION":
            newPlanType = "ENTERPRISE";
            break;
          case "TEST":
          default:
            newPlanType = "BASIC";
            break;
        }

        await prisma.subscription.update({
          where: { id: existingSubscription.id },
          data: {
            planType: newPlanType as any,
          },
        });
      }
    }

    return {
      success: true,
      error: null,
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
        provider: updatedUser.provider,
        role: updatedUser.role,
        isProfileComplete: updatedUser.isProfileComplete,
        createdAt: updatedUser.createdAt,
      },
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      error: "Error interno del servidor",
      user: null,
    };
  }
};
