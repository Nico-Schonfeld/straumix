"use client";

import { ThemeSwitcher } from "@/components/themes/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePageClient = () => {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full h-full container mx-auto px-4 py-16 flex flex-col gap-4">
        <div className="w-full flex items-center justify-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => redirect("/webapp")}
          >
            <ArrowLeft />
          </Button>
        </div>

        <div className="w-full flex items-center justify-start gap-4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start justify-center gap-0">
            <h3 className="text-xl font-bold">Nicolás Schönfeld</h3>
            <p className="text-sm text-gray-500">nicolas@schonfeld.com</p>
          </div>
        </div>

        <ThemeSwitcher />

        <Button onClick={() => redirect("/")} variant="destructive">
          <LogOut />
          <span>Cerrar sesión</span>
        </Button>
      </div>
    </section>
  );
};

export default ProfilePageClient;
