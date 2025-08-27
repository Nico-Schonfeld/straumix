import React from "react";
import LoginForm from "./page.client";
import Link from "next/link";
import { LogoStraumix } from "@/components/ui/Icons/LogoStraumix";

const SigninPage = () => {
  return (
    <section className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/assets/img_placeholder/img_home.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale "
        />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10 ">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <LogoStraumix w={100} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
