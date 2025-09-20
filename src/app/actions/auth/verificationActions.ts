"use server";

import prisma from "@/lib/db/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Generar código OTP de 6 dígitos
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Crear código de verificación
export const createVerificationCode = async (
  userId: number,
  type: "email_verification" | "password_reset" = "email_verification"
) => {
  try {
    // Eliminar códigos anteriores no utilizados del mismo tipo
    await prisma.verificationCode.deleteMany({
      where: {
        userId,
        type,
        isUsed: false,
      },
    });

    // Crear nuevo código
    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    const verificationCode = await prisma.verificationCode.create({
      data: {
        userId,
        code,
        type,
        expiresAt,
      },
    });

    return {
      success: true,
      error: false,
      message: "Código de verificación creado",
      code: verificationCode.code,
    };
  } catch (error) {
    console.error(`Error al crear código de verificación: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al crear código de verificación: ${error}`,
    };
  }
};

// Verificar código OTP
export const verifyOTPCode = async (
  userId: number,
  code: string,
  type: "email_verification" | "password_reset" = "email_verification"
) => {
  try {
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        userId,
        code,
        type,
        isUsed: false,
        expiresAt: {
          gt: new Date(), // No expirado
        },
      },
    });

    if (!verificationCode) {
      return {
        success: false,
        error: true,
        message: "Código de verificación inválido o expirado",
      };
    }

    // Marcar código como usado
    await prisma.verificationCode.update({
      where: { id: verificationCode.id },
      data: { isUsed: true },
    });

    // Si es verificación de email, marcar usuario como verificado
    if (type === "email_verification") {
      await prisma.user.update({
        where: { id: userId },
        data: { isVerified: true },
      });
    }

    return {
      success: true,
      error: false,
      message: "Código verificado correctamente",
    };
  } catch (error) {
    console.error(`Error al verificar código: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al verificar código: ${error}`,
    };
  }
};

// Enviar email de verificación
export const sendVerificationEmail = async (
  email: string,
  name: string,
  code: string,
  userId?: number
) => {
  try {
    const verificationLink = userId
      ? `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/verify?userId=${userId}`
      : `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/verify`;

    const { data, error } = await resend.emails.send({
      from: "Straumix <noreply@straumix.com>",
      to: [email],
      subject: "Verifica tu cuenta - Straumix",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; margin-bottom: 10px;">¡Bienvenido a Straumix!</h1>
            <p style="color: #666; font-size: 16px;">Hola ${name}, gracias por registrarte</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Verifica tu cuenta</h2>
            <p style="color: #666; text-align: center; margin-bottom: 20px;">
              Para completar tu registro, ingresa este código de verificación:
            </p>
            <div style="background-color: #fff; padding: 20px; text-align: center; border: 2px dashed #007bff; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #007bff; font-size: 32px; letter-spacing: 8px; margin: 0; font-family: monospace;">${code}</h3>
            </div>
            <p style="color: #666; text-align: center; font-size: 14px;">
              Este código expirará en <strong>1 hora</strong>
            </p>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${verificationLink}" 
               style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Verificar mi cuenta
            </a>
          </div>

          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              <strong>⚠️ Importante:</strong> Si no verificas tu cuenta en 1 hora, será bloqueada y tendrás que solicitar un nuevo código.
            </p>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Si no solicitaste este código, puedes ignorar este email.<br>
              Este es un email automático, por favor no respondas.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error al enviar email:", error);
      return {
        success: false,
        error: true,
        message: "Error al enviar email de verificación",
      };
    }

    return {
      success: true,
      error: false,
      message: "Email de verificación enviado",
      data,
    };
  } catch (error) {
    console.error(`Error al enviar email de verificación: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al enviar email de verificación: ${error}`,
    };
  }
};

// Reenviar código de verificación
export const resendVerificationCode = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true, isVerified: true },
    });

    if (!user) {
      return {
        success: false,
        error: true,
        message: "Usuario no encontrado",
      };
    }

    if (user.isVerified) {
      return {
        success: false,
        error: true,
        message: "La cuenta ya está verificada",
      };
    }

    // Crear nuevo código
    const codeResult = await createVerificationCode(
      userId,
      "email_verification"
    );
    if (!codeResult.success) {
      return codeResult;
    }

    // Enviar email
    const emailResult = await sendVerificationEmail(
      user.email,
      user.name,
      codeResult.code!,
      userId
    );
    if (!emailResult.success) {
      return emailResult;
    }

    return {
      success: true,
      error: false,
      message: "Código de verificación reenviado",
    };
  } catch (error) {
    console.error(`Error al reenviar código de verificación: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al reenviar código de verificación: ${error}`,
    };
  }
};

