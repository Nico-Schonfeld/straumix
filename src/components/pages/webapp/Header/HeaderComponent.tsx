"use client";

import { LogoStraumix } from "@/components/LogosReusables";
import { Button } from "@/components/ui/button";
import { UserIDType } from "@/types/user/user";
// import { extractUserData } from "@/utils/user/userHelpers";
import { Bell } from "lucide-react";
import GradualBlur from "@/components/ui/AnimatedComponents/gradual-blur";
import React from "react";

const HeaderComponent = ({ user }: { user: UserIDType }) => {
  // const userData = extractUserData(user);

  return (
    <>
      <header className="w-full h-auto fixed top-0 left-0 z-10 bg-white/50 backdrop-blur-xl border-b">
        <nav className="w-full h-full container mx-auto flex items-center justify-center relative px-4 py-2">
          <LogoStraumix w={120} styles="mr-4" />

          <Button
            size={"icon"}
            variant={"outline"}
            className="rounded-full absolute top-4 right-4"
          >
            <Bell />
          </Button>
        </nav>
      </header>

      <div className="sticky top-[4rem] w-full h-16 bg-transparent">
        <GradualBlur
          target="parent"
          position="top"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </div>
    </>
  );
};

export default HeaderComponent;
