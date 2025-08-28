"use client";

import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import CustomLink from "@/components/ui/CustomLink";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const SignupClient = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // Mostrar skeleton mientras se carga la sesión
  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <Skeleton className="w-[100px] h-[100px] rounded-full" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-4">
      {session?.user ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src={session.user.image || ""}
            overrideSrc={session.user.image || ""}
            alt={session.user.name || "User Image"}
            width={100}
            height={100}
            className="rounded-full"
            unoptimized
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
            onError={(e) => {
              e.currentTarget.src = "/images/default-avatar.png";
            }}
          />

          <p className="text-2xl font-bold">{session.user.name}</p>
          <p className="text-sm text-gray-500">{session.user.email}</p>

          <CustomLink
            variant="outline"
            href="#"
            btn
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </CustomLink>
        </div>
      ) : (
        <div>
          <h1>SignupClient</h1>

          <CustomLink href="#" btn onClick={() => signIn("google")}>
            Sign in with Google
          </CustomLink>
        </div>
      )}
    </section>
  );
};

export default SignupClient;
