"use server";

import { cookies } from "next/headers";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
}

export async function saveCookiePreferences(preferences: CookiePreferences) {
  try {
    const cookieStore = await cookies();

    // Cookies esenciales siempre están activas
    const essentialCookies = true;

    // Guardar preferencias de cookies analíticas
    if (preferences.analytics) {
      cookieStore.set("cookie_analytics", "true", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 año
        path: "/",
      });
    } else {
      cookieStore.set("cookie_analytics", "false", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 año
        path: "/",
      });
    }

    // Guardar preferencias de cookies funcionales
    if (preferences.functional) {
      cookieStore.set("cookie_functional", "true", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 año
        path: "/",
      });
    } else {
      cookieStore.set("cookie_functional", "false", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 año
        path: "/",
      });
    }

    // Marcar que el usuario ha configurado sus preferencias
    cookieStore.set("cookie_preferences_set", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 año
      path: "/",
    });

    return {
      success: true,
      message: "Preferencias de cookies guardadas exitosamente",
    };
  } catch (error) {
    console.error("Error al guardar preferencias de cookies:", error);
    return {
      success: false,
      message: "Error al guardar las preferencias de cookies",
    };
  }
}

export async function getCookiePreferences(): Promise<CookiePreferences> {
  try {
    const cookieStore = await cookies();

    const analytics = cookieStore.get("cookie_analytics")?.value === "true";
    const functional = cookieStore.get("cookie_functional")?.value === "true";

    return {
      essential: true, // Siempre activas
      analytics,
      functional,
    };
  } catch (error) {
    console.error("Error al obtener preferencias de cookies:", error);
    // Valores por defecto
    return {
      essential: true,
      analytics: false,
      functional: false,
    };
  }
}

export async function hasCookiePreferencesSet(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("cookie_preferences_set")?.value === "true";
  } catch (error) {
    return false;
  }
}
