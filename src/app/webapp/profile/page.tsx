import React from "react";

import ProfileClient from "./page.client";
import { isMaintenance } from "@/utils/mantenance";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { getSession } from "@/utils/auth/authJWTOptions";
import { UserSessionType } from "@/types/user/user";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = (await getSession()) as UserSessionType;

  if (isMaintenance) {
    return <Maintenance />;
  }

  if (!session) redirect("/auth/signin");

  return <ProfileClient session={session} />;
};

export default ProfilePage;
