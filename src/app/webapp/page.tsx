import React from "react";
import WebAppClient from "./page.client";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { isMaintenance } from "@/utils/mantenance";

const WebApp = () => {
  if (isMaintenance) {
    return <Maintenance />;
  }

  return <WebAppClient />;
};

export default WebApp;
