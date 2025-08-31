import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { findOrCreateGoogleUser } from "@/lib/actions/auth";
import { checkSubscriptionStatus } from "@/lib/actions/subscription";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signup",
    error: "/auth/error", // Página de error personalizada
  },
  debug: process.env.NODE_ENV === "development", // Habilitar debug en desarrollo
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        try {
          const result = await findOrCreateGoogleUser(profile);
          if (result.success && result.user) {
            // Agregar TODA la información del usuario de la base de datos
            user.id = result.user.id;
            user.role = result.user.role || undefined;
            user.isProfileComplete = result.user.isProfileComplete || false;
            user.createdAt = result.user.createdAt;
            user.provider = result.user.provider || account.provider;
            return true;
          } else {
            console.error("Error al crear/buscar usuario:", result.error);
            return false;
          }
        } catch (error) {
          console.error("Error en callback de signIn:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Si es la primera vez que se inicia sesión, agregar información del usuario
      if (user && account?.provider === "google") {
        token.userId = user.id;
        token.provider = user.provider || account.provider;
        token.role = user.role;
        token.isProfileComplete = user.isProfileComplete;
        token.createdAt = user.createdAt;

        // Obtener el estado de la suscripción
        try {
          const subscriptionResult = await checkSubscriptionStatus(user.id);
          if (subscriptionResult.success && subscriptionResult.data) {
            token.subscriptionStatus = subscriptionResult.data;
          }
        } catch (error) {
          console.error("Error getting subscription status:", error);
        }
      }

      // Si ya tenemos el userId pero no la información de suscripción, actualizarla
      if (token.userId && !token.subscriptionStatus) {
        try {
          const subscriptionResult = await checkSubscriptionStatus(
            token.userId
          );
          if (subscriptionResult.success && subscriptionResult.data) {
            token.subscriptionStatus = subscriptionResult.data;
          }
        } catch (error) {
          console.error("Error getting subscription status:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Agregar información adicional a la sesión
      if (token.userId) {
        session.user.id = token.userId as string;
        session.user.provider = token.provider as string;
        session.user.role = token.role as string;
        session.user.isProfileComplete = token.isProfileComplete as boolean;
        session.user.createdAt = token.createdAt as Date;
        session.user.subscriptionStatus = token.subscriptionStatus;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
