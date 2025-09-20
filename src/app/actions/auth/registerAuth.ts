"use server";

import prisma from "@/lib/db/prisma";
import { UserDataRegisterType } from "@/types/auth/auht";
import bcrypt from "bcrypt";
import {
  createVerificationCode,
  sendVerificationEmail,
} from "./verificationActions";

export const registerAuth = async (user: UserDataRegisterType) => {
  try {
    // Verificar si el email ya existe
    const userExistsByEmail = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (userExistsByEmail) {
      return {
        success: false,
        error: true,
        message: "El correo electrónico ya está en uso",
      };
    }

    // Verificar si el username ya existe
    const userExistsByUsername = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    if (userExistsByUsername) {
      return {
        success: false,
        error: true,
        message: "El nombre de usuario ya está en uso",
      };
    }

    const userPrisma = await prisma.user.create({
      data: {
        name: user.name,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        phone: user.phone,
        country: user.country,
        preferredCurrency: user.preferredCurrency,
        isActive: true,
        isVerified: false, // Usuario no verificado inicialmente
        avatar: "/assets/avatars/avatar_default.svg",
      },
    });

    if (!userPrisma) {
      return {
        success: false,
        error: true,
        message: "Error al registrar un ususario",
      };
    }

    // Crear código de verificación
    const codeResult = await createVerificationCode(
      userPrisma.id,
      "email_verification"
    );
    if (!codeResult.success) {
      return {
        success: false,
        error: true,
        message: "Error al crear código de verificación",
      };
    }

    // Enviar email de verificación
    const emailResult = await sendVerificationEmail(
      userPrisma.email,
      userPrisma.name,
      codeResult.code!,
      userPrisma.id
    );
    if (!emailResult.success) {
      return {
        success: false,
        error: true,
        message: "Error al enviar email de verificación",
      };
    }

    // NO crear sesión JWT hasta que el usuario verifique su cuenta
    return {
      success: true,
      error: false,
      message:
        "Usuario registrado correctamente. Revisa tu email para verificar tu cuenta.",
      user: userPrisma,
      requiresVerification: true,
    };
  } catch (error) {
    console.error(`Error al registrar un ususario: ${error}`);

    return {
      success: false,
      error: true,
      message: `Error al registrar un ususario: ${error}`,
    };
  }
};
