"use client";

import { LogoStraumix } from "@/components/LogosReusables";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const HeaderComponent = () => {
  const router = useRouter();
  const navLinks = [
    { id: 0, text: "Beneficios", href: "#" },
    { id: 1, text: "Como funciona", href: "#" },
    { id: 2, text: "Precios", href: "#" },
    { id: 3, text: "Testimonios", href: "#" },
    { id: 4, text: "FAQ", href: "#" },
  ];

  return (
    <header className="w-full h-auto bg-white border border-b fixed top-0 left-0 z-10">
      <div className="w-full h-full py-2 px-4 container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="hidden lg:flex">
            <LogoStraumix
              //   w={isScrolled ? 120 : 190}
              w={150}
              styles="transition-all duration-300 "
            />
          </Link>

          <nav className="w-full h-auto hidden lg:flex">
            <ul className="w-full h-flex flex items-center gap-2 pt-1">
              {navLinks?.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-sm">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/auth/signin")}
            className="cursor-pointer hidden lg:flex border-2 border-black"
            size={"lg"}
          >
            Sign In
          </Button>

          <Button
            variant="default"
            onClick={() => router.push("/auth/signup")}
            className="cursor-pointer border-2 border-black"
            size={"lg"}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
