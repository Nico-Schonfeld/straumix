import React from "react";
import LandingPageClient from "./page.client";
import HeaderContainer from "@/components/landing/header/HeaderContainer";
import FooterContainer from "@/components/landing/footer/FooterContainer";

const LandingPage = () => {
  return (
    <>
      <HeaderContainer />
      <LandingPageClient />
      <FooterContainer />
    </>
  );
};

export default LandingPage;
