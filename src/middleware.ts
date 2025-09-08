import { NextRequest, NextResponse } from "next/server";
import { updateSession, getSession } from "@/utils/auth/authJWTOptions";

export async function middleware(req: NextRequest) {
  // Rutas que requieren autenticación
  const protectedRoutes = ["/webapp"];
  const authRoutes = ["/auth/signin", "/auth/signup"];

  const { pathname } = req.nextUrl;

  // Si es una ruta protegida, verificar autenticación
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const session = await getSession();

    if (!session) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // Actualizar sesión si está autenticado
    return await updateSession(req);
  }

  // Si está en rutas de auth y ya tiene sesión, redirigir a webapp
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    const session = await getSession();

    if (session) {
      return NextResponse.redirect(new URL("/webapp", req.url));
    }
  }

  // Para otras rutas, solo actualizar sesión si existe
  return await updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