// Verificar si el usuario tiene código pendiente
export const hasPendingVerification = async (userId: number) => {
  try {
    const pendingCode = await prisma.verificationCode.findFirst({
      where: {
        userId,
        type: "email_verification",
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    return {
      success: true,
      error: false,
      hasPending: !!pendingCode,
      message: pendingCode
        ? "Hay un código pendiente"
        : "No hay códigos pendientes",
    };
  } catch (error) {
    console.error(`Error al verificar código pendiente: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al verificar código pendiente: ${error}`,
    };
  }
};

// Bloquear cuentas no verificadas que han expirado
export const blockExpiredUnverifiedAccounts = async () => {
  try {
    const expiredCodes = await prisma.verificationCode.findMany({
      where: {
        type: "email_verification",
        isUsed: false,
        expiresAt: {
          lt: new Date(), // Códigos expirados
        },
      },
      include: {
        user: true,
      },
    });

    const userIdsToBlock = expiredCodes
      .filter((code) => !code.user.isVerified) // Solo usuarios no verificados
      .map((code) => code.userId);

    if (userIdsToBlock.length > 0) {
      await prisma.user.updateMany({
        where: {
          id: { in: userIdsToBlock },
          isVerified: false, // Doble verificación
        },
        data: {
          isActive: false, // Bloquear cuenta
        },
      });

      // Limpiar códigos expirados
      await prisma.verificationCode.deleteMany({
        where: {
          type: "email_verification",
          isUsed: false,
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      console.log(`Bloqueadas ${userIdsToBlock.length} cuentas no verificadas`);
    }

    return {
      success: true,
      error: false,
      message: `Procesadas ${expiredCodes.length} cuentas expiradas`,
      blockedAccounts: userIdsToBlock.length,
    };
  } catch (error) {
    console.error(`Error al bloquear cuentas expiradas: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al bloquear cuentas expiradas: ${error}`,
    };
  }
};

// Reactivar cuenta bloqueada con nuevo código
export const reactivateAccount = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true, isActive: true, isVerified: true },
    });

    if (!user) {
      return {
        success: false,
        error: true,
        message: "Usuario no encontrado",
      };
    }

    if (user.isActive && user.isVerified) {
      return {
        success: false,
        error: true,
        message: "La cuenta ya está activa y verificada",
      };
    }

    // Reactivar cuenta
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });

    // Crear nuevo código de verificación
    const codeResult = await createVerificationCode(
      userId,
      "email_verification"
    );
    if (!codeResult.success) {
      return codeResult;
    }

    // Enviar email
    const emailResult = await sendVerificationEmail(
      user.email,
      user.name,
      codeResult.code!,
      userId
    );
    if (!emailResult.success) {
      return emailResult;
    }

    return {
      success: true,
      error: false,
      message:
        "Cuenta reactivada. Se ha enviado un nuevo código de verificación.",
    };
  } catch (error) {
    console.error(`Error al reactivar cuenta: ${error}`);
    return {
      success: false,
      error: true,
      message: `Error al reactivar cuenta: ${error}`,
    };
  }
};
