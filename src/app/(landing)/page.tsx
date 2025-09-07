import React from "react";
import LandingPageComponent from "./page.client";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { isMaintenance } from "@/utils/mantenance";
// import HeaderContainer from "@/components/ui/pages/landing/Header/HeaderContainer";




const LandingPage = () => {

  if (isMaintenance) {
    return <Maintenance />
  }

  return (
    <>
      {/* <HeaderContainer /> */}
      <header>Header</header>
      <LandingPageComponent />
      <footer>Footer</footer>
    </>
  );
};

export default LandingPage;
