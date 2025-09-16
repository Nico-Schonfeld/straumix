import React from "react";

import ProfileClient from "./page.client";
import { isMaintenance } from "@/utils/mantenance";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { getSession } from "@/utils/auth/authJWTOptions";
import { UserSessionType } from "@/types/user/user";
import { redirect } from "next/navigation";
import { getUserID } from "@/app/actions/users/users";

const ProfilePage = async () => {
  const session = (await getSession()) as UserSessionType;

  if (isMaintenance) {
    return <Maintenance />;
  }

  if (!session) redirect("/auth/signin");

  const getUserIDRes = await getUserID({ userId: session.user.id });

  return <ProfileClient user={getUserIDRes} />;
};

export default ProfilePage;
