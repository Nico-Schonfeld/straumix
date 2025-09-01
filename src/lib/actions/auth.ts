"use server";

import prisma from "@/lib/prisma";
import { hash, compare } from "bcryptjs";
import { convertPrismaObject } from "@/lib/utils";
import { sendInvitationEmail, sendWelcomeEmail } from "@/lib/actions/email";

export const createInitialAccountAndBudget = async (
  userId: string,
  role: string = "PERSONAL"
) => {
  try {
    console.log("🔍 createInitialAccountAndBudget iniciado:", { userId, role });

    // Determinar el tipo de cuenta basado en el rol
    let accountType = "PERSONAL";
    let accountName = "Cuenta Personal";
    let accountDescription =
      "Cuenta personal para gestión de gastos individuales";
    let planType = "BASIC";

    switch (role) {
      case "PERSONAL":
        accountType = "PERSONAL";
        accountName = "Cuenta Personal";
        accountDescription =
          "Cuenta personal para gestión de gastos individuales";
        planType = "BASIC";
        break;
      case "COUPLE":
        accountType = "COUPLE";
        accountName = "Cuenta de Pareja";
        accountDescription =
          "Cuenta compartida para gestión de gastos de pareja";
        planType = "PREMIUM";
        break;
      case "ORGANIZATION":
        accountType = "ORGANIZATION";
        accountName = "Cuenta Organizacional";
        accountDescription =
          "Cuenta empresarial para gestión de gastos organizacionales";
        planType = "ENTERPRISE";
        break;
      default:
        accountType = "PERSONAL";
        accountName = "Cuenta Personal";
        accountDescription =
          "Cuenta personal para gestión de gastos individuales";
        planType = "BASIC";
        break;
    }

    console.log("📝 Configuración de cuenta:", {
      accountType,
      accountName,
      planType,
    });

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

    console.log("✅ Cuenta creada:", account.id);

    // Crear rol de propietario para el usuario en esta cuenta
    await prisma.accountUserRole.create({
      data: {
        userId: userId,
        accountId: account.id,
        role: "OWNER",
      },
    });

    console.log("✅ Rol de propietario creado");

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

    console.log("✅ Presupuesto inicial creado");

    // Crear suscripción de prueba gratuita (14 días)
    const trialEndDate = new Date();
    // trialEndDate.setMinutes(trialEndDate.getMinutes() + 1); // 1 minuto de prueba
    trialEndDate.setDate(trialEndDate.getDate() + 14); // 14 días de prueba

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

    console.log("✅ Suscripción de prueba creada:", subscription.id);

    // Conectar usuario con la suscripción
    await prisma.userSubscription.create({
      data: {
        userId: userId,
        subscriptionId: subscription.id,
        role: "OWNER",
      },
    });

    console.log("✅ Usuario conectado con suscripción");

    // Convertir los objetos antes de devolverlos
    const convertedAccount = convertPrismaObject(account);
    const convertedBudget = convertPrismaObject(budget);
    const convertedSubscription = convertPrismaObject(subscription);

    console.log("🎉 createInitialAccountAndBudget completado exitosamente");
    return {
      success: true,
      error: null,
      account: convertedAccount,
      subscription: convertedSubscription,
    };
  } catch (error) {
    console.error("❌ Error creating initial account and budget:", error);
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
    console.log("🔍 findOrCreateGoogleUser iniciado:", {
      email: profile.email,
      sub: profile.sub,
    });

    // Buscar usuario por providerId (sub de Google)
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ providerId: profile.sub }, { email: profile.email }],
      },
    });

    if (user) {
      console.log("✅ Usuario existente encontrado:", user.id);
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
        console.log("✅ Usuario actualizado con providerId");
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

    console.log("🆕 Creando nuevo usuario...");
    // Si no existe, crear nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        firstName: profile.given_name || profile.name,
        lastName: profile.family_name || null,
        email: profile.email,
        profileImage: profile.picture,
        provider: "google",
        providerId: profile.sub,
        role: "PERSONAL", // Por defecto rol PERSONAL para acceso básico
        isProfileComplete: true, // Ya está listo para usar la app
      },
    });

    console.log("✅ Nuevo usuario creado:", newUser.id);

    // Crear cuenta y presupuesto inicial automáticamente
    const accountResult = await createInitialAccountAndBudget(
      newUser.id,
      "PERSONAL"
    );

    if (!accountResult.success) {
      console.log("❌ Error creando cuenta inicial, eliminando usuario");
      // Si falla la creación de la cuenta, eliminar el usuario
      await prisma.user.delete({ where: { id: newUser.id } });
      return {
        success: false,
        error: "Error creating initial account",
        user: null,
      };
    }

    console.log("✅ Cuenta inicial creada exitosamente");
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
    console.error("❌ Error finding/creating Google user:", error);
    return {
      success: false,
      error: "Internal server error",
      user: null,
    };
  }
};

