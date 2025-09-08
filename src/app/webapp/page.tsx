import React from "react";
import WebAppClient from "./page.client";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { isMaintenance } from "@/utils/mantenance";
import { getSession } from "@/utils/auth/authJWTOptions";
import { redirect } from "next/navigation";
import { UserSessionType } from "@/types/user/user";

const WebApp = async () => {
  const session = (await getSession()) as UserSessionType;

  if (isMaintenance) {
    return <Maintenance />;
  }

  if (!session) redirect("/auth/signin");

  return <WebAppClient session={session} />;
};

export default WebApp;
