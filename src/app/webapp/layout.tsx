import React from "react";

import { Metadata } from "next";
import FooterContainer from "@/components/pages/webapp/Footer/FooterContainer";
import HeaderContainer from "@/components/pages/webapp/Header/HeaderContainer";

export const metadata: Metadata = {
  title: "Straumix | WebApp",
  description: "Straumix | WebApp",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderContainer />
      {children}
      <FooterContainer />
    </>
  );
};

export default layout;