// TODO: Revisar si esta funcionando correctamente
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
      let newAccountType = "TRIAL";
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
        case "TRIAL":
        default:
          newAccountType = "TRIAL";
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
          case "TRIAL":
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

export const updateUserRoleAndPartnerInfo = async (data: {
  userId: string;
  newRole: string;
  partnerEmail?: string;
  accountName?: string;
  partnerId?: string;
  partnerFirstName?: string;
  partnerLastName?: string;
  partnerProfileImage?: string;
}) => {
  try {
    const {
      userId,
      newRole,
      partnerEmail,
      accountName,
      partnerId,
      partnerFirstName,
      partnerLastName,
      partnerProfileImage,
    } = data;

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

    // Preparar los datos de actualización
    const updateData: any = {
      role: newRole as any,
      isProfileComplete: true,
    };

    // Solo agregar datos de pareja si el rol es PAREJA
    if (newRole === "PAREJA") {
      updateData.partnerEmail = partnerEmail;
      updateData.accountName = accountName;
      updateData.partnerId = partnerId;
      updateData.partnerFirstName = partnerFirstName;
      updateData.partnerLastName = partnerLastName;
      updateData.partnerProfileImage = partnerProfileImage;
    } else {
      // Limpiar datos de pareja si cambia a otro rol
      updateData.partnerEmail = null;
      updateData.accountName = null;
      updateData.partnerId = null;
      updateData.partnerFirstName = null;
      updateData.partnerLastName = null;
      updateData.partnerProfileImage = null;
    }

    // Actualizar el usuario
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Actualizar cuenta y suscripción (código existente)
    // ... resto de la lógica de actualización de cuenta y suscripción ...

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
        partnerEmail: updatedUser.partnerEmail,
        accountName: updatedUser.accountName,
        partnerId: updatedUser.partnerId,
        partnerFirstName: updatedUser.partnerFirstName,
        partnerLastName: updatedUser.partnerLastName,
        partnerProfileImage: updatedUser.partnerProfileImage,
      },
    };
  } catch (error) {
    console.error("Error updating user role and partner info:", error);
    return {
      success: false,
      error: "Error interno del servidor",
      user: null,
    };
  }
};

