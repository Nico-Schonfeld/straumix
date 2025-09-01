"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendInvitationEmail = async (data: {
  to: string;
  from: string;
  inviterName: string;
  accountName: string;
  accountType: "COUPLE" | "ORGANIZATION";
  invitationLink: string;
}) => {
  try {
    const { to, from, inviterName, accountName, accountType, invitationLink } =
      data;

    const subject =
      accountType === "COUPLE"
        ? `${inviterName} te ha invitado a unirte a su cuenta de pareja en Straumix`
        : `${inviterName} te ha invitado a unirte a ${accountName} en Straumix`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f0f23;">¡Hola!</h2>
        <p>${inviterName} te ha invitado a unirte a ${accountName} en Straumix.</p>
        <p>Straumix es una plataforma de gestión financiera que te ayudará a:</p>
        <ul>
          <li>Organizar tus gastos con la metodología 50/30/20</li>
          <li>Establecer metas financieras</li>
          <li>Colaborar en finanzas compartidas</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${invitationLink}" 
             style="background-color: #0f0f23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Unirse a la cuenta
          </a>
        </div>
        <p style="font-size: 14px; color: #666;">
          Si no esperabas este correo, puedes ignorarlo.
        </p>
      </div>
    `;

    const result = await resend.emails.send({
      from: from,
      to: [to],
      subject: subject,
      html: html,
    });

    return {
      success: true,
      error: null,
      data: result,
    };
  } catch (error) {
    console.error("Error sending invitation email:", error);
    return {
      success: false,
      error: "Error al enviar el correo de invitación",
      data: null,
    };
  }
};

export const sendWelcomeEmail = async (data: {
  to: string;
  from: string;
  userName: string;
  accountType: "PERSONAL" | "COUPLE" | "ORGANIZATION";
}) => {
  try {
    const { to, from, userName, accountType } = data;

    const subject = `¡Bienvenido a Straumix, ${userName}!`;

    const accountTypeText = {
      PERSONAL: "cuenta personal",
      COUPLE: "cuenta de pareja",
      ORGANIZATION: "cuenta organizacional",
    }[accountType];

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f0f23;">¡Bienvenido a Straumix!</h2>
        <p>Hola ${userName},</p>
        <p>Tu ${accountTypeText} ha sido configurada exitosamente. Ya puedes comenzar a:</p>
        <ul>
          <li>Configurar tu presupuesto mensual</li>
          <li>Registrar tus gastos e ingresos</li>
          <li>Establecer metas financieras</li>
          <li>Visualizar tus reportes</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://straumix.com/webapp" 
             style="background-color: #0f0f23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Ir al Dashboard
          </a>
        </div>
        <p>¡Que tengas un excelente día!</p>
        <p>El equipo de Straumix</p>
      </div>
    `;

    const result = await resend.emails.send({
      from: from,
      to: [to],
      subject: subject,
      html: html,
    });

    return {
      success: true,
      error: null,
      data: result,
    };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return {
      success: false,
      error: "Error al enviar el correo de bienvenida",
      data: null,
    };
  }
};
