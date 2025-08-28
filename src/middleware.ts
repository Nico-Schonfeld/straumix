import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Si el usuario está autenticado y está en rutas públicas, redirigir a /webapp
    if (token && (pathname === "/" || pathname === "/auth/signup")) {
      return NextResponse.redirect(new URL("/webapp", req.url));
    }

    // Si el usuario no está autenticado y está en rutas protegidas, redirigir a /auth/signup
    if (!token && pathname.startsWith("/webapp")) {
      return NextResponse.redirect(new URL("/auth/signup", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acceso a todas las rutas (manejamos la lógica arriba)
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/auth/signup", "/webapp/:path*"],
};
