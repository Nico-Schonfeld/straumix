import React from "react";

import { Metadata } from "next";
import FooterContainer from "@/components/pages/webapp/Footer/FooterContainer";

export const metadata: Metadata = {
  title: "Straumix | WebApp",
  description: "Straumix | WebApp",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <FooterContainer />
    </>
  );
};

export default layout;