export const updateUserRoleWithRelations = async (data: {
  userId: string;
  newRole: string;
  // Datos para pareja
  partnerEmail?: string;
  accountName?: string;
  partnerFirstName?: string;
  partnerLastName?: string;
  partnerProfileImage?: string;
  // Datos para organización
  organizationName?: string;
  organizationType?: string;
  organizationSize?: string;
  organizationDescription?: string;
}) => {
  try {
    const {
      userId,
      newRole,
      partnerEmail,
      accountName,
      partnerFirstName,
      partnerLastName,
      partnerProfileImage,
      organizationName,
      organizationType,
      organizationSize,
      organizationDescription,
    } = data;

    console.log("🔍 updateUserRoleWithRelations iniciado:", {
      userId,
      newRole,
      partnerEmail,
      accountName,
      organizationName,
    });

    // Verificar que el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: {
          include: {
            subscription: true,
          },
        },
      },
    });

    if (!existingUser) {
      console.log("❌ Usuario no encontrado:", userId);
      return {
        success: false,
        error: "Usuario no encontrado",
      };
    }

    console.log(
      "✅ Usuario encontrado:",
      existingUser.id,
      "Rol actual:",
      existingUser.role
    );

    // Iniciar transacción para asegurar consistencia
    const result = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el usuario
      const updateData: any = {
        role: newRole as any,
        isProfileComplete: true,
      };

      // Limpiar datos anteriores
      updateData.partnerEmail = null;
      updateData.accountName = null;
      updateData.partnerId = null;
      updateData.partnerFirstName = null;
      updateData.partnerLastName = null;
      updateData.partnerProfileImage = null;
      updateData.coupleId = null;
      updateData.organizationId = null;

      // 2. Manejar datos específicos según el rol
      if (newRole === "COUPLE" && partnerEmail && accountName) {
        console.log("👫 Configurando cuenta de pareja...");

        // Buscar o crear pareja
        let couple = await tx.couple.findFirst({
          where: { name: accountName },
        });

        if (!couple) {
          couple = await tx.couple.create({
            data: {
              name: accountName,
            },
          });
          console.log("✅ Nueva pareja creada:", couple.id);
        } else {
          console.log("✅ Pareja existente encontrada:", couple.id);
        }

        updateData.coupleId = couple.id;
        updateData.partnerEmail = partnerEmail;
        updateData.accountName = accountName;
        updateData.partnerFirstName = partnerFirstName;
        updateData.partnerLastName = partnerLastName;
        updateData.partnerProfileImage = partnerProfileImage;

        // Enviar email de invitación a la pareja
        try {
          const invitationResult = await sendInvitationEmail({
            to: partnerEmail,
            from: "noreply@straumix.com",
            inviterName: `${existingUser.firstName} ${
              existingUser.lastName || ""
            }`.trim(),
            accountName: accountName,
            accountType: "COUPLE",
            invitationLink: `${process.env.NEXTAUTH_URL}/auth/signup?invitation=${couple.id}&type=couple`,
          });

          if (invitationResult.success) {
            console.log("✅ Email de invitación enviado a:", partnerEmail);
          } else {
            console.log(
              "⚠️ Error enviando email de invitación:",
              invitationResult.error
            );
          }
        } catch (emailError) {
          console.log("⚠️ Error enviando email de invitación:", emailError);
        }
      }

      if (newRole === "ORGANIZATION" && organizationName) {
        console.log("🏢 Configurando cuenta organizacional...");

        // Buscar o crear organización
        let organization = await tx.organization.findFirst({
          where: { name: organizationName },
        });

        if (!organization) {
          organization = await tx.organization.create({
            data: {
              name: organizationName,
              type: organizationType as any,
              size: organizationSize as any,
              description: organizationDescription,
            },
          });
          console.log("✅ Nueva organización creada:", organization.id);
        } else {
          console.log("✅ Organización existente encontrada:", organization.id);
        }

        updateData.organizationId = organization.id;
      }

      console.log("📝 Datos a actualizar:", updateData);

      // 3. Actualizar usuario
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: updateData,
      });

      console.log("✅ Usuario actualizado:", updatedUser.role);

      // 4. Actualizar cuenta existente
      const existingAccount = existingUser.accounts[0];
      if (existingAccount) {
        let newAccountType = "PERSONAL";
        let newAccountName = "Cuenta Personal";
        let newAccountDescription =
          "Cuenta personal para gestión de gastos individuales";

        switch (newRole) {
          case "PERSONAL":
            newAccountType = "PERSONAL";
            newAccountName = "Cuenta Personal";
            newAccountDescription =
              "Cuenta personal para gestión de gastos individuales";
            break;
          case "COUPLE":
            newAccountType = "COUPLE";
            newAccountName = accountName || "Cuenta de Pareja";
            newAccountDescription =
              "Cuenta compartida para gestión de gastos de pareja";
            break;
          case "ORGANIZATION":
            newAccountType = "ORGANIZATION";
            newAccountName = organizationName || "Cuenta Organizacional";
            newAccountDescription =
              "Cuenta empresarial para gestión de gastos organizacionales";
            break;
        }

        await tx.account.update({
          where: { id: existingAccount.id },
          data: {
            type: newAccountType as any,
            name: newAccountName,
            description: newAccountDescription,
          },
        });

        console.log("✅ Cuenta actualizada:", newAccountType, newAccountName);

        // 5. Actualizar suscripción
        if (existingAccount.subscription) {
          let newPlanType = "BASIC";
          switch (newRole) {
            case "PERSONAL":
              newPlanType = "BASIC";
              break;
            case "COUPLE":
              newPlanType = "PREMIUM";
              break;
            case "ORGANIZATION":
              newPlanType = "ENTERPRISE";
              break;
          }

          await tx.subscription.update({
            where: { id: existingAccount.subscription.id },
            data: {
              planType: newPlanType as any,
            },
          });

          console.log("✅ Suscripción actualizada:", newPlanType);
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
          partnerEmail: updatedUser.partnerEmail,
          accountName: updatedUser.accountName,
          partnerId: updatedUser.partnerId,
          partnerFirstName: updatedUser.partnerFirstName,
          partnerLastName: updatedUser.partnerLastName,
          partnerProfileImage: updatedUser.partnerProfileImage,
          coupleId: updatedUser.coupleId,
          organizationId: updatedUser.organizationId,
        },
      };
    });

    console.log("🎉 Transacción completada exitosamente");

    // Enviar email de bienvenida después de la transacción
    try {
      const welcomeResult = await sendWelcomeEmail({
        to: existingUser.email,
        from: "noreply@straumix.com",
        userName: existingUser.firstName,
        accountType: newRole as "PERSONAL" | "COUPLE" | "ORGANIZATION",
      });

      if (welcomeResult.success) {
        console.log("✅ Email de bienvenida enviado a:", existingUser.email);
      } else {
        console.log(
          "⚠️ Error enviando email de bienvenida:",
          welcomeResult.error
        );
      }
    } catch (emailError) {
      console.log("⚠️ Error enviando email de bienvenida:", emailError);
    }

    return result;
  } catch (error) {
    console.error("❌ Error updating user role with relations:", error);
    return {
      success: false,
      error: "Error interno del servidor",
      user: null,
    };
  }
};
